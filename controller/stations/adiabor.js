const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'adiabor/tr';

const preparedData = () => {
    return {
        "id": "adiabor",
        "lines": [
            {
                "id": "d1b",
                "td":  transmissionData(generateValues())
            },
            {
                "id": "d2b",
                "td": transmissionData(generateValues())
            },
            {
                "id": "d22t",
                "td": transmissionData(generateValues())
            }
        ]
    }
};

export const adiabor = (wss, client) => {
    client.on('connect', function () {
        //subscribe to topic

        client.subscribe(topic, function (err) {
            if (err) {
                console.log(err);
            }
        })
        setInterval(function(){
            const val = preparedData();
            client.publish(topic, JSON.stringify(val));
            
            
        }, 30000);
    })

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    client.on('message', async function (topic, message) {
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN) {
                //wsData = [data];
                //const vals = preparedData();
                const vals = message.toString();
                //const vals = JSON.parse(message);
                wsClient.send(message.toString());
            }
        });
    })
};

//export default send;