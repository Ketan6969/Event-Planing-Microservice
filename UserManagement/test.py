# import mysql.connector
# import mysql.connector.pooling

# dbconfig = {
#     "database": "test",
#     "user":     "root",
#     "password": "ketan@123"
# }

# cnxpool = mysql.connector.pooling.MySQLConnectionPool(pool_name = "mypool",
#                                                         pool_size = 3,
#                                                         **dbconfig)

# cnx1 = cnxpool.get_connection()

# with cnx1.cursor() as cursor:
#     cursor.execute('select * from test')
#     data = cursor.fetchall()
    
# print(data)

# from db_pooling import Db_pooling
from app import db_pooling
import mysql.connector.pooling
import mysql.connector

db_params = {
    "database" : "test",
    "user" : "root",
    "password" : "ketan@123"
}

db = db_pooling.Db_pooling(**db_params)

cnx1 = db.get_connection()

with cnx1.cursor() as cursor:
    cursor.execute('select * from test')
    data = cursor.fetchall()

print(data)