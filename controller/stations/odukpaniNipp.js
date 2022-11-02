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
Sample Data
{
    "id":"odukpaniNippPs",
    "t":"12:41:33", 
    "units":[
        {
            "id":"gt1",
            "gd":{"mw":-106.33,"A":188.16,"V":333.17,"mvar":22.04}
        },
        {
            "id":"gt2",
            "gd":{"mw": 0.00,"A": 0.00,"V":332.74,"mvar": 0.00}
        },
        {
            "id":"gt3",
            "gd":{"mw":-104.24,"A":186.03,"V":333.75,"mvar":26.25}
        },
        {
            "id":"gt4",
            "gd":{"mw":-103.24,"A":184.43,"V":332.84,"mvar":25.21}
        },
        {
            "id":"gt5",
            "gd":{"mw": 0.00,"A": 0.00,"V":332.34,"mvar": 0.00}
        }
    ]
}
*/