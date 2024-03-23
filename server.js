"use strict";
import http from "http";
import fs from "fs";
import path from "path";

const hostname = "localhost";
const port = 3000;
const server = http.createServer((req, res) => {
  let filePath;
  if (req.url === "/") {
    filePath = "./index.html";
  } else if (req.url === "/about") {
    filePath = "./about.html";
  } else {
    filePath = "./404.html";
  }
  try {
    fs.readFile(path.resolve(filePath), (err, content) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("500 Internal Server Error");
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
