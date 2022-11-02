var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'delta4gs/tv';

const preparedData = () => {
    return {
        "id": "deltaGs",
        "lines": [
            {
                "id": "g3b",
                "pd": powerData(generateValues())
            },
            {
                "id": "s4g",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "deltaGs",
        "nc": true,
    }
}

const lastData = '';

export const delta4 = (wss, client) => {
    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='delta4gs/tv') console.log(message.toString());
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
    "id":"deltaGs",
    "t":"12:23:59", 
    "lines":[
        {
            "id":"g3b",
            "td":{"mw":110.90,"A":192.58,"V":351.40,"mvar":-37.43}
        },
        {
            "id":"s4g",
            "td":{"mw":121.27,"A":213.41,"V":338.72,"mvar":-29.72}
        }
    ]
}
*/