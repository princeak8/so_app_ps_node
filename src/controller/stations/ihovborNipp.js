var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'ihovborts/tv';
const ncTopic = 'ihovborts/status';

const preparedData = () => {
    return {
        "id": "ihovborNippPs",
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
        id: "ihovborNippPs",
        "nc": true,
    }
}

const lastData = ''; 

export const ihovborNipp = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='ihovborts/tv') console.log(message.toString());
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
    "id":"ihovborNippPs",
    "t":"12:31:22", 
    "units":[
        {
            "id":"gt1",
            "gd":{"mw": 0.00,"A": 0.00,"V":334.26,"mvar": 0.00}
        },
        {
            "id":"gt2",
            "gd":{"mw": 0.00,"A": 0.00,"V":333.73,"mvar": 0.00}
        },
        {
            "id":"gt3",
            "gd":{"mw": 0.00,"A": 0.00,"V":333.95,"mvar": 0.00}
        },
        {
            "id":"gt4",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        },
        {
            "id":"ohl1",
            "gd":{"mw":-275.19,"A":476.31,"V":334.08,"mvar":12.90}
        },
        {
            "id":"ohl2",
            "gd":{"mw":-67.92,"A":117.58,"V":333.92,"mvar": 3.40}
        }
    ]
}

{
    "id":"ihovborNippPs","t":"16:39:33", 
    "units":[
        {
            "id":"gt1","gd":{
                "mw": 0.00,"A": 0.00,"V":335.43,"mvar": 0.00
            }
        },
        {"id":"gt2","gd":{"mw": 0.00,"A": 0.00,"V":334.72,"mvar": 0.00}},{"id":"gt3","gd":{"mw": 0.00,"A": 0.00,"V":334.97,"mvar": 0.00}},{"id":"gt4","gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}},{"id":"ohl1","gd":{"mw":-217.42,"A":375.72,"V":334.73,"mvar":19.80}},{"id":"ohl2","gd":{"mw":-218.69,"A":378.93,"V":334.94,"mvar":22.69}}]
}
*/