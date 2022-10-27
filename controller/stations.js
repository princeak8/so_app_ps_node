import {
    afamIv_v, afamVi, alaoji, azuraIpp, dadinKowa, delta, egbin, gbarain, geregu, gereguNipp, ibom, ihovborNipp, jebba, kainji, odukpaniNipp, okpai, olorunsogoGas, olorunsogoNipp, 
    omoku, omotoshoGas, omotoshoNipp, parasEnergy, riversIpp, sapeleNipp, sapeleSteam, shiroro, transamadi, 
    ikotEkpene, omotoshoGas1, omotoshoGas2
} from './stations/index';

const send = (wss, client) => {
    geregu(wss, client);
    omotoshoNipp(wss, client);
    omotoshoGas1(wss, client);
    omotoshoGas2(wss, client);
    olorunsogoGas(wss, client);
    olorunsogoNipp(wss, client);
    alaoji(wss, client);
    dadinKowa(wss, client);
    gbarain(wss, client);

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

    okpai(wss, client);
    
    // omoku(wss, client);
    // omotoshoGas(wss, client);
    
    // parasEnergy(wss, client);
    // riversIpp(wss, client);
    // sapeleNipp(wss, client);
    // sapeleSteam(wss, client);
    // shiroro(wss, client);
    // transamadi(wss, client);


    
}

export default send;
