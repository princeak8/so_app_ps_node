var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'alaoji/tr';

const preparedData = () => {
    return {
        id: "alaoji",
        lines: [
            {
                id: "l7a",
                td: transmissionData(generateValues())
            },
            {
                id: "l8a",
                td: transmissionData(generateValues())
            },
            {
                id: "t4a",
                td: transmissionData(generateValues())
            },
            {
                id: "f1a",
                td: transmissionData(generateValues())
            },
            {
                id: "f2a",
                td: transmissionData(generateValues())
            },
            {
                id: "a1k",
                td: transmissionData(generateValues())
            },
            {
                id: "a2k",
                td: transmissionData(generateValues())
            },
            {
                id: "a23w",
                td: transmissionData(generateValues())
            },
            {
                id: "a24w",
                td: transmissionData(generateValues())
            },
            {
                id: "a23b",
                td: transmissionData(generateValues())
            },
            {
                id: "a26b",
                td: transmissionData(generateValues())
            },
        ]
    }
};

export const alaoji = (wss, client) => {
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