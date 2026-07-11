const fs = require("fs");
const path = require("path");

const assets = path.join(__dirname, "dist", "spa", "assets");
const html = path.join(__dirname, "dist", "spa", "index.html");

const files = fs.readdirSync(assets);

let jsFile = "";
let cssFile = "";

for (const file of files) {
  if (/^index\..*\.js$/.test(file)) jsFile = file;
  if (/^index\..*\.css$/.test(file)) cssFile = file;
}

if (jsFile) {
  fs.renameSync(
    path.join(assets, jsFile),
    path.join(assets, "index.js")
  );
}

if (cssFile) {
  fs.renameSync(
    path.join(assets, cssFile),
    path.join(assets, "index.css")
  );
}

let htmlText = fs.readFileSync(html, "utf8");

if (jsFile)
  htmlText = htmlText.replace(jsFile, "index.js");

if (cssFile)
  htmlText = htmlText.replace(cssFile, "index.css");

fs.writeFileSync(html, htmlText);

console.log("Done");
