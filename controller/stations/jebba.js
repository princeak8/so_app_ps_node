var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'jebbaTs/tr';
const preparedData = () => {    
    return {
        id: "jebbaTs",
        lines: [
            {
                id: "k1j",
                td: transmissionData(generateValues())
            },
            {
                id: "k2j",
                td: transmissionData(generateValues())
            },
            {
                id: "j3r",
                td: transmissionData(generateValues())
            },


            {
                id: "j7r",
                td: transmissionData(generateValues())
            },


            {
                id: "b8j",
                td: transmissionData(generateValues())
            },
            
            {
                id: "b9j",
                td: transmissionData(generateValues())
            },
            {
                id: "j1h",
                td: transmissionData(generateValues())
            },
            {
                id: "j2h",
                td: transmissionData(generateValues())
            },
            {
                id: "j3g",
                td: transmissionData(generateValues())
            }
        ]
    }
}

export const jebba = (wss, client) => {
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