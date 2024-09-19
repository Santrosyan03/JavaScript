import express from "express";
import session from "express-session";

const app = express();

app.use(session({
    secret: 'svpbnur9pvj 0r9pf[rvje89- hnd[j i0n-',
    cookie: {
        maxAge: 100000
    }
}));

app.use(express.static("public"))

app.use(express.json())

app.get("/hththt", (req, res) => {
    if (req.session.view === undefined) {
        req.session.view = 1;
    } else {
        req.session.view++;
    }
    res.send(`Number of views: ${req.session.view}`);
})

// app.get("/", (req, res) => {
//     res.redirect("/index.html")
// });
//
// app.get("/hello", (req, res) => {
//     res.send("Hi")
// });
//
// app.get("/hi", (req, res) => {
//     res.send(JSON.stringify({"name": ""}));
// });

app.listen(process.env.PORT);