import {
    afamIv, afamV, afamVi, delta2, delta3, delta4, egbin, ihovborNipp, jebba, kainji, odukpaniNipp, okpai, omoku, phMain, riversIpp, sapeleNipp, shiroro, eket, ekim, parasEnergy
} from './stations/index';
import { sendMessage } from '../utilities';

const send = (wss, client) => {
    const topics = [];
    client.on('message', async function (sentTopic, message) {
        if(!topics.includes(sentTopic)) {
            topics.push(sentTopic);
            // console.log("aws topics", topics);
        }
        // afamIv(wss, client);
        // afamV(wss, client);
        // afamVi(wss, client);
        // delta2(wss, client);
        // delta3(wss, client);
        // delta4(wss, client);
        // egbin(wss, client);

        // eket(wss, client);
        // ekim(wss, client);

        // ihovborNipp(wss, client);
        // jebba(wss, client);
        // kainji(wss, client);
        // odukpaniNipp(wss, client);
        // okpai(wss, client);
        // omoku(wss, client);
        // phMain(wss, client);
        // riversIpp(wss, client);
        // sapeleNipp(wss, client);
        // shiroro(wss, client);

        // parasEnergy(wss, client);

        sendMessage(wss, message, sentTopic);
    });
}

export default send;
