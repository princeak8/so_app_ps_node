var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'egbinGs/tr';

const preparedData = () => {    
    return {
        id: "egbinGs",
        lines: [
            {
                id: "n7k",
                td: transmissionData(generateValues())
            },
            {
                id: "n8k",
                td: transmissionData(generateValues())
            },
            {
                id: "n6w",
                td: transmissionData(generateValues())
            },
            {
                id: "b6n",
                td: transmissionData(generateValues())
            },
            {
                id: "n3j",
                td: transmissionData(generateValues())
            },
            {
                id: "n4j",
                td: transmissionData(generateValues())
            },

            {
                id: "n21d",
                td: transmissionData(generateValues())
            },
            {
                id: "n22d",
                td: transmissionData(generateValues())
            },
        ]
    }
}

export const egbinGs = (wss, client) => {
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