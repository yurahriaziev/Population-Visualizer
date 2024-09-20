from flask import request, jsonify
from config import app
import geopandas as gpd
import re
import requests
import json

def print_err(err):
    print(f'[ERROR] --> {err}')

@app.route("/create")
def create():
    pass

@app.route("/get_country_list")
def get_country_list():
    '''
        Create a map of long:short country names
        Use the map to rename .shp 'NAME' column with the long version
    '''
    try:
        country_map = generate_country_list()
        country_list = list(country_map.keys())
        return jsonify({'names':country_list})
    except Exception as e:
        return jsonify({'message':f'{e}'}), 400
    

@app.route("/population", methods=['POST'])
def population():
    try:
        data = request.json
        if not data or 'country' not in data:
            return jsonify({'message':'Country name not received'}), 400

        country_name = data.get('country')
        if not re.match(r'^[A-Za-z\s]+$', country_name):
            return jsonify({'message':'Invalid input. Letters only.'})
        
        if not country_name:
            print('Country name not received')
            return jsonify({'message':'Contry name is empty'}), 400
        
        '''Get population data based on received country name'''
        api_url = f"https://restcountries.com/v3.1/name/{country_name}?fullText=true"
        data_response = requests.get(api_url)
        if data_response.ok:
            country_data = data_response.json()[0]
        else:
            return jsonify({
                'message':'API request failed: population route',
                'error':'Invalid input'
                            }), 400
    
        print(f'Country name received {country_name}')
        '''
        Creating and sending data to the front end
        1. Basic data: population, capital, area
        '''

        if country_data:
            center_coords = country_data['latlng']
            map_url = country_data['maps']['openStreetMaps']
            population = country_data['population']
            capital = country_data['capital'][0]
            area = country_data['area']
            geo_data = static_bounds(country_name)

        # testing
        print(country_data['maps']['openStreetMaps'])
        print(population)
        print(capital)
        print(area)
        print(country_data['coatOfArms'])
        print(country_data['flags'])
        static_bounds(country_name)

        return jsonify({
            'message':f"Country received: {country_name}",
            'data': {
                'countryName': country_name,
                'centerCoords':center_coords,
                'capital':capital,
                'population':population,
                'area':area,
                'flagPng':'',
                'geoData':geo_data
            }
            }), 201

    except Exception as e:
        return jsonify({'message':f'{e}'}), 400
    

def generate_country_list():
    countries_path = 'static/countries.txt'
    with open(countries_path, 'r') as file:
        txt_names = file.read().splitlines()

    shp_path = 'static/ne_10m_admin_0_countries.shp'
    gdf = gpd.read_file(shp_path)
    shp_names = []
    if 'NAME' in gdf.columns:
        shp_names = gdf['NAME'].unique()

    shp_names.sort()

    country_map = {}
    for i in range(len(txt_names)):
        for j in range(len(shp_names)):
            if len(txt_names[i]) >= 10:
                if txt_names[i][:10] in shp_names[j]:
                    country_map[txt_names[i]] = shp_names[j]
            else:
                if txt_names[i] == shp_names[j]:
                    country_map[txt_names[i]] = shp_names[j]

    return country_map

'''
    Takes in 'country name' as parameter to return that country's geo json data
    Uses data from 'Natural Earth'
'''
def static_bounds(country_name):
    try:
        if country_name == 'Ukraine':
            shp_path = 'static/ukraine-with-crimea_1691.geojson'
            country = gpd.read_file(shp_path)
        else:
            country_map = generate_country_list()
            shp_name = country_map[country_name]
            shp_path = 'static/ne_10m_admin_0_countries.shp'
            gdf = gpd.read_file(shp_path)
            if 'NAME' in gdf.columns:
                print(gdf['NAME'].unique())
            country = gdf[gdf['NAME'] == shp_name]

        if country.empty:
            return jsonify({'message':'Country not found'})

        geojson = country.to_json()

        print('returning geojson')
        return json.loads(geojson)
    except Exception as e:
        print_err(e)


if __name__ == "__main__":
    app.run(debug=True)