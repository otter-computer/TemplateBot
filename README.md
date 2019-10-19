# TemplateBot
TemplateBot is a simple Discord bot template to help get started with bot development.

## Requirements

- [Node.js](https://nodejs.org/)

## Running the bot
In order to connect to Discord your bot will need an auth token. You can create one from the [Discord Developer Portal](https://discordapp.com/developers/applications/). Once you've created an application, head to the "Bot" tab and click "Copy" to copy your token.

You'll need to assign this token as an environment variable called `AUTH_TOKEN` in order for your bot to connect to Discord. You can do this via 

## Deployment
This repository comes with an included GitHub Actions workflow to deploy this bot to an Azure Web App.

To use this workflow you'll first need to create an Azure Web App inside the Azure portal.

Be sure to also add the `AUTH_TOKEN` variable under the "Application Settings" section inside the "Configuration" tab of your app. I'd recommend creating a separate app in the Discord portal to allow you to have a separate version of your bot in production and for development.

After creating your WebApp, download the publich profile from your app's Overview page. You'll then need to paste the contents of this file into a secret with the name `AZURE_PUBLISH_PROFILE` inside your repository settings.

You'll then need to modify the `deploy.yml` file and change the `app-name` variable to match the name of the Azure Web App you created.
