var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'shiroro/pr';

const preparedData = () => {
    return {
        "id": "shiroroPs",
        "units": [
            {
                "id": "411g1",
                "pd": powerData(generateValues())
            },
            {
                "id": "411g2",
                "pd": powerData(generateValues())
            },
            {
                "id": "411g3",
                "pd": powerData(generateValues())
            },
            {
                "id": "411g4",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "shiroroPs",
        "nc": true,
    }
}

const lastData = '';

export const shiroro = (wss, client) => {
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