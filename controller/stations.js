import {
    afamIv_v, afamVi, alaoji, azuraIpp, dadinKowa, delta, egbin, eket, ekim, gbarain, geregu, gereguNipp, ibom, ihovborNipp, jebba, kainji, odukpaniNipp, okpai, olorunsogoGas, olorunsogoNipp, 
    omoku, omotoshoGas, omotoshoNipp, parasEnergy, riversIpp, sapeleNipp, sapeleSteam, shiroro, transamadi, 
    ikotEkpene, omotoshoGas1, omotoshoGas2
} from './stations/index';

import { sendMessage } from '../utilities';

const send = (wss, client) => {
    const topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) {
            topics.push(sentTopic);
            // console.log("ncc topics", topics);
        }
        // geregu(wss, client);
        // omotoshoNipp(wss, client);
        // omotoshoGas1(wss, client);
        // omotoshoGas2(wss, client);
        // olorunsogoGas(wss, client);
        // olorunsogoNipp(wss, client);
        // alaoji(wss, client);
        // dadinKowa(wss, client);
        // gbarain(wss, client);
        
        // parasEnergy(wss, client);
        // eket(wss, client);
        // ekim(wss, client);


        sendMessage(wss, message);


        // okpai(wss, client);
        // afamIv_v(wss, client);
        // afamVi(wss, client);
        
        // azuraIpp(wss, client);
        // delta(wss, client);
        // egbin(wss, client);
        
        // gereguNipp(wss, client);
        // ibom(wss, client);
        // ihovborNipp(wss, client);
        // jebba(wss, client);
        // kainji(wss, client);
        
        
        // ikotEkpene(wss, client);
        // odukpaniNipp(wss, client);

        
        
        // omoku(wss, client);
        // omotoshoGas(wss, client);
        
        
        // riversIpp(wss, client);
        // sapeleNipp(wss, client);
        // sapeleSteam(wss, client);
        // shiroro(wss, client);
        // transamadi(wss, client);

    });
    
}

export default send;
