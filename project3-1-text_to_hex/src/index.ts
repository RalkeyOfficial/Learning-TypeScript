import $ from 'jquery';

/* HEX samples:

  test:
  \x74\x65\x73\x74
  74 65 73 74
  74657374
  0x74 0x65 0x73 0x74

*/

const textInput = $('#text-input') as JQuery<HTMLTextAreaElement>;
const hexOutput = $('#hex-output') as JQuery<HTMLTextAreaElement>;
const methods = $('#method') as JQuery<HTMLSelectElement>;

// on key up, update the text area
textInput.keyup(textEncode);
hexOutput.keyup(hexDecode);

// === convert the text =============================================================
function textEncode(){
  const currentMethod = methods.val() as string;
  const text = textInput.val() as string;

  // convert the text to hex
  // hex is in an array of strings
  const textHex = Encode(text)

  // depending on the conversion method selected
  // manipulate the hex string to fit the desired format
  // then put the hex string into the hex output text area
  let hexString = '';
  switch(currentMethod) {
    case '1':
      // turn a regular hex to \x00, \x01, etc.
      for (let i = 0; i < textHex.length; i++) {
        hexString += '\\x' + textHex[i];
      }
      hexOutput.val(hexString);
      break;

    case '2':
      // turn a regular hex to 00 01 02, etc.
      hexOutput.val(textHex.join(' '));
      break;

    case '3':
      // turn a regular hex to 000102, etc.
      hexOutput.val(textHex.join(''));
      break;

    case '4':
      // turn a regular hex to 0x00 0x01 0x02, etc.
      for (let i = 0; i < textHex.length; i++) {
        hexString += '0x' + textHex[i] + ' ';
      }
      hexOutput.val(hexString);
  }
};


function hexDecode(){
  const hex = hexOutput.val() as string;

  if (hex == undefined || hex == "") return

  // parse the hex string into the identifyEncoding method to find out what encoding method is used
  // this returns a string with a number, which is also used as the conversion method value
  const encoding = identifyEncoding(hex);

  // if the hex could not be identified
  if (encoding === 'invalid hex') {
    textInput.text('Invalid hex');
    return
  }

  // set the value of the methods select element to the encoding method used
  methods.val(encoding);

  // depending on the conversion method used
  // manipulate the hex string to become a regular hex string
  // then decode that into text which can be displayed in the text input text area
  let string = '';
  switch(encoding) {
    case '1':
      // changes \x00, \x01, etc. into a regular hex
      string = Decode(hex.replace(/\\x/g, ''));
      textInput.val(string);
      break;

    case '2':
      // changes 00 01 02 into a regular hex
      string = Decode(hex.replace(' ', ''));
      textInput.val(string);
      break;

    case '3':
      // 000102 is already a regular hex, so it can emediatly be decoded
      string = Decode(hex);
      textInput.val(string);
      break;

    case '4':
      // changes 0x00 0x01 0x02 into a regular hex
      string = Decode(hex.replace(/(0x)*( 0x)*/g, ''));
      textInput.val(string);
  }
}

// if the method of conversion is changed encode the text again
methods.on('change', textEncode)

// check if the hex string is a valid hex string
// this caused so many headaches...
function identifyEncoding(string: string): string {
  if (/\\x[0-9a-z][0-9a-z]/i.test(string)) return '1'; // matches for \x00, \x01, \x02, etc.
  else if (/^([0-9a-z][0-9a-z] )/i.test(string)) return '2'; // matches for 00 01 02, etc.
  else if (/^((?!\\x)(?!0x)(?![0-9a-z][0-9a-z] ))[0-9a-z]*$/i.test(string)) return '3'; // matches for 000102, 794320, etc.
  else if (/0x[0-9a-z][0-9a-z]/i.test(string)) return '4'; // matches for 0x00 0x01 0x02, etc.
  else return 'invalid hex';
}

// encode string into hex
function Encode(string: string): string[] {
  var hex, i;

  var result = [];
  for (i = 0; i < string.length; i++) {
    hex = string.charCodeAt(i).toString(16);
    result.push(hex);
  }

  return result
}

// decode hex into string
function Decode(string: string): string {
  var hex = string.toString();//force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
