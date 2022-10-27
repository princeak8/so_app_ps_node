var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'dadinkowags/tv';

const preparedData = () => {
    return {
        "id": "dadinKowaPs",
        "units": [
            {
                "id": "g1",
                "pd": powerData(generateValues())
            },
            {
                "id": "g2",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "dadinKowaPs",
        "nc": true,
    }
}

const lastData = ''; 

export const dadinKowa = (wss, client) => {
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

    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        //console.log('message from mqtt: ', message.toString());
        // if(sentTopic=='dadinkowags/tv') console.log(message.toString());
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
    "id":"dadinKowaGs",
    "t":"18:46:18", 
    "lines":[
        {
            "id":"w23e",
            "td":{"mw":13.57,"A":56.65,"V":139.55,"mvar": 1.13}
        },
        {
            "id":"w21b",
            "td":{"mw": 6.51,"A":27.27,"V":139.43,"mvar":-1.00}
        }
    ]
}
*/