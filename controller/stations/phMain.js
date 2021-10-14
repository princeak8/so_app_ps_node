var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'phMain/tr';

const preparedData = () => {    
    return {
        id: "phMain",
        lines: [
            {
                id: "m21p",
                td: transmissionData(generateValues())
            },
            {
                id: "m22p",
                td: transmissionData(generateValues())
            },
            {
                id: "mk21p",
                td: transmissionData(generateValues())
            },
            {
                id: "v22p",
                td: transmissionData(generateValues())
            },
            {
                id: "v21p",
                td: transmissionData(generateValues())
            },
            {
                id: "f21p",
                td: transmissionData(generateValues())
            },
            {
                id: "f22p",
                td: transmissionData(generateValues())
            },
        ]
    }
}

export const phMain = (wss, client) => {
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