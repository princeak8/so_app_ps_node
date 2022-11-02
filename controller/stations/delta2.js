var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'delta2gs/pv';

const preparedData = () => {
    return {
        "id": "delta2",
        "units": [
            {
                "id": "tr3",
                "pd": powerData(generateValues())
            },
            {
                "id": "tr4",
                "pd": powerData(generateValues())
            },
        ]
    }
};

const ncData = () => {
    return {
        id: "delta2",
        "nc": true,
    }
}

const lastData = '';

export const delta2 = (wss, client) => {

    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='delta2gs/pv') console.log(message.toString());
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
    "id":"delta2",
    "t":"12:15:29", 
    "lines":[
        {
            "id":"tr3",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        },
        {
            "id":"tr4",
            "gd":{"mw":16.84,"A":73.21,"V":133.14,"mvar": 1.18}
        }
    ]
}
*/