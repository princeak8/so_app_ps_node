var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'afam6ts/tv';
const ncTopic = 'afam6ts/status';

const preparedData = () => {
    return {
        "id": "afamViPs",
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
            },
            {
                "id": "gt18",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "afamViTs",
        "nc": true,
    }
}

const lastData = ''; 

export const afamVi = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='afam6ts/tv') console.log(message.toString());
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
    "id":"afamViTs",
    "t":"12:13:2", 
    "lines":[
        {
            "id":"ada200",
            "td":{"mw": 0.00,"A": 0.00,"V":333.48,"mvar": 0.00}
        },
        {
            "id":"adb200",
            "td":{"mw": 0.00,"A": 0.00,"V":333.42,"mvar": 0.00}
        }
    ]
}
*/