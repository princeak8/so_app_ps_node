var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'jebbaTs/tv';
const ncTopic = 'jebbaTs/status';

const preparedData = () => {
    return {
        "id": "jebbaPs",
        "units": [
            {
                "id": "2g1",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g2",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g3",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g4",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g5",
                "pd": powerData(generateValues())
            },
            {
                "id": "2g6",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "jebbaPs",
        "nc": true,
    }
}

const lastData = ''; 

export const jebba = (wss, client) => {
    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='jebbaTs/tv') console.log(message.toString());
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
    "id":"jebbaTs",
    "t":"12:35:1", 
    "lines":[
        {
            "id":"b8j",
            "td":{"mw":180.75,"A":325.72,"V":335.08,"mvar":-55.45}
        },
        {
            "id":"b9j",
            "td":{"mw":174.67,"A":321.45,"V":329.81,"mvar":-55.00}
        }
    ]
}
*/