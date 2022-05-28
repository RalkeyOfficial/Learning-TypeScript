export class commands{
  terminal: JQuery<HTMLParagraphElement>;
  commandHistory: string[];
  
  constructor(terminal: JQuery<HTMLParagraphElement>, commandHistory: string[]) {
    this.terminal = terminal;
    this.commandHistory = commandHistory;
  }

  showHelp() {
    this.terminal.append(`<br>Available commands:<br>`);
    this.terminal.append(`<br>`);
    this.terminal.append(`  help               --    shows this help list<br>`);
    this.terminal.append(`  clear              --    clears the terminal<br>`);
    this.terminal.append(`  command history    --    see command history<br>`);
    this.terminal.append(`  cat                --    view a file as text<br>`);
    this.terminal.append(`<br>`);
  }

  seeHistory() {
    this.terminal.append(`<br>`);
    this.terminal.append(`Command history:<br>`);
    this.terminal.append(`<br>`);
    this.terminal.append(`${this.commandHistory.join('<br>')}<br>`);
    this.terminal.append(`<br>`);
  }

  cat(args: string) {
    args = args.substring(args.indexOf(' ') + 1);

    if (args === 'aboutMe.txt') return this.#aboutMe();

    return this.terminal.append(`cannot find "${args}" to open with cat<br>`);
  }

  #aboutMe() {
    this.terminal.append(`<br>`);
    this.terminal.append(`I'm Thijn Douwma,<br>`);
    this.terminal.append(`I am a ${this.#getAge()} Student Software Developer at ROC van Flevoland<br>`);
    this.terminal.append(`Fullstack developer with a passion for javascript.<br>`);
    this.terminal.append(`<br>`);
    this.terminal.append(`I love ['coding', 'gaming', 'computers', 'technology', 'anime']<br>`);
    this.terminal.append(`<br>`);
  }


  #getAge() {
    var today = new Date();
    var birthDate = new Date("2003-10-07");
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
      age--;
    }
    return age;
  }
}