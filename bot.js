const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

console.log("Ready to level up!");

client.on("message", async message => {
  const prefix = config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.id !== client.user.id || message.content.indexOf(client.config.prefix) !== 0) return;

  if (command === "spam") {
    var count = 1; // Number of messages sent (modified by sendSpamMessage)
    var maxMessages = 150000; // Change based on how many messages you want sent

    function sendSpamMessage() {
      try {
        // You could modify this to send a random string from an array (ex. a quote), create a
        // random sentence by pulling words from a dictionary file, or to just send a random
        // arrangement of characters and integers. Doing something like this may help prevent
        // future bots from detecting that you sent a spam message.
        message.channel.send("This is spam message #" + count);

               if (count < maxMessages) {
          // If you don't care about whether the messages are deleted or not, like if you created a dedicated server
          // channel just for bot spamming, you can remove the below line and the entire prune command.
          message.channel.send("/prune");
          count++;

          /* These numbers are good for if you want the messages to be deleted.
           * I've also noticed that Discord pauses for about 4 seconds after you send 9
           * messages in rapid succession, and this prevents that. I rarely have any spam
           * messages slip through unless there is a level up from mee6 or Tatsumaki. */
          let minTime = Math.ceil(30000);  // Rush RP1
          let maxTime = Math.floor(60240); // Arbitrary integer
          let timeToWait = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
          setTimeout(sendSpamMessage, timeToWait);
        } else {
          // Sends a message when count is equal to maxMessages. Else statement can be
          // modified/removed without consequence.
          message.channel.send("------------------");
          message.channel.send("I AM FINISHED!!!");
          message.channel.send("------------------");
        }
      } catch (error) {
        sendSpamMessage();
      }
    }

    message.delete().catch(O_o=>{})
    sendSpamMessage();
  }

  if (command === "prune") {
    message.channel.fetchMessages()
    .then(messages => {
      let message_array = messages.array();
      message_array.length = 2;
      message_array.map(msg => msg.delete().catch(O_o => {}));
     });
  }
});

client.login(config.botToken);
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);