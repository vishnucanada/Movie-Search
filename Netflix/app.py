import requests
import configparser
from flask import Flask, render_template, request, jsonify

config = configparser.ConfigParser()
config.read('config.ini')
API_KEY = config['API_KEYS']['review_api']



app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

# Define a route to handle the search request
@app.route('/search', methods=['POST'])
def search():
    # Get the search query from the request
    search_query = request.form.get('search_query')

    query = f'http://www.omdbapi.com/?apikey={API_KEY}&s={search_query}'
    response = requests.get(query)
    
    search_results = response.json()
    return jsonify(search_results)

if __name__ == '__main__':
    app.run(debug=True)


