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

/*
{
    "id":"gereguPs",
    "t":"19:6:59", 
    "units":[
        {
            "id":"r1j",
            "gd":{
                "mw":-196.30,
                "A":340.35,
                "V":333.17,
                "mvar":-16.58
            }
        },
        {
            "id":"r2j",
            "gd":{
                "mw":-177.38,
                "A":307.81,
                "V":333.66,
                "mvar":-7.46
            }
        },
        {
            "id":"gt11",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V": 0.00,
                "mvar": 0.00
            }
        },
        {
            "id":"gt12",
            "gd":{
                "mw":123.32,
                "A":211.20,
                "V":337.79,
                "mvar": 7.47
            }
        },
        {
            "id":"gt13",
            "gd":{
                "mw":121.56,
                "A":211.43,
                "V":333.45,
                "mvar":10.68
            }
        }
    ]
}

*/