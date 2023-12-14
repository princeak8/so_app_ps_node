var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

//const topic = 'odukpaniNipp/pr';
const topic = 'odukpanits/pv';
const ncTopic = 'odukpanits/status';

const preparedData = () => {
    return {
        "id": "odukpaniNippPs",
        "units": [
            {
                "id": "gt1",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt2",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt3",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt4",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt5",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        // id: "odukpaniNippPs",
        id: "odukpaniNippPs",
        "nc": true,
    }
}

const lastData = '';

export const odukpaniNipp = (wss, client) => {
    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='odukpanits/pv') console.log(message.toString())
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //wsData = [data];
                const vals = message.toString();
                
                (sentTopic=='odukpanits/pv') ? wsClient.send(vals) : wsClient.send(vals);
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
Sample Data
{
    "id":"odukpaniNippPs",
    "t":"19:2:20", 
    "units":[
        {
            "id":"gt1",
            "gd":{
                "mw":-105.27,
                "A":187.58,
                "V":331.26,
                "mvar":22.33
            }
        },
        {
            "id":"gt2",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V": 0.00,
                "mvar": 0.00
            }
        },
        {
            "id":"gt3",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":331.51,
                "mvar": 0.00
            }
        },
        {
            "id":"gt4",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":330.73,
                "mvar": 0.00
            }
        },
        {
            "id":"gt5",
            "gd":{
                "mw":-103.20,
                "A":184.93,
                "V":330.30,
                "mvar":23.42
            }
        },
        {
            "id":"d1b",
            "td":{
                "mw":26.12,
                "A":82.24,
                "V":331.34,
                "mvar":39.31
            }
        },
        {
            "id":"d2b",
            "td":{
                "mw":25.87,
                "A":81.68,
                "V":330.18,
                "mvar":38.93
            }
        }
    ]
}
*/