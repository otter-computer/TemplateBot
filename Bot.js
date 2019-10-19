const EventEmitter = require('events');
const Discord = require('discord.js');

class Bot extends EventEmitter {
  /**
   * Initializes all modules, a Discord client, binds events.
   * @constructor
   */
  constructor() {
    super();
    this.client = new Discord.Client();
    this.bindEvents();
  }

  /**
   * Login client to Discord.
   */
  connect() {
    this.client.login(process.env.AUTH_TOKEN);
  }

  /**
   * Destroy Discord client.
   */
  destroy() {
    console.log('Shutting down.');
    this.client.destroy();
  }

  /**
   * Bind event functions.
   */
  bindEvents() {
    this.client.on('ready', this.onReady.bind(this));
    this.client.on('message', this.onMessage.bind(this));
  }

  /**
   * Bot is connected to Discord.
   */
  onReady() {
    console.log(
      'Connected to Discord as ' +
      this.client.user.username + '#' + this.client.user.discriminator + ' ' +
      '<@' + this.client.user.id + '>'
    );
  }

  /**
   * Handles messages.
   * @param {Message} Message Discord message object.
   */
  onMessage(Message) {
    // Ignore system, bot messages
    if (Message.system || Message.author.bot) {
      return;
    }

    if (Message.content === 'ping') {
      Message.reply('pong 🏓');
    }
  }
}

module.exports = Bot;
