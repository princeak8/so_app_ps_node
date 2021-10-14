var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'kaduna/tr';

const preparedData = () => {    
    return {
        id: "kaduna",
        lines: [
            {
                id: "r1m",
                td: transmissionData(generateValues())
            },
            {
                id: "r2m",
                td: transmissionData(generateValues())
            },
            {
                id: "m6n",
                td: transmissionData(generateValues())
            },
            {
                id: "m2s",
                td: transmissionData(generateValues())
            }
        ]
    }
}

export const kaduna = (wss, client) => {
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
        //console.log('message from mqtt: ', message.toString());
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN) {
                //wsData = [data];
                //const vals = preparedData();
                const vals = message.toString();
                wsClient.send(message.toString());
            }
        });
    })
};