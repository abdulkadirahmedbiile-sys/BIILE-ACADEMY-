const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'biile_academy_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Xogta tijaabada ah ee Ardayda BIILE ACADEMY
const ardayda = [
    {
        username: "Akram123",
        password: "Najlaa123",
        magac: "AKRAM AXMED CABDULQADIR BIILE",
        koorso: "Full-Stack Web Development",
        casharo: ["Hordhaca HTML & CSS", "Fuculty of management science", "Nidaamka Node.js Basics"],
        lacagaha: { status: "La Bixiyay", bisha: "July 2026", cadadka: "$30" }
    },
    {
        username: "hassan456",
        password: "password456",
        magac: "Xasan Cumar Maxamed",
        koorso: "Graphic Design",
        casharo: ["Barashada Adobe Photoshop", "Calaamadaha & Logos", "Habaynta Midabada"],
        lacagaha: { status: "Waa Lagugu Leeyahay", bisha: "July 2026", cadadka: "$30" }
    }
];

app.get('/', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const arday = ardayda.find(u => u.username === username && u.password === password);

    if (arday) {
        req.session.ardayId = username;
        res.redirect('/dashboard');
    } else {
        res.render('login', { error: "Username ama Password khaldan!" });
    }
});

app.get('/dashboard', (req, res) => {
    if (!req.session.ardayId) {
        return res.redirect('/');
    }
    const arday = ardayda.find(u => u.username === req.session.ardayId);
    res.render('dashboard', { arday });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server-ka BIILE ACADEMY wuxuu ka kacay port-ka: ${PORT}`);
});
