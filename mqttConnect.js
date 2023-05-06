
const mqtt = (client, topics) => {
    const connectedStations = [];
    client.on('connect', function () {
        // console.log('connected');
        if(topics.length > 0) {
            topics.forEach((topic) => {
                client.subscribe(topic, function (err) {
                    if (err) {
                        console.log(topic+': '+err);
                    }else{
                        if(!connectedStations.includes(topic)) connectedStations.push(topic);
                        // console.log(topic+': Connected');
                    }
                })
            })
            // console.log("connected stations", connectedStations);
        }
        
    });
    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })
}

export default mqtt;