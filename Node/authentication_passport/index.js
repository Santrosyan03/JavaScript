import express from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import path from "path";
import bcrypt from "bcrypt";

let users = [];
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy({
    usernameField: "email"
}, async (email, password, done) => {
    const user = users.find((user) => user.email === email);

    if (user === undefined) {
        return done(null, null, {message: "Incorrect Email"});
    }

    if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
    } else {
        done(null, null, {message: "Incorrect Password"});
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    done(null, users.find((user) => user.id === id));
});

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.sendFile(path.resolve("views/register.html"))
})

app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        id: `${Date.now()}_${Math.random()}`,
        name,
        email,
        password: hashedPassword
    });
    res.redirect("/login")
    console.log(hashedPassword);
})

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.sendFile(path.resolve("views/login.html"))
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login "
}));

app.use(checkAuthenticated);

app.get("/", (req, res) => {
    res.sendFile(path.resolve("views/app.html"));
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated() === false) {
        return res.redirect("/login");
    }
    return next(null);
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated() === true) {
        return res.redirect("/");
    }
    next();
}

app.listen(process.env.PORT);