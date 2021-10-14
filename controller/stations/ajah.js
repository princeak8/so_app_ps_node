var WebSocket = require('ws');
const { transmissionData, generateValues } = require('../../utilities');

const topic = 'ajah/tr';// var topicRange = 'osogbo/CR/';


const preparedData = () => {
    return {
        "id": "ajah",
        "lines": [
            {
                "id": "n3j",
                "td": transmissionData(generateValues())
            },
            {
                "id": "n4j",
                "td": transmissionData(generateValues())
            },
            {
                "id": "j1e",
                "td": transmissionData(generateValues())
            },
            {
                "id": "j1b",
                "td": transmissionData(generateValues())
            },
        ]
    }
};


// client.on('connect', function () {
//     //console.log('connected');
//     client.subscribe(myTopic, function (err) {
//         if (!err) {
            
//             setInterval(()=>{  
//                 var n = Math.floor(Math.random() * 10);
//                 client.publish('ugwuaji330kv/K1U/power', power[n]);

//                 n = Math.floor(Math.random() * 10);
//                 client.publish('ugwuaji330kv/K1U/mvar', mvar[n]);

//                 n = Math.floor(Math.random() * 10);
//                 client.publish('ugwuaji330kv/K1U/current', current[n]);

//                 n = Math.floor(Math.random() * 10);
//                 client.publish('ugwuaji330kv/K1U/voltage', voltage[n]);
//             }, 30000);
            
//         }else{
//             console.log(err);
//         }
//     })
// })

// client.on('error', function (error) {
//     console.log("failed to connect: "+error);
// })

// wss.on('connection', (ws) => {
//     console.log('connected to ws');
//     //ws.send('Welcome to the chat, enjoy :)');
// });

// if(data == undefined) {
//     var data = {power: '', mvar: '', voltage: '', current: ''};
// }
// client.on('message', async function (topic, message) {
//     // message is Buffer
//     //console.log('Message from '+topic+': '+message.toString());
//     data = await add(topic, message.toString(), data);
//     console.log(data);
//     //client.end();
//     /*
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             //wsData = [data];
//           client.send(JSON.stringify(data));
//         }
//     });
//     */
// })


export const ajah = (wss, client) => {
    client.on('connect', function () {
        //subscribe to topic

        client.subscribe(topic, function (err) {
            if (err) {
                console.log(err);
            }
        })
        setInterval(function(){
            const val = preparedData();
            client.publish(topic, JSON.stringify(val));
            
            
        }, 30000);
    })

    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })

    client.on('message', async function (topic, message) {
        //console.log('message from mqtt: ', message.toString());
        wss.clients.forEach((wsClient) => {
            //console.log('client ready');
            if (wsClient.readyState === WebSocket.OPEN) {
                //wsData = [data];
                //const vals = preparedData();
                const vals = preparedData();
                wsClient.send(message.toString());
            }
        });
    })
};