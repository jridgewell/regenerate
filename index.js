var CodePoint = require('./code-point');

var allHex = CodePoint().addRange(0, 'f');
var boundaryFirstBit = CodePoint().addRange(8, 'b');

// Defined at https://encoding.spec.whatwg.org/#utf-8-decoder
var badOne = '%(' + boundaryFirstBit + allHex + '|[cC][01])';
var badTwo = '%(' + CodePoint().addRange('c', 'd') + CodePoint().addRange(2, 'f') + '|[dD][01])(?!%' + boundaryFirstBit + allHex + ')';
var badThree = '%([eE]' +
    '(' + allHex.remove(0, 'd') + '(?!%' + boundaryFirstBit + allHex + ')|' +
    '0(?!%' + boundaryFirstBit.removeRange(8, 9) + allHex + ')|' +
    '[dD](?!%' + boundaryFirstBit.removeRange('a', 'b') + allHex + ')' +
')';
var badFour = '%([fF]' +
    '(' + allHex.remove(0, 4) + '(?!%' + boundaryFirstBit + allHex + ')|' +
    '0(?!%' + boundaryFirstBit.remove(8) + allHex + ')|' +
    '4(?!%' + boundaryFirstBit.removeRange(9, 'b') + allHex + ')' +
')';

console.log(badOne);
console.log(badTwo);
console.log(badThree);
console.log(badFour);
