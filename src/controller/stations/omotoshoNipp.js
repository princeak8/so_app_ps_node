var WebSocket = require('ws');
const { powerData, generateValues } = require('../../utilities');

const topic = 'omotoso2ts/tv';

const preparedData = () => {
    return {
        "id": "omotoshoNippPs",
        "units": [
            {
                "id": "gt1",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt2",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt3",
                "pd": powerData(generateValues())
            },
            {
                "id": "gt4",
                "pd": powerData(generateValues())
            }
        ]
    }
};

const ncData = () => {
    return {
        id: "omotoshoNippPs",
        "nc": true,
    }
}

const lastData = '';

export const omotoshoNipp = (wss, client) => {

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    var topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) topics.push(sentTopic);
        // console.log(topics);
        // if(sentTopic=='omotoso2ts/tv') console.log(message.toString())
        // console.log('message from mqtt: ', message.toString());
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
                message = sanitizeData(message, sentTopic);
                //wsData = [data];

                let data = JSON.parse(message.toString());
                data.units.forEach((unit) => {
                    switch(unit.id) {
                        case 'tr1' : unit.id = 'gt1'; break;
                        case 'tr2' : unit.id = 'gt2'; break;
                        case 'tr3' : unit.id = 'gt3'; break;
                        case 'tr4' : unit.id = 'gt4'; break;
                    }
                })
                const vals = JSON.stringify(data);
                //const vals = message.toString();
                // console.log(vals);
                wsClient.send(vals);
            }
        });
    })
};

/*
Sample Data
{"id":"omotoshoNippPs","t":"9:45:48", "units":[{"id":"tr1","gd":{"mw":-93.97,"A":165.05,"V":334.16,"mvar":-17.18}},{"id":"tr2","gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}},{"id":"tr3","gd":{"mw": 0.00,"A": 0.00,"V":334.01,"mvar": 0.00}},{"id":"tr4","gd":{"mw":-95.84,"A":168.27,"V":334.14,"mvar":-17.04}}]
}
{
    "id":"omotoshoNippPs",
    "t":"13:57:14", 
    "units":[
        {
            "id":"tr1",
            "gd":{
                "mw":-98.97,
                "A":177.27,
                "V":330.22,
                "mvar":-21.98
            }
        },
        {
            "id":"tr2",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V": 0.00,
                "mvar": 0.00
            }
        },
        {
            "id":"tr3",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":330.07,
                "mvar": 0.00
            }
        },
        {
            "id":"tr4",
            "gd":{
                "mw": 0.00,
                "A": 0.00,
                "V":330.16,
                "mvar": 0.00
            }
        }
    ]
}
{"id":"omotoshoNippPs","t":"13:57:14", "units":[{"id":"tr1","gd":{"mw":-98.97,"A":177.27,"V":330.22,"mvar":-21.98}},{"id":"tr2","gd":{"mw": 0.00,"A": 0.00,"V": 0.00,"mvar": 0.00}},{"id":"tr3","gd":{"mw": 0.00,"A": 0.00,"V":330.07,"mvar": 0.00}},{"id":"tr4","gd":{"mw": 0.00,"A": 0.00,"V":330.16,"mvar": 0.00}}]}
*/

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