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

const ncData = () => {
    return {
        id: "gereguNippPs",
        "nc": true,
    }
}

const lastData = ''; 

export const gereguNipp = (wss, client) => {
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