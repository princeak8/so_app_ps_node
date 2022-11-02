var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'alaojinippts/tv';

const preparedData = () => {
    return {
        "id": "alaojiPs",
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
        id: "alaojiPs",
        "nc": true,
    }
}

const lastData = ''; 

export const alaoji = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='alaojinippts/tv') console.log(message.toString());
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
    "id":"alaoji",
    "t":"18:40:6", 
    "lines":[
        {
            "id":"l7a",
            "td":{"mw":46.43,"A":80.31,"V":334.41,"mvar": 2.76}
        },
        {
            "id":"l8a",
            "td":{"mw":50.78,"A":87.88,"V":334.27,"mvar": 2.77}
        }
    ]
}
*/