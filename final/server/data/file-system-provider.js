const fs = require("fs");

const readFromJson = (fileName) => {
  return fs.readFileSync(fileName, "utf8");
};

const writeToJson = (fileName, data) => {
  fs.writeFileSync(fileName, data);
};

const checkIfFileExists = (fileName) => {
  return fs.existsSync(fileName);
};
//clear the
const clearFile = (fileName) => {
  fs.writeFileSync(fileName, "");
};

//append data to the file
const appendToFile = (fileName, data) => {
  fs.appendFileSync(fileName, data);
};

// delete the file
const deleteFile = (fileName) => {
  fs.unlinkSync(fileName);
};

// read from csv file
const readFromCsv = (fileName) => {
  const csvData = fs.readFileSync(fileName, "utf8");
  const dataArray = csvData.split("\r\n");
  return dataArray;
};

// append to csv file
const appendToCsv = (fileName, data) => {
  fs.appendFileSync(fileName, data);
};

module.exports = {
  readFromJson,
  writeToJson,
  checkIfFileExists,
  clearFile,
  appendToFile,
  deleteFile,
  readFromCsv,
  appendToCsv,
};
