const mqtt = require('mqtt')

// Configuração do broker
const broker = "mqtt://test.mosquitto.org"
const topico = 'siChat/mqtt'

// Conectar ao broker
const client = mqtt.connect(broker)

client.on('connect', () => {
    console.log('Conectado ao broker')

    // Ler mensagens do terminal e publicar no tópico MQTT
    process.stdin.on('data', (data) => {
        const mensagem = data.toString().trim();
        client.publish(topico, mensagem)
        console.log(`Mensagem enviada: ${mensagem}`)
    })
})

client.on('error', (err) => {
    console.log('Erro de conexão: ', err)
    client.end()
})