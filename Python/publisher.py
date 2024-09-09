import paho.mqtt.client as mqtt
import time

# Configurações do Broker
broker = "test.mosquitto.org"
porta = 1883
topico = "siChat/mqtt"

# Função para quando a conexão for estabelecidade com broker
def on_connect(client, userdata, flag, rc):
    print(f"Conectado ao broker com código de resultado {rc}")

# Criar client MQTT
client = mqtt.Client()

# Definir callback de conexão
client.on_connect = on_connect

# Conectar o broker
client.connect(broker, porta, 60)

# Iniciar o loop da rede para processar mensagens
client.loop_start()

print("Precione Ctrl + C para sair: ")
try:
    while True:
        mensagem = input("Digite a mensagem que deseja enviar: ")

        # Publicar a mensagem no tópico
        client.publish(topico, mensagem)
        print (f"Mensagem enviada: {mensagem}")
        time.sleep(1) # Estipula um tempo para suspender e evitar sobrecarga!
except KeyboardInterrupt:
    print("Saindo...")

# Encerrar o loop de rede e desconectar
client.loop_stop()
client.disconnect()