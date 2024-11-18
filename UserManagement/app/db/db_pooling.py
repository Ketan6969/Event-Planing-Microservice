import mysql.connector 
import mysql.connector.pooling


class Db_pooling:
    def __init__(self, **db_params):
        self.connection_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_reset_session = True,
            **db_params
        )
        
    
    def get_connection(self):
        return self.connection_pool.get_connection()
    
    def release_connection(self,connection):
        if connection.is_connected():
            connection.close()
    
