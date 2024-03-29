var WebSocket = require("ws");
const { powerData, generateValues } = require("../../utilities");

const topic = "transamadi/pr";

const preparedData = () => {
  return {
    id: "transamadiPs",
    units: [
      {
        id: "gt1",
        pd: powerData(generateValues()),
      },
      {
        id: "gt2",
        pd: powerData(generateValues()),
      },
      {
        id: "gt3",
        pd: powerData(generateValues()),
      },
      {
        id: "gt4",
        pd: powerData(generateValues()),
      },
    ],
  };
};

const ncData = () => {
  return {
    id: "transamadiPs",
    nc: true,
  };
};

const lastData = "";

export const transamadi = (wss, client) => {
  var topics = [];

  client.on("message", async function (sentTopic, message) {
    // console.log(message);
    if (!topics.includes(sentTopic)) topics.push(sentTopic);
    // console.log(topics);
    //console.log('message from mqtt: ', message.toString());
    wss.clients.forEach((wsClient) => {
      //console.log('client ready');
      if (wsClient.readyState === WebSocket.OPEN && sentTopic == topic) {
        message = sanitizeData(message, sentTopic);
        //wsData = [data];
        const vals = message.toString();
        // console.log(vals);
        wsClient.send(vals);
      }
    });
  });
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
};
