const fs = require(`fs`);
const Discord = require(`discord.js`);

class Bot  {
  /**
   * Initializes all modules, a Discord client, binds events.
   * @constructor
   */
  constructor() {
    this.client = new Discord.Client();

    // Dynamically load commands from files
    this.commands = new Discord.Collection();

    fs.readdirSync(`./Commands`)
      .filter(file => file.endsWith(`.js`))
      .filter(file => file !== `Command.js`)
      .map(file => require(`./Commands/${file}`))
      .filter(cmd => cmd.name)
      .forEach(cmd => this.commands.set(cmd.name.toLowerCase(), new cmd()), this);

    this.bindEvents();
  }
  
  /**
   * Bind event functions.
   */
  bindEvents() {
    this.client.on(`ready`, this.onReady.bind(this));
    this.client.on(`message`, this.onMessage.bind(this));
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
    console.log(`Shutting down.`);
    this.client.destroy();
  }

  /**
   * Bot is connected to Discord.
   */
  onReady() {
    console.log(`Connected to Discord as ${this.client.user.username}#${this.client.user.discriminator} <@${this.client.user.id}>`);
  }

  /**
   * Handles messages.
   * @param {Message} Message Discord message object.
   */
  onMessage(Message) {
    // Ignore system, bot messages
    if (Message.system || Message.author.bot) return;

    // Ignore if message doesn't start with command character
    if (!Message.content.startsWith(`!`)) return;

    // Parse message, see if it matches command name or alias
    const args = Message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = this.commands.get(commandName) || this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If no command found, ignore
    if (!command) return;

    // Execute command
    command.execute(Message, args);
  }
}

module.exports = Bot;
