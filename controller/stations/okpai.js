var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'okpaiippGs/tv';
const status = 'okpaiippGs/status';

const preparedData = () => {
    return {
        "id": "okpaiGs",
        "units": [
            {
                "id": "gt11",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt12",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt18",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "okpaiGs",
        "nc": true,
    }
}

const lastData = '';

export const okpai = (wss, client) => {
    client.on('connect', function () {
        //subscribe to topic

        client.subscribe(topic, function (err) {
            if (err) {
                console.log(err);
            }
        })
        // setInterval(function(){
        //     const val = preparedData();
        //     client.publish(topic, JSON.stringify(val));
        // }, 30000);
    })

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);

        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='okpaiippGs/tv') console.log(message.toString())
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