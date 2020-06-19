const Command = require(`./Command.js`);

class Ping extends Command {
  constructor() {
    super();
    this.name = `ping`;
    this.aliases = [`pong`, `test`];
    this.description = `Test if the bot's working!`;
    this.usage = ``;
  }

  execute(Message) {
    Message.reply(`pong`);
  }
}

module.exports = Ping;