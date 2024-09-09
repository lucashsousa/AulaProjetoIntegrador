const mqtt = require('mqtt')

const broker = "mqtt://test.mosquitto.org"
const topico = 'siChat/mqtt'

// Conectar ao broker
const client = mqtt.connect(broker)

client.on('connect', () => {
    console.log('Conectado ao broker')

    //Inscrever-se no tópico
    client.subscribe(topico, (err) => {
        if(!err){
            console.log(`Inscrito no tópico: ${topico}`)
        }
    })
})

client.on('message', (topico, message) => {
    //Exibir a mensagem recebida
    console.log(`Nova mensagem no tópico ${topico}: ${message.toString()}`)
})

client.on('error', (err) =>{
    console.log('Erro de conexão: ', err)
    client.end()
})