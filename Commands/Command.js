class Command {
  constructor() {
    this.name = `name`;
    this.aliases = [];
    this.description = ``;
    this.usage = ``;
  }

  execute() {
    return;
  }
}

module.exports = Command;