from flask import request, jsonify
from config import app
import geopandas as gpd
import re
import requests
import json

@app.route("/create")
def create():
    pass

# https://react-leaflet.js.org/docs/example-vector-layers/ -- draw shapes on map
#   -> format CSV file in order to match the example on the link
# request country to get shape of
# find that country and get the coordinates
# data = {

# }
@app.route("/get_country_list")
def get_country_list():
    api_url = 'https://restcountries.com/v3.1/all'

    try:
        response = requests.get(api_url)
        response.raise_for_status()

        country_data = response.json()
        list_of_names = []
        for country in country_data:
            list_of_names.append(country.get('name', {}).get('common', 'Undefined'))

        # print(f'List of countries')
        # for i in list_of_names:
        #     print(f'--> {i}')

        return jsonify({'names':list_of_names})
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
        api_url = f"https://restcountries.com/v3.1/name/{country_name}"
        data_response = requests.get(api_url)
        if data_response.ok:
            country_data = data_response.json()[0]
        else:
            return jsonify({'message':'API request failed: population route'})
    
        print(f'Country name received {country_name}')
        print(f'{country_name} data:')
        for i in country_data['name']:
            print(f'--> {country_data['name'][i]}')

        for i in country_data:
            print(f'--> {i}')

        '''Open street map of the country'''
        if country_data:
            center_coords = country_data['latlng']
            map_url = country_data['maps']['openStreetMaps']
        print(country_data['maps']['openStreetMaps'])
        print(country_data['latlng'])
            
        return jsonify({
            'message':f"Country received: {country_name}",
            'data': {
                'country_name': country_name,
                'centerCoords':center_coords,
            }
            }), 201

    except Exception as e:
        return jsonify({'message':f'{e}'}), 400

'''This is for simulation'''
# # connect to openstreet api --> overpass api
# api_url = 'https://overpass-api.de/api/interpreter'
# query = f"""
#     [out:json];
#     area["name"="{country_name}"]->.searchArea;
#     (
#         relation["boundary"="administrative"]["admin_level"="2"](area.searchArea);
#     );
#     out body;
#     >;
#     out skel qt;
# """

# response = requests.post(api_url, data={'data': query})
# if response.status_code == 200:
#     data = response.json()
#     print(json.dumps(data, indent=2))

if __name__ == "__main__":
    app.run(debug=True)