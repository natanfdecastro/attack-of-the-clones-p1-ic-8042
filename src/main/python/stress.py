import sys
from queue import Queue
from threading import Thread
from stem import Signal
from stem.control import Controller
from fake_useragent import UserAgent
import requests


# Funcion utilizada para establecer los proxies necesarios para poder ponectarse a la red tor desde python
def get_tor_session():
    session = requests.session() # Se inicializa el objeto
    session.proxies = {'http': 'socks5h://127.0.0.1:9050',
                       'https': 'socks5h://127.0.0.1:9050'} # Se le asigna los sockest necesarios.
    return session # Se retorna el objeto creado


# Funcion utilizada para cambiar el origen de las conexiones desde donde se realizan las consultas
# Sin embargom existe una limite para realizar este cambio sin que establesca un tiempo de espera para poder cambiar
def renew_connection():
    with Controller.from_port(port=9051) as controller:
        controller.authenticate(password='NHY654rfvbgt') # Esta contraseña se encuentra disponible dentro de la configuracion de TOR
        # Pero se puede cambiarse desde la terminal de Linux tor --hash-password my_password
        print("Success!")
        controller.signal(Signal.NEWNYM)
        print("New Tor connection processed")


# Clase que hereda de Thread para realizar multiples consultas a una dirección URL
class Consult(Thread):
    # Constructor de la clase
    def __init__(self, queue):
        Thread.__init__(self) # Inicializa el hilo
        self.queue = queue # Cola con las consultas a realizar a un servidor

    # Metodo a ejecutar para realizar las consultas a la URL indicada
    def run(self):
        while True:
            url = self.queue.get() # Se saca la URL de la cola y se realiza la consulta
            try:
                session = get_tor_session() # Se crea una objeto session para con los proxies
                sessionHeaders = {'User-agent': UserAgent().random} # Se asigna un header con un UserAgent a la sesión para esto se utiliza una biblioteca que seleccióna uno aleatoriamente.
                request = session.get(url, headers=sessionHeaders) # Se realiza la conixión a la URL establecida, con los parametros necesario.
                print(request.headers) # Se imprime en consola los heders de la respuesta obtenida por el servidor
                session.cookies.clear() # Se limpian las cookies de la sección
                # renew_connection() # Se cambia la dirección de origen de donde se realizan las consultas
            finally:
                self.queue.task_done() # Cuando la cola esta vacia se termina la ejecución


# Función principal del programa, recibe los parametros que son pasados por el usuario desde la terminal
# Los cuales contienen la cantidad de hilos, consultas y la dirección a la cual se realizan las consultas.
def main(arguments):
    # Se verifica que en los argumentos se encuentren los parametros necesarios y en el orden establecido
    if len(arguments and arguments.count("-r") and arguments.count("-n") and arguments.count("-u")) != 7:
        exit("Arguments error") # En caso de que no se encuentren los parametros correctores se termina la ejecución del programa
    # Se lee el contenido de los argumentos
    threads = int(arguments[2])
    requestQuantity = int(arguments[4])
    url = arguments[6]
    queue = Queue()
    # Se crea una cantidad de N hilos
    for index in range(threads):
        worker = Consult(queue) # Se crea un objeto de consulta el cual trabaja como un hilo
        worker.daemon = True # Se establece este hilo como un daemon para que se ejecute hasta finalizar
        worker.start() # Se inicia el hilo
    for consult in range(requestQuantity): # Se ingresa en la cola la cantidad de veces que se desea realizar la consulta
        queue.put(url) # Se añade la URL a la cola, se puede cambiar esto y realizar a distintas direcciones consultas
    queue.join()


if __name__ == '__main__':
    main(sys.argv)
