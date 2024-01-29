require("dotenv").config();
const fs = require('fs')
const { App, LogLevel } = require("@slack/bolt");
const CONFIG = require("./config");

let raw = fs.readFileSync('src/db.json');
let faqs= JSON.parse(raw);


let logLevel;
switch (process.env.LOG_LEVEL) {
    case "debug":
        logLevel = LogLevel.DEBUG;
        break;
    case "info":
        logLevel = LogLevel.INFO;
        break;
    case "warn":
        logLevel = LogLevel.WARN;
        break;
    case "error":
        logLevel = LogLevel.ERROR;
        break;
    default:
        logLevel = LogLevel.INFO;
}

const app = new App({
    token: CONFIG.SLACK_BOT_TOKEN,
    signingSecret: CONFIG.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: CONFIG.SLACK_APP_LEVEL_TOKEN,
    logLevel,
});

app.command("/square", async ({ command, ack, say }) => {
    try {
        await ack();
        let txt = command.text; // The inputted parameters
        if (isNaN(txt)) {
            say(txt + " is not a number");
        } else {
            say(txt + " squared = " + parseFloat(txt) * parseFloat(txt));
        }
    } catch (error) {
        console.log("err");
        console.error(error);
    }
});

app.command("/knowledge", async ({ command, ack, say }) => {
    try {
        await ack();
        let message = { blocks: [] };
        faqs.data.map((faq) => {
            message.blocks.push(
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Question*",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: faq.question,
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Answer*",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: faq.answer,
                    },
                }
            );
        });
        say(message);
    } catch (error) {
        console.log("err");
        console.error(error);
    }
});

app.message("hello", async ({ command, say }) => {
    try {
        say("Hi! Thanks for PM'ing me!");
    } catch (error) {
        console.log("err");
        console.error(error);
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ Bolt app is running!");
})();
