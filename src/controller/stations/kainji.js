var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'kainjits/tv';
const ncTopic = 'kainjits/status';

const preparedData = () => {
    return {
        "id": "kainjiPs",
        "units": [
            {
                "id": "1g5",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g6",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g7",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g8",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g9",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g10",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g11",
                "pd": powerData(generateValues())
            },
            {
                "id": "1g12",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "kainjiPs",
        "nc": true,
    }
}

const lastData = ''; 

export const kainji = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='kainjits/tv') console.log(message.toString())
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
    "id":"kainjiTs",
    "t":"15:2:50", 
    "lines":[
        {
            "id":"k1j",
            "td":{"mw":88.11,"A":153.80,"V":333.65,"mvar":-8.57}
        },
        {
            "id":"k2j",
            "td":{"mw":89.08,"A":154.27,"V":335.29,"mvar":-6.75}
        },
        {
            "id":"k3r",
            "td":{"mw":190.11,"A":341.43,"V":335.05,"mvar":-55.45}
        },
        {
            "id":"k1f",
            "td":{"mw":13.87,"A":25.38,"V":330.10,"mvar": 4.40}
        }
    ]
}

*/