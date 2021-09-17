from . import bp as api
from flask import make_response, g, request
from app.blueprints.auth.models import User
from app.blueprints.auth.auth import basic_auth, token_auth
import secrets
from datetime import datetime as dt, timedelta
from werkzeug.security import generate_password_hash

@api.get('/token')
@basic_auth.login_required()
def get_token():
    user = g.current_user
    response_dict ={
        'token': user.get_token(),
        'user': user.get_name(),
        'user_id': user.id
    }
    return make_response(response_dict,200)


@api.post('/user')
def register():  
    user_dict = request.get_json()
    if User.query.filter_by(email=user_dict['email']).first() is not None:
        return make_response('This email has been registered before', 400)

    del user_dict['confirm_password']
    user_dict.update({'password': generate_password_hash(user_dict['password']),
                        'token': secrets.token_urlsafe(32),
                        'token_exp':str(dt.utcnow() + timedelta(seconds = 2592000))})
    
    new_user=User(**user_dict)
    new_user.save()
    return make_response('Registered Sucessfully', 200)



    
