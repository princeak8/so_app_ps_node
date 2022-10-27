var WebSocket = require('ws');
var mqtt = require('mqtt');
const { powerData, generateValues } = require('../../utilities');

const topic = 'afam4gs/pv';

const preparedData = () => {
    return {
        "id": "afamIv_vPs",
        "units": [
            {
                "id": "gt17",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt18",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt19",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "afamIv_vPs",
        "nc": true,
    }
}

const lastData = ''; 

// export const afamIv_v = (wss, host, options) => {
//     var client  = mqtt.connect(host, options);
export const afamIv = (wss, client) => {
    client.on('connect', function () {
        //console.log('connected to mqtt afamIv_v');

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
        console.log("failed to connect Odukpani: "+error);
    })

    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        // if(sentTopic=='afam4gs/pv') console.log(message.toString());
        // console.log('message from mqtt: ', sentTopic+' '+topic);
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //console.log('Afam IV message sent out: ', sentTopic);
                const vals = message.toString();
                // console.log('sent data', vals)
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
Sample Response
{
    "id":"afamIv_vPs",
    "t":"11:50:2",
    "units":[
        {
            "id":"gt17",
            "td":{
                "mw":50.44,
                "A":3560.66,
                "V":10.79,
                "mvar":43.06
            }
        },
        {
            "id":"gt18",
            "td":{
                "mw": 0.00,"
                A": 0.00,
                "V": 0.00,
                "mvar": 0.00
            }
        }
    ]
}

*/