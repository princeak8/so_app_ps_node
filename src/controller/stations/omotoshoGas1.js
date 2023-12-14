var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'omotoso11ts/pv';

const ncData = () => {
    return {
        id: "omotosho1",
        "nc": true,
    }
}

const lastData = '';

export const omotoshoGas1 = (wss, client) => {

    client.on('message', async function (sentTopic, message) {
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='omotoso11ts/pv') console.log(message.toString())
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
    "id":"omotosho1",
    "t":"9:42:13", 
    "lines":[
        {
            "id":"tr1",
            "gd":{"mw":31.34,"A":54.62,"V":333.32,"mvar": 2.85}
        },
        {
            "id":"tr2",
            "gd":{"mw":-32.20,"A":56.17,"V":334.42,"mvar":-4.56}
        }
    ]
}

*/