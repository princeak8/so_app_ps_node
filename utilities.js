var WebSocket = require('ws');

export const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

exports.generateValues = () => {
    const power = randomNumber(95, 300);
    const mvar = randomNumber(0, 45);
    return {power: parseInt(power), mvar: parseInt(mvar)};
}

const generateValues = () => {
    const power = randomNumber(95, 300);
    const mvar = randomNumber(0, 45);
    const A = randomNumber(1, 600);
    const V = randomNumber(300, 360);
    return {mw: parseInt(power), mvar: parseInt(mvar), A: parseInt(A), V: parseInt(V)};
}

export const powerData = (vals) => {
    var {volt, current, power, mvar} = vals;
    return {
        mw: power,
        mvar: mvar
    }
};

const parseNested = (str) => {
    try {
        return JSON.parse(str, (_, val) => {
            if (typeof val === 'string')
                return parseNested(val)
            return val
        })
    } catch (exc) {
        return str
    }
}

const ihovborConversion = (vals) => {
    try{
        let jsonVals = JSON.parse(vals);
        let azura = {...jsonVals};
        let azuraUnits = [];
        let azuraIds = ['ohl1', 'ohl2'];
        let valKeys = [];
        let conversionDone = false;
        if(jsonVals.units && jsonVals.units.length > 0) {
            conversionDone = true;
            jsonVals.units.forEach((unit, i) => {
                if(azuraIds.includes(unit.id)) {
                    azuraUnits.push(unit);
                    valKeys.push(i);
                }
            });
            azura.id = 'azuraIppPs';
            azura.units = azuraUnits;
            // console.log(jsonVals.units);
            let i = 0; // i will track the key position, by adding one each time the array is spliced, to keep the key position correct
            valKeys.forEach((key) => {
                jsonVals.units.splice((key-i), 1);
                i++;
            });
        }
        if(conversionDone) {
            let ihovborBuffer = Buffer.from(JSON.stringify(jsonVals));
            let azuraBuffer = Buffer.from(JSON.stringify(azura));
            return [ihovborBuffer.toString(), azuraBuffer.toString()];
        }
        return [];
    } catch(e) {
        return [];
    }
}

const gereguConversion = (vals) => {
    try{
        let geregu = JSON.parse(vals);
        let gereguNipp = {...geregu};
        let linesIds = ['r1j', 'r2j'];
        let units = [];
        let keys = [];
        let conversionDone = false;
        if(geregu.units && geregu.units.length > 0) {
            conversionDone = true;
            geregu.units.forEach((unit, i) => {
                if(linesIds.includes(unit.id)) {
                    keys.push(i);
                }
                units.push(unit);
            })
            gereguNipp.id = 'gereguNipp';
            gereguNipp.units = units;
            let i = 0;
            keys.forEach((key) => {
                geregu.units.splice((key-i), 1);
                i++;
            });
        }
        if(conversionDone) {
            let gereguBuffer = Buffer.from(JSON.stringify(geregu));
            let gereguNippBuffer = Buffer.from(JSON.stringify(gereguNipp));
            return [gereguBuffer.toString(), gereguNippBuffer.toString()];
        }
        return [];
    } catch(e) {
        return [];
    }
}

const olorunsogoConversion = (vals) => {
    try{
        let olorunsogo = JSON.parse(vals);
        let olorunsogo2 = {...olorunsogo};
        let olorunsogoLines = {...olorunsogo};
        let olorunsogo2Lines = [];
        let olorunsogoLinesLines = [];
        let olorunsogo2LineIds = ['tr3', 'tr4'];
        let olorunsogoLinesIds = ['r1w', 'r2a'];
        let conversionDone = false;
        if(olorunsogo.lines && olorunsogo.lines.length > 0) {
            conversionDone = true;
            olorunsogo.lines.forEach((line) => {
                if(olorunsogo2LineIds.includes(line.id)) olorunsogo2Lines.push(line);
                if(olorunsogoLinesIds.includes(line.id)) olorunsogoLinesLines.push(line);
            })
            olorunsogo2.id = 'olorunsogo2';
            olorunsogoLines.id = 'olorunsogoLines';
            olorunsogo2.lines = olorunsogo2Lines;
            olorunsogoLines.lines = olorunsogoLinesLines;
        }
        if(conversionDone) {
            let olorunsogo2Buffer = Buffer.from(JSON.stringify(olorunsogo2));
            let olorunsogoLinesBuffer = Buffer.from(JSON.stringify(olorunsogoLines));
            return [olorunsogo2Buffer.toString(), olorunsogoLinesBuffer.toString()];
        }
        return [];
    } catch(e) {
        return [];
    }
}

const sapeleConversion = (vals) => {
    try{
        let sapele = JSON.parse(vals);
        let sapeleNipp = {...sapele};
        let sapeleSteam = {...sapele};
        let sapeleNippUnits = [];
        let sapeleSteamUnits = [];
        let sapeleNippUnitIds = ['gt1', 'gt2', 'gt3', 'gt4'];
        let sapeleSteamUnitIds = ['st1', 'st2', 'st3'];
        let conversionDone = false;
        if(sapele.units && sapele.units.length > 0) {
            conversionDone = true;
            sapele.units.forEach((unit) => {
                if(sapeleNippUnitIds.includes(unit.id)) sapeleNippUnits.push(unit);
                if(sapeleSteamUnitIds.includes(unit.id)) sapeleSteamUnits.push(unit);
            })
            sapeleNipp.id = 'sapeleNipp';
            sapeleSteam.id = 'sapeleSteam';
            sapeleNipp.units = sapeleNippUnits;
            sapeleSteam.units = sapeleSteamUnits;
        }
        if(conversionDone) {
            let sapeleNippBuffer = Buffer.from(JSON.stringify(sapeleNipp));
            let sapeleSteamBuffer = Buffer.from(JSON.stringify(sapeleSteam));
            return [sapeleNippBuffer.toString(), sapeleSteamBuffer.toString()];
        }
        return [];
    } catch(e) {
        return [];
    }
}

export const sendMessage = (wss, message, topic='') => {
    
    wss.clients.forEach((wsClient) => {
        // console.log('client ready');
        if (wsClient.readyState === WebSocket.OPEN) {
            let vals = message.toString();
            // if(topic == 'sapelets/pv') console.log(vals);
            send(vals, topic, wsClient);
        }
    });
}

const send = (msg, topic, wsClient) => {
    switch(topic) {
        case 'ihovborts/tv' :
            let ihovborArr = ihovborConversion(msg);
            if(ihovborArr.length > 0) ihovborArr.forEach((vals) => wsClient.send(vals)); break;
        case 'gereguGs/pv' :
            let gereguArr = gereguConversion(msg);
            if(gereguArr.length > 0) gereguArr.forEach((vals) => wsClient.send(vals)); break; 
        case 'olorunsogo2ts/tv' :
            let olorunsogoArr = olorunsogoConversion(msg);
            if(olorunsogoArr.length > 0) olorunsogoArr.forEach((vals) => wsClient.send(vals)); break;
        case 'sapelets/pv' :
            let sapeleArr = sapeleConversion(msg);
            if(sapeleArr.length > 0) sapeleArr.forEach((vals) => wsClient.send(vals)); break;
        default:
            wsClient.send(msg);
    }
}