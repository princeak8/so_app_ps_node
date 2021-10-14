var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'gereguNipp/pr';

const preparedData = () => {
    return {
        "id": "gereguNippPs",
        "units": [
            {
                "id": "gt21",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt22",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt23",
                "pd": powerData(generateValues())
            }
        ]
    }
};

export const gereguNipp = (wss, client) => {
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