import mysql.connector as c, os, requests, json
from flask import Flask, request
import mysql
conn = c.connect(host = "localhost", user = "root", password = "ketan@123", database='test', auth_plugin='mysql_native_password')
cursor = conn.cursor()

app = Flask(__name__)


if conn.is_connected:
    print("Connection established ")
else:
    print("Database error")
    exit

@app.route('/')
def home():
    return "<h1>Welcome to home</h1>"

@app.route('/register', methods=["POST"])
def register():
    
    # id = request.args.get('id')
    name = request.args.get('name')
    email = request.args.get('gmail')
    password = request.args.get('password')
    
    if name and email and password:
        q = "insert into test(name,email,password) values(%s, %s, %s)"
        cursor.execute(q,(name, email, password))
        conn.commit()
        print(cursor.rowcount, "record inserted.")
        return [{'response' : 'Login Success'}], 200
    else:
        return [{'response' : 'something went wrong'}]
    
    
#API endpoint to handle the login
    
@app.route('/login', methods=["POST"])    
def login():    
    
    email = request.args.get('email')
    password = request.args.get('password')
    q = f"select * from test where email = %s and password = %s "
    cursor.execute(q,(email,password))
    data = cursor.fetchone()
    # print(f"Email: {email}, Password: {password}")
    # print(f"Printing data: {data}   ")
    if data != None:
        # cursor.close()
        # conn.close()
        return [{'response' :  'login success'}], 200
    return [{'response' : 'Something went wrong!'}]

    
    
if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')