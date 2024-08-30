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

@app.route("/population", methods=['POST'])
def population():
    try:
        data = request.json
        if not data or 'country' not in data:
            print('Country name not received'), 400

        country_name = data.get('country')
        if not re.match(r'^[A-Za-z\s]+$', country_name):
            return jsonify({'message':'Invalid input. Letters only.'})
        
        if not country_name:
            print('Country name not received')
            return jsonify({'message':'Contry name is empty'}), 400
        
        # connect to openstreet api --> overpass api
        api_url = 'https://overpass-api.de/api/interpreter'
        query = f"""
            [out:json];
            area["name"="{country_name}"]->.searchArea;
            (
                relation["boundary"="administrative"]["admin_level"="2"](area.searchArea);
            );
            out body;
            >;
            out skel qt;
        """

        response = requests.post(api_url, data={'data': query})
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
    
        print(f'Country name received {country_name}')
        return jsonify({'message':f"Country received: {country_name}"}), 201

    except Exception as e:
        return jsonify({'message':f'{e}'}), 400


if __name__ == "__main__":
    app.run(debug=True)