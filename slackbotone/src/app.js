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
    // signingSecret: CONFIG.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: CONFIG.SLACK_APP_LEVEL_TOKEN,
    logLevel,
});

app.event("message", async ({ event, client }) => {
    console.log({ event, client });
    const question = event.text;
    const answer = "Your generated answer";

    await client.chat.postMessage({
        channel: event.channel,
        text: answer,
    });
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ Bolt app is running!");
})();
