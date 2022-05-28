import $ from "jquery";

const container = $('.container') as JQuery<HTMLDivElement>;
const terminal = $('#terminal-text') as JQuery<HTMLParagraphElement>;
const terminalInput = $('#terminal-input') as JQuery<HTMLInputElement>;
const terminalInputLabelText = $('#terminal-input-label').html() as string;

const commandHistory: string[] = [];
let currentCommandIndex = 0;


(function() {
  terminal.append(`<br>`);
  terminal.append(`████████╗██╗  ██╗██╗     ██╗███╗   ██╗    ██████╗  ██████╗ ██╗   ██╗██╗    ██╗███╗   ███╗ █████╗ <br>`);
  terminal.append(`╚══██╔══╝██║  ██║██║     ██║████╗  ██║    ██╔══██╗██╔═══██╗██║   ██║██║    ██║████╗ ████║██╔══██╗<br>`);
  terminal.append(`   ██║   ███████║██║     ██║██╔██╗ ██║    ██║  ██║██║   ██║██║   ██║██║ █╗ ██║██╔████╔██║███████║<br>`);
  terminal.append(`   ██║   ██╔══██║██║██   ██║██║╚██╗██║    ██║  ██║██║   ██║██║   ██║██║███╗██║██║╚██╔╝██║██╔══██║<br>`);
  terminal.append(`   ██║   ██║  ██║██║╚█████╔╝██║ ╚████║    ██████╔╝╚██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚═╝ ██║██║  ██║<br>`);
  terminal.append(`   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚════╝ ╚═╝  ╚═══╝    ╚═════╝  ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝     ╚═╝╚═╝  ╚═╝<br>`);
  terminal.append(`<br><br>`);
  terminal.append(`Welcome to web terminal 1.0!<br>`);
  terminal.append(`<br>`);
  terminal.append(`Hi, I'm Thijn, <br>`);
  terminal.append(`Student Software Developer at ROC van Flevoland, <br>`);
  terminal.append(`Fullstack developer with a passion for javascript. <br>`);
  terminal.append(`<br>`);
  terminal.append(`type "help" for a list of available commands<br>`);
  terminal.append(`<br>`);
})();


$(document).on("keydown", (e) => {
  // focus on the command input on any key press
  terminalInput.focus();

  // on use of arrow keys scroll through command history
  if (e.keyCode === 38) { // key up
    terminalInput.val(commandHistory[currentCommandIndex]);

    // if current command index is not at the top of the history
    if (currentCommandIndex > 0) currentCommandIndex--;
  }

  if (e.keyCode === 40) { // key down
    // if current command index is not at the bottom of the history
    if (commandHistory.length > currentCommandIndex + 1) currentCommandIndex++;

    terminalInput.val(commandHistory[currentCommandIndex]);
  }
})

terminalInput.on("keypress", (e) => {
  // scroll to bottom
  container.scrollTop(container[0].scrollHeight);

  // keycode 13 is "enter"
  if(e.keyCode !== 13) return;

  const inputText = terminalInput.val() as string;

  // push command into commandHistory
  // and set command index to new length - 1
  commandHistory.push(inputText);
  currentCommandIndex = commandHistory.length - 1;

  // add new line to terminal with command in it
  // clear input field
  terminal.append(`${terminalInputLabelText} ${terminalInput.val()}<br>`);
  terminalInput.val('');

  // execute commands
  if(inputText === '') return;
  if(inputText === 'help') return showHelp();
  if(inputText === 'clear') return terminal.html('');
  if(inputText === 'command history') return seeHistory();

  terminal.append(`Unkown command "${inputText}", type "help" for list of commands<br>`);
})

function showHelp() {
  terminal.append(`<br>Available commands:<br>`);
  terminal.append(`<br>`);
  terminal.append(`  help               --    shows this help list<br>`);
  terminal.append(`  clear              --    clears the terminal<br>`);
  terminal.append(`  command history    --    see command history<br>`);
  terminal.append(`<br>`);
}

function seeHistory() {
  terminal.append(`<br>`);
  terminal.append(`Command history:<br>`);
  terminal.append(`<br>`);
  terminal.append(`${commandHistory.join('<br>')}<br>`);
  terminal.append(`<br>`);
}