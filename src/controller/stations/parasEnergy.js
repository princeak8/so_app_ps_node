var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'parasenergyPs/pv';

const preparedData = () => {
    return {
        "id": "parasEnergyPs",
        "units": [
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
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "parasEnergyPs",
        "nc": true,
    }
}

const lastData = '';

export const parasEnergy = (wss, client) => {

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        // if(sentTopic=='parasenergyPs/pv') console.log(message.toString())
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