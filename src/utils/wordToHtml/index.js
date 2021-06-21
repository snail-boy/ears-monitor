var path = require('path');
const word2html = require('word2html');
//Word document's absolute path
var absPath = path.join(__dirname, '../../');

absPath = path.join(absPath, '01.docx')

console.log(absPath)

word2html(absPath)
