var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'gereguGs/pv';
const ncTopic = 'gereguGs/status';

const preparedData = () => {
    return {
        "id": "gereguPs",
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
                "id": "gt13",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "gereguPs",
        "nc": true,
    }
}

const lastData = ''; 

export const geregu = (wss, client) => {
    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        // console.log('message from mqtt: ', message.toString());
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