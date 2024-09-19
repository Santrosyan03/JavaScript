import {createServer} from "http";

const server = createServer((req, res) => {
    if(req.url === "/hello") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello");
    } else {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Bye");
    }
});
server.listen(3001);