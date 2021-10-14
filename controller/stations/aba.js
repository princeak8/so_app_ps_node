var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'aba/tr';

const preparedData = () => {
    return {
        "id": "aba",
        "lines": [
            {
                "id": "a23b",
                "td": transmissionData(generateValues())
            },
            {
                "id": "a26b",
                "td": transmissionData(generateValues())
            },
            {
                "id": "b21t",
                "td": transmissionData(generateValues())
            }
        ]
    }
};

export const aba = (wss, client) => {
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
                //const vals = message.toString();
                const vals = preparedData();
                wsClient.send(message.toString());
            }
        });
    })
};

//export default send;