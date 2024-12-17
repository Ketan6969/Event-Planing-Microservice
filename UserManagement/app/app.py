import mysql.connector as c,requests
from flask import Flask, request
from flask_cors import CORS
from hashing import hashing
from db import Db_pooling,db_config

db_params = db_config.db_params

db = Db_pooling(**db_params)

connection = db.get_connection()

app = Flask(__name__)
CORS(app)

if connection.is_connected:
    print("Connection established ")
else:
    print("Database error")
    exit



@app.route('/')
def home():
    return "<h1>Welcome to home</h1>"


@app.route('/register', methods=["POST"])
def register():
    
    name = request.args.get('name')
    email = request.args.get('email')
    password = request.args.get('password')
    
    if name and email and password:
        hashed_password = hashing.hash_pass(password)
        q = "insert into test(name,email,password) values(%s, %s, %s)"
        
        with connection.cursor() as cursor:
            cursor.execute(q,(name, email, hashed_password))
            connection.commit()
            # db.release_connection(connection)

        print(cursor.rowcount, "record inserted.")
        return [{'response' : 'Login Success'}], 201
    else:
        return [{'response' : 'something went wrong'}]
    
    
#API endpoint to handle the login
    
@app.route('/login', methods=["POST"])    
def login():    
    email = request.args.get('email')
    password = request.args.get('password')
    q = "select * from test where email = %s"
    
    with connection.cursor() as cursor:
        cursor.execute(q,(email,))
        data = cursor.fetchone()
        # db.release_connection(connection)
            
    # print(f"Email: {email}, Password: {password}")
    #print(f"Printing data: {data[3]}")
    if data == None:  
        # cursor.close()
        # conn.close()
        return [{'response' : 'Not Registered'}], 400
    
    #match the hash password
    hash_status = hashing.check_hash(password,data[3])
    if hash_status != True:
        return [{'response' : 'Wrong Password'}], 401
    
    return [{'response' :  'login success'}], 201
    # return [{'response' : 'Something went wrong!'}]

@app.route("/profile", methods=['GET'])
def profile():
    email = request.args.get('email')
    if email:
        q = 'select * from test where email = %s'
        with connection.cursor() as cursor:
            cursor.execute(q,(email,))
            data = cursor.fetchone()
            connection.commit
            if not data:
                return[{'response' : 'no user found'}]
            return [{'response' : data}]
    return [{'response' : 'please enter an email'}]
    
    
if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')