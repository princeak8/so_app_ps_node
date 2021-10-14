var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'ikejaWest/tr';

const preparedData = () => {    
    return {
        id: "ikejaWest",
        lines: [
            {
                id: "r1w",
                td: transmissionData(generateValues())
            },
            {
                id: "h1w",
                td: transmissionData(generateValues())
            },
            {
                id: "m5w",
                td: transmissionData(generateValues())
            },
            {
                id: "nw1bs",
                td: transmissionData(generateValues())
            },
            {
                id: "w3l",
                td: transmissionData(generateValues())
            },
            {
                id: "k7w",
                td: transmissionData(generateValues())
            },
            {
                id: "k8w",
                td: transmissionData(generateValues())
            },
            {
                id: "n6w",
                td: transmissionData(generateValues())
            },
            {
                id: "w4l",
                td: transmissionData(generateValues())
            }
        ]
    }
}

export const ikejaWest = (wss, client) => {
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