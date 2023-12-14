var WebSocket = require('ws');
var mqtt = require('mqtt');
const { powerData, generateValues } = require('../../utilities');

const topic = 'afam5gs/pv';
const status = 'afam5gs/status';

const preparedData = () => {
    return {
        "id": "afamVPs",
        "units": [
            {
                "id": "gt19",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt20",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "afamVPs",
        "nc": true,
    }
}

const lastData = ''; 

export const afamV = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', sentTopic+' '+topic);
        // if(sentTopic=='afam5gs/pv') console.log(message.toString());
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //console.log('Afam V message sent out: ', sentTopic);
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

/*
Sample Response

{
    "id":"afamVPs",
    "t":"12:0:38", 
    "units":[
        {
            "id":"gt20",
            "gd":{
                "mw":-127.94,"A":222.03,"V":333.72,"mvar": 3.25
            }
        }
    ]
}
*/