var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'olorunsogo1ts/pv';
const ncTopic = 'olorunsogo1ts/status';

const preparedData = () => {
    return {
        "id": "olorunsogoNippPs",
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
                "id": "gt21",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt22",
                "pd": powerData(generateValues())
            },
            {
                "id": "st1",
                "pd": powerData(generateValues())
            },
            {
                "id": "st2",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "olorunsogoNippPs",
        "nc": true,
    }
}

const lastData = '';

export const olorunsogoNipp = (wss, client) => {
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
        // if(sentTopic=='olorunsogo1ts/pv') console.log(message.toString())
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
    "id":"olorunsogo1",
    "t":"16:42:32", 
    "lines":[
        {
            "id":"tr1",
            "gd":{"mw":33.90,"A":61.85,"V":321.14,"mvar": 5.77}
        },
        {
            "id":"tr2",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        }
    ]
}
*/