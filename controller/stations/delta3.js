var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'delta3gs/pv';

const preparedData = () => {
    return {
        "id": "delta3",
        "units": [
            {
                "id": "tr3",
                "pd": powerData(generateValues())
            },
            {
                "id": "tr4",
                "pd": powerData(generateValues())
            },
        ]
    }
};

const ncData = () => {
    return {
        id: "delta3",
        "nc": true,
    }
}

const lastData = '';

export const delta3 = (wss, client) => {
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
        // console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='delta3gs/pv') console.log(message.toString());
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
    "id":"delta3",
    "t":"12:19:40", 
    "lines":[
        {
            "id":"tr5",
            "gd":{"mw":31.30,"A":138.38,"V":132.56,"mvar": 5.79}
        },
        {
            "id":"tr6",
            "gd":{"mw":34.26,"A":149.39,"V":132.60,"mvar": 2.95}
        }
    ]
}
*/