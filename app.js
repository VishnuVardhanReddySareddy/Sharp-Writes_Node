const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
        <form action="/message" method = "POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="username"></input>
        <button type="submit">Add</button>
        </form>
        `);
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");

      dataChunks = [];
      req.on("data", (chunks) => {
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let comninedBuffer = Buffer.concat(dataChunks);
        let value = comninedBuffer.toString().split("=")[1];
        console.log(value);
        fs.writeFile("Values.txt", value, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    }
  }
});

server.listen(3000, () => {
  console.log("server running ");
});
