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
    this.terminal.append(`  ls                 --    view all files in current directory<br>`);
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

  ls() {
    const arr = ['aboutMe.txt', 'skills.txt', 'projects.txt', 'theFitnessGramPacerTest.txt'];

    this.terminal.append(`${arr.join('   ')}<br>`);
  }

  cat(args: string) {
    args = args.slice(4);

    if (args === 'aboutMe.txt') return this.#aboutMe();
    if (args === 'skills.txt') return this.#skills();
    if (args === 'projects.txt') return this.#projects();

    if (args === 'theFitnessGramPacerTest.txt') return this.#fitnessGram();
    
    return this.terminal.append(`cannot find "${args}" to open with cat<br>`);
  }

  #aboutMe() {
    this.terminal.append(`<br>`);
    this.terminal.append(`I'm Thijn Douwma,<br>`);
    this.terminal.append(`I am a ${this.#getAge()} year old Student learning fullstack web development.<br>`);
    this.terminal.append(`I have a passion of making functional websites and applications.<br>`);
    this.terminal.append(`I love to persue a challenge and learn new things.<br>`);
    this.terminal.append(`I love ['coding', 'gaming', 'computers', 'technology', 'anime']<br>`);
    this.terminal.append(`<br>`);
  }

  #skills() {
    this.terminal.append(`<br>`);
    this.terminal.append(`Languages i know:<br>`);
    this.terminal.append(`<br>`);
    this.terminal.append(`  HTML, CSS   --  It would be bad if I wasnt a master at the basics<br>`);
    this.terminal.append(`  Javascript  --  very good at javascript. will be able to make most aplications and fix most bugs<br>`);
    this.terminal.append(`  PHP         --  very good at php. but javascript is my main baby<br>`);
    this.terminal.append(`  MySql       --  i can make basic MySql databases<br>`);
    this.terminal.append(`<br>`);

    this.terminal.append(`<br>`);
    this.terminal.append(`Frameworks i know:<br>`);
    this.terminal.append(`<br>`);
    this.terminal.append(`  Jquery<br>`);
    this.terminal.append(`  TypeScript<br>`);
    this.terminal.append(`  Electron<br>`);
    this.terminal.append(`<br>`);
  }

  #projects() {
    this.terminal.append(`<br>`);
    this.terminal.append(`My favorite projects:<br>`);
    this.terminal.append(`<br>`);
    this.terminal.append(`  <a target="_blank" href="https://github.com/RalkeyOfficial/Discord-Blue-Hook">Discord Blue Hook</a>    --`);
    this.terminal.append(`  Discord Blue Hook is a application for windows to send messages or embeds to discords webhook api<br>`);

    this.terminal.append(`  <a target="_blank" href="https://github.com/RalkeyOfficial/Learning-TypeScript">TypeScript projects</a>  --`);
    this.terminal.append(`  I have made multiple applications in TypeScript which i am all equally proud of (including this web terminal)<br>`);

    this.terminal.append(`  <a target="_blank" href="https://github.com/RalkeyOfficial/kevinator-extension">kevinator extension</a>  --`);
    this.terminal.append(`  this is a chrome extension to change every image on every page to my friends face<br>`);
    this.terminal.append(`<br>`);
  }
  
  #fitnessGram() {
    this.terminal.append(`<br>`);
    this.terminal.append(`The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.<br>`);
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