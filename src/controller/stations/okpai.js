var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'OkpaiippGs/tv';
const status = 'OkpaiippGs/status';

const preparedData = () => {
    return {
        "id": "okpaiGs",
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
                "id": "gt18",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "okpaiGs",
        "nc": true,
    }
}

const lastData = '';

export const okpai = (wss, client) => {
    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);

        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='OkpaiippGs/tv') console.log(message.toString())
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
    "id":"okpaiGs",
    "t":"12:19:42", 
    "lines":[
        {
            "id":"k1t",
            "td":{"mw":157.48,"A":280.73,"V":334.14,"mvar":-39.55}
        },
        {
            "id":"k2t",
            "td":{"mw":157.28,"A":279.79,"V":334.68,"mvar":-40.20}
        }
    ]
}

*/