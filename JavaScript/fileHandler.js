const fs = require('node:fs');

function FileHandler() {
  this.readFile = function (fileNameInput) {
    try {
      return (data = fs.readFileSync(fileNameInput, 'utf8'));
    } catch (err) {
      console.error(err);
      return 'ERROR OCCURRED';
    }
  };
  this.writeFile = function (fileNameInput, fileValueInput) {
    try {
      fs.writeFileSync(fileNameInput, fileValueInput);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = FileHandler;
