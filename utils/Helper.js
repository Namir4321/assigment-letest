const fs = require("fs");
const path = require("path");

// Get the /data folder path
const getDataFolderPath = () => path.join(__dirname, "../data");

// Get full file path
const getFilePath = (filename) => {
  const folder = getDataFolderPath();
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  return path.join(folder, filename);
};

// Ensure JSON file exists (creates if not)
const createJsonFile = (filename) => {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

// Read from JSON file
const readJsonFile = (filename) => {
  createJsonFile(filename); 
  const filePath = getFilePath(filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Write to JSON file
const writeJsonFile = (filename, data) => {
  const filePath = getFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  createJsonFile,
  getFilePath,
};
