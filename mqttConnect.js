
const mqtt = (client, topics) => {
    client.on('connect', function () {
        // console.log('connected');
        if(topics.length > 0) {
            topics.forEach((topic) => {
                client.subscribe(topic, function (err) {
                    if (err) {
                        console.log(topic+': '+err);
                    }
                })
            })
        }
        
    });
    client.on('error', function (error) {
        console.log("failed to connect: "+error);
    })
}

export default mqtt;