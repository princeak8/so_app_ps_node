var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'egbings/pv';

const preparedData = () => {
    return {
        "id": "egbinPs",
        "units": [
            {
                "id": "st1",
                "pd": powerData(generateValues())
            },
            {
                "id": "st2",
                "pd": powerData(generateValues())
            },
            {
                "id": "st3",
                "pd": powerData(generateValues())
            },
            {
                "id": "st4",
                "pd": powerData(generateValues())
            },
            {
                "id": "st5",
                "pd": powerData(generateValues())
            },
            {
                "id": "st6",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "egbinPs",
        "nc": true,
    }
}

const lastData = '';

export const egbin = (wss, client) => {
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
        // if(sentTopic=='egbings/pv') console.log(message.toString());
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
    "id":"egbinPs",
    "t":"12:27:14", 
    "units":[
        {
            "id":"st1",
            "gd":{"mw":109.10,"A":4202.78,"V":15.37,"mvar":24.55}
        },
        {
            "id":"st2",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        },
        {
            "id":"st3",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        },
        {
            "id":"st4",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        },
        {
            "id":"st5",
            "gd":{"mw":129.62,"A":5109.42,"V":15.08,"mvar":31.60}
        },
        {
            "id":"st6",
            "gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}
        }
    ]
}

*/