import http from "http";
import dotenv from 'dotenv';

dotenv.config();
http.createServer((req, res) => {
    const a = 1;
    const b = (a + 34)+8;
    const c = (b + 4)*10;
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end(`The answer is: ${b}`);
}).listen(process.env.PORT);