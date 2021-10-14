var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'benin/tr';

const preparedData = () => {
    return {
        id: "benin",
        lines: [
            {
                id: "v7b",
                td: transmissionData(generateValues())
            },
            {
                id: "b5m",
                td: transmissionData(generateValues())
            },
            {
                id: "b6n",
                td: transmissionData(generateValues())
            },
            {
                id: "g3b",
                td: transmissionData(generateValues())
            },
            {
                id: "s3b",
                td: transmissionData(generateValues())
            },
            {
                id: "s4b",
                td: transmissionData(generateValues())
            },
            {
                id: "s5b",
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
                id: "b1t",
                td: transmissionData(generateValues())
            },
            {
                id: "b2t",
                td: transmissionData(generateValues())
            },{
                id: "b3d",
                td: transmissionData(generateValues())
            }
        ]
    }
};

export const benin = (wss, client) => {
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
