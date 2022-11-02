var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'omotoso12ts/pv';

const ncData = () => {
    return {
        id: "omotosho2",
        "nc": true,
    }
}

const lastData = '';

export const omotoshoGas2 = (wss, client) => {
    client.on('connect', function () {
        //subscribe to topic

        client.subscribe(topic, function (err) {
            if (err) {
                console.log(err);
            }
        })
    })

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='omotoso12ts/pv') console.log(message.toString())
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //wsData = [data];
                const vals = message.toString();
                // console.log(vals);
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
    "id":"omotosho2",
    "t":"9:40:7", 
    "lines":[
        {
            "id":"tr3",
            "gd":{"mw":-0.00,"A": 0.57,"V":329.76,"mvar": 0.33}
        },
        {
            "id":"tr4",
            "gd":{"mw":30.69,"A":54.25,"V":333.71,"mvar": 6.36}
        }
    ]
}

*/