var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'shirorogs/pv';

const preparedData = () => {
    return {
        "id": "shiroroPs",
        "units": [
            {
                "id": "411g1",
                "pd": powerData(generateValues())
            },
            {
                "id": "411g2",
                "pd": powerData(generateValues())
            },
            {
                "id": "411g3",
                "pd": powerData(generateValues())
            },
            {
                "id": "411g4",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "shiroroPs",
        "nc": true,
    }
}

const lastData = '';

export const shiroro = (wss, client) => {
    client.on('connect', function () {
        //subscribe to topic

        client.subscribe(topic, function (err) {
            if (err) {
                console.log(err);
            }
        })
        // setInterval(function(){
        //     const val = preparedData();
        //     client.publish(topic, JSON.stringify(val));
        // }, 30000);
    })

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='shirorogs/pv') console.log(message.toString())
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
    "id":"shiroroPs",
    "t":"13:6:47", 
    "units":[
        {
            "id":"411g1",
            "gd":{"mw":151.07,"A":5687.12,"V":15.33,"mvar":-8.51}
        },
        {
            "id":"411g2",
            "gd":{"mw":137.89,"A":5220.18,"V":15.31,"mvar":-12.64}
        },
        {
            "id":"411g3",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        },
        {
            "id":"411g4",
            "gd":{"mw":153.74,"A":5836.51,"V":15.25,"mvar":-12.67}
        }
    ]
}
*/