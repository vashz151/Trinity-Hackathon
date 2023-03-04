from flask import Flask, request, jsonify
import requests
import api
from flask_cors import CORS, cross_origin
import logging
logging.basicConfig(level=logging.INFO)


app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return "Hello World!"


@app.route('/checkstatus', methods=['POST'])
def check_status():
    return "Hello World!"


@app.route('/sendotp', methods=["GET"])
def send_otp():
    mobile = request.args.get('mobile')
    sid, otp, status = api.sendOtp(mobile)
    print(sid, otp, status)
    return jsonify({'sid': sid, 'otp': otp, 'status': status})


if __name__ == '__main__':
    app.run(debug=False)
