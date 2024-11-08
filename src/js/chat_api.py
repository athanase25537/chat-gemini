from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS  # Import de CORS

# Configurer l'API Gemini
genai.configure(api_key="AIzaSyDCHPsXVUh4njIt978oS1cEjFTuCPyEgzA")

app = Flask(__name__)

# Appliquer CORS pour autoriser les requêtes depuis toutes les origines
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_content():
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Le prompt est vide."}), 400

    try:
        # Utilisation du modèle Gemini pour générer du contenu
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
