var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'riversIppPs/pr';
const ncTopic = 'riversIppPs/status';

const preparedData = () => {
    return {
        "id": "riversIppPs",
        "units": [
            {
                "id": "gt1",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "riversIppPs",
        "nc": true,
    }
}

var lastData = '';

export const riversIpp = (wss, client) => {
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
        // if(sentTopic=='riversIppPs/pr') console.log(message.toString())
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
    if(topic == ncTopic) {
        if(lastData == '') {
            message = ncData;
        }else{
            lastData["nc"] = true;
            message = lastData;
        }
    }else{
        lastData = message;
    }
    return message;
}

/*
Sample Data
{
    "id":"riversIppPs",
    "t":"12:56:59", 
    "units":[
        {
            "id":"gt1",
            "gd":{"mw":-162.42,"A":747.78,"V":125.49,"mvar": 6.07}
        }
    ]
}
*/