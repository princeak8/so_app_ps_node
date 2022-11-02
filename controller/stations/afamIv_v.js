var WebSocket = require('ws');
var mqtt = require('mqtt');
const { powerData, generateValues } = require('../../utilities');

const topic = 'afamIv_v/pr';

const preparedData = () => {
    return {
        "id": "afamIv_vPs",
        "units": [
            {
                "id": "gt17",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt18",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt19",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "afamIv_vPs",
        "nc": true,
    }
}

const lastData = ''; 

// export const afamIv_v = (wss, host, options) => {
//     var client  = mqtt.connect(host, options);
export const afamIv_v = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', sentTopic+' '+topic);
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //console.log('Odukpani message sent out: ', sentTopic);
                //wsData = [data];
                //const vals = preparedData();
                const vals = message.toString();
                //console.log('sent data', vals)
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