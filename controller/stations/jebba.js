var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'jebba/pr';

const preparedData = () => {
    return {
        "id": "jebbaPs",
        "units": [
            {
                "id": "2g1",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g2",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g3",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g4",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g5",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g6",
                "pd": powerData(generateValues())
            }
        ]
    }
};

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

    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //wsData = [data];
                //const vals = message.toString();
                const vals = preparedData();
                wsClient.send(vals);
            }
        });
    })
};

const sanitizeData = (message, topic) => {
    if(topic == ncTopic) {
        if(lastData == '') {
            message = ncData;
        }else{
            lastData["nc"] = true;
            message = lastData;
        }
    }else{
        lastData = message;
    }
}