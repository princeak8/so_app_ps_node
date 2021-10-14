var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'ajaokuta/tr';

const preparedData = () => {
    return {
        id: "ajaokuta",
        lines: [
            {
                id: "j1l",
                td: transmissionData(generateValues())
            },
            {
                id: "j2l",
                td: transmissionData(generateValues())
            },
            {
                id: "b11j",
                td: transmissionData(generateValues())
            },
            {
                id: "b12j",
                td: transmissionData(generateValues())
            },
            {
                id: "r1j",
                td: transmissionData(generateValues())
            },
            {
                id: "r2j",
                td: transmissionData(generateValues())
            },
        ]
    }
};

export const ajaokuta = (wss, client) => {
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
                const vals = preparedData();
                wsClient.send(message.toString());
            }
        });
    })
};