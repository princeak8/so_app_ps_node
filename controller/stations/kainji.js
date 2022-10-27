var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'kainjits/tv';
const ncTopic = 'kainjits/status';

const preparedData = () => {
    return {
        "id": "kainjiPs",
        "units": [
            {
                "id": "1g5",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g6",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g7",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g8",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g9",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g10",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g11",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g12",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "kainjiPs",
        "nc": true,
    }
}

const lastData = ''; 

export const kainji = (wss, client) => {
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
                const vals = message.toString();
                wsClient.send(vals);
            }
        });
    })
};

const sanitizeData = (message, topic) => {
    // if(topic == ncTopic) {
    //     if(lastData == '') {
    //         message = ncData;
    //     }else{
    //         lastData["nc"] = true;
    //         message = lastData;
    //     }
    // }else{
    //     lastData = message;
    // }
    return message;
}