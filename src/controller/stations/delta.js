var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'delta/pr';

const preparedData = () => {
    return {
        "id": "deltaPs",
        "units": [
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
            },
            {
                "id": "gt9",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt10",
                "pd": powerData(generateValues())
            },
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
                "id": "gt14",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt15",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt16",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt17",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt18",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt19",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt20",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "deltaPs",
        "nc": true,
    }
}

const lastData = '';

export const delta = (wss, client) => {
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