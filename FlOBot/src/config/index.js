
const openai_api_key = process.env.OPENAI_API_KEY;
const bot_system = process.env.BOT_SYSTEM;
const slack_webhook = process.env.SLACK_WEBHOOK;

module.exports = {
    local: {
        use_env_variable: "DATABASE_URL",
        openai_api_key,
        bot_system,
        slack_webhook,
        synchronize: true,
    },
    development: {
        use_env_variable: "DATABASE_URL",
        openai_api_key,
        bot_system,
        slack_webhook,
        synchronize: true,
    },
    production: {
        use_env_variable: "DATABASE_URL",
        openai_api_key,
        bot_system,
        slack_webhook,
        synchronize: true,
    },
};