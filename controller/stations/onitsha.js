var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'onitsha/tr';

const preparedData = () => {    
    return {
        id: "onitsha",
        lines: [
            {
                id: "b1t",
                td: transmissionData(generateValues())
            },
            {
                id: "b2t",
                td: transmissionData(generateValues())
            },
            {
                id: "d3t",
                td: transmissionData(generateValues())
            },
            {
                id: "t4a",
                td: transmissionData(generateValues())
            },
            {
                id: "t3h",
                td: transmissionData(generateValues())
            },
            {
                id: "k1t",
                td: transmissionData(generateValues())
            },
            {
                id: "k2t",
                td: transmissionData(generateValues())
            }
        ]
    }
}

export const onitsha = (wss, client) => {
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