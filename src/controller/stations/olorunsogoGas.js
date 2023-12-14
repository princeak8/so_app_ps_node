var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'olorunsogo2ts/tv';
const ncTopic = 'olorunsogo2ts/status';

const preparedData = () => {
    return {
        "id": "olorunsogoGasPs",
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
            },
            {
                "id": "gt6",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt7",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt8",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "olorunsogoGasPs",
        "nc": true,
    }
}

const lastData = '';

export const olorunsogoGas = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='olorunsogo2ts/tv') console.log(message.toString())
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
    "id":"olorunsogoPhase1Gs",
    "t":"16:51:57", 
    "lines":[
        {
            "id":"tr3",
            "gd":{"mw":29.12,"A":54.85,"V":319.85,"mvar": 8.67}
        },
        {
            "id":"tr4",
            "gd":{"mw":29.41,"A":55.09,"V":319.56,"mvar": 7.95}
        },
        {
            "id":"r1w",
            "td":{"mw":96.28,"A":270.38,"V":228.41,"mvar":25.66}
        },
        {
            "id":"r2a",
            "td":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        }
    ]
}
*/