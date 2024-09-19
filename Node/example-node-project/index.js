import {resolve, join} from "path";
import fs from "fs";

const currentDir = resolve();

const filePath = join(currentDir, "text.txt");

// fs.readFile(filePath, function (error, text) {
//     console.log(text);
// });

fs.promises.unlink(filePath);


