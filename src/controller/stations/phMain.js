var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'phmains/tv';
const ncTopic = 'phmains/status';

const preparedData = () => {
    return {
        "id": "phMain",
        "units": [
            {
                "id": "gt1",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "phMain",
        "nc": true,
    }
}

var lastData = '';

export const phMain = (wss, client) => {

    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='phmains/tv') console.log(message.toString())
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
    return message;
}