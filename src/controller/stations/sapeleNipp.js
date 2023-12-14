var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'sapelets/pv';
const ncTopic = 'sapelets/status';

const preparedData = () => {
    return {
        "id": "sapeleNippPs",
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
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "sapeleNippPs",
        "nc": true,
    }
}

const lastData = '';

export const sapeleNipp = (wss, client) => {

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

/*
{
    "id":"sapeleNippPs",
    "t":"17:57:21", 
    "units":[
        {
            "id":"gt1",
            "gd":{
                "mw":-92.87,
                "A":157.82,
                "V":339.83,
                "mvar": 0.12
            }
        },
        {
            "id":"gt2",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":339.26,
                "mvar": 0.00
            }
        },
        {
            "id":"gt3",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":339.45,
                "mvar": 0.00
            }
        },
        {
            "id":"gt4",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":339.06,
                "mvar": 0.00
            }
        },
        {
            "id":"st1",
            "gd":{
                "mw":-81.71,
                "A":139.69,
                "V":339.63,
                "mvar":-8.62
            }
        },
        {
            "id":"st3",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":339.48,
                "mvar": 0.00
            }
        }
    ]
}
*/