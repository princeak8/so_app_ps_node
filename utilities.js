var WebSocket = require('ws');

export const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

exports.generateValues = () => {
    const power = randomNumber(95, 300);
    const mvar = randomNumber(0, 45);
    return {power: parseInt(power), mvar: parseInt(mvar)};
}

export const powerData = (vals) => {
    var {volt, current, power, mvar} = vals;
    return {
        mw: power,
        mvar: mvar
    }
};

export const sendMessage = (wss, message, topic='') => {
    
    wss.clients.forEach((wsClient) => {
        // console.log('client ready');
        if (wsClient.readyState === WebSocket.OPEN) {
            // if(topic=='omotoso2ts/tv') console.log(topic);
            const vals = message.toString();
            // console.log(vals);
            // if(topic=='omotoso11ts/pv' || topic == 'omotoso12ts/pv') console.log(vals);
            wsClient.send(vals);
        }
    });

    // {"id":"omotosho1","t":"14:25:23", "lines":[{"id":"tr1","gd":{"mw":39.58,"A":68.79,"V":334.47,"mvar": 4.31}},{"id":"tr2","gd":{"mw": 0.00,"A": 0.00,"V":335.60,"mvar": 0.00}}]}
    // {"id":"omotosho2","t":"14:26:57", "lines":[{"id":"tr3","gd":{"mw":-30.48,"A":53.26,"V":331.62,"mvar":-2.41}},{"id":"tr4","gd":{"mw": 0.00,"A": 0.00,"V":335.62,"mvar": 0.00}}]}

}