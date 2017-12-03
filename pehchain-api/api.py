import hug
import jwt
from pymongo import MongoClient
import redis
import json
from hug_middleware_cors import CORSMiddleware

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api))

client = MongoClient('localhost:27017')
db = client.trustedauth

@hug.get('/api/')
def signup():
    pass

@hug.post('/api/aadhar')
def aadhar(body):
    print(body)
    if(body['otp'] == '5431'):
        aadharId = body['aadharId']
        print(aadharId)
        query = db.userdata.find_one({'aadharId': int(aadharId)}, {'_id': False})
        print(query)
        return json.dumps(query)
    else:
        query = {'status' : 'Wrong OTP'}
        return json.dumps(query)

