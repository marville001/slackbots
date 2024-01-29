require("dotenv").config();
const { App, LogLevel } = require("@slack/bolt");
// const { WebClient } = require("@slack/web-api");
const CONFIG = require("./config");


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

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ Bolt app is running!");
})();
