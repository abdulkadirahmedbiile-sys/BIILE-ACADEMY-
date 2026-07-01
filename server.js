const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'biile_academy_secret_key',
    resave: false,
    saveUninitialized: true
}));

const ardayda = [
    {
        username: "ali123",
        password: "password123",
        magac: "Cali Axmed Salaad",
        koorso: "Full-Stack Web Development",
        casharo: ["Hordhaca HTML & CSS", "Barashada JavaScript", "Nidaamka Node.js Basics"],
        natiijooyinka: [
            { maaddo: "Hordhaca HTML & CSS", macallin: "Mr. Maxamed Cali", dhibco: 96 },
            { maaddo: "Barashada JavaScript", macallin: "Mr. Maxamed Cali", dhibco: 88 }
        ],
        bayaan_lacagaha: [
            { no: 1, date: "2026-05-10", info: "open_balance", dr: "0.00", cr: "0.00", bal: "0.00" },
            { no: 2, date: "2026-06-01", info: "lagu dalacy", dr: "30.00", cr: "0.00", bal: "30.00" },
            { no: 3, date: "2026-06-05", info: "la qabtay", dr: "0.00", cr: "30.00", bal: "0.00" }
        ],
        assignments: [
            { maaddo: "Hordhaca HTML & CSS", qeybta: "Web Design", semester: "Semester 1", code: "HTML01" }
        ]
    },
    {
        username: "hassan456",
        password: "password456",
        magac: "Xasan Cumar Maxamed",
        koorso: "Graphic Design",
        casharo: ["Barashada Adobe Photoshop", "Calaamadaha & Logos", "Habaynta Midabada"],
        natiijooyinka: [
            { maaddo: "Barashada Adobe Photoshop", macallin: "Mr. Axmed Yaasiin", dhibco: 83 },
            { maaddo: "Calaamadaha & Logos", macallin: "Mr. Axmed Yaasiin", dhibco: 90 }
        ],
        bayaan_lacagaha: [
            { no: 1, date: "2026-05-10", info: "open_balance", dr: "0.00", cr: "0.00", bal: "0.00" },
            { no: 2, date: "2026-06-01", info: "lagu dalacy", dr: "25.00", cr: "0.00", bal: "25.00" },
            { no: 3, date: "2026-06-02", info: "Discount", dr: "0.00", cr: "0.00", bal: "25.00" }
        ],
        assignments: [
            { maaddo: "Barashada Adobe Photoshop", qeybta: "Graphic Design", semester: "Semester 1", code: "PSD01" }
        ]
    }
];    {
        username: "akram123",
        password: "password123",
        magac: "Akram Axmed Cabdulqadir Biile",
        koorso: "Full-Stack Web Development",
        casharo: ["Hordhaca HTML & CSS", "Barashada JavaScript", "Nidaamka Node.js Basics"],
        natiijooyinka: [
            { maaddo: "Hordhaca HTML & CSS", macallin: "Mr. Maxamed Cali", dhibco: 98 }
        ],
        bayaan_lacagaha: [
            { no: 1, date: "2026-07-01", info: "lagu dalacy", dr: "30.00", cr: "0.00", bal: "30.00" }
        ],
        assignments: [
            { maaddo: "Hordhaca HTML & CSS", qeybta: "Web Design", semester: "Semester 1", code: "HTML01" }
        ]
    }


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
        res.render('login', { error: "Username   ama Password ka ayaa khaldan!" });
    }
});

// Bogga Koowaad (Courses)
app.get('/dashboard', (req, res) => {
    if (!req.session.ardayId) return res.redirect('/');
    const arday = ardayda.find(u => u.username === req.session.ardayId);
    res.render('dashboard', { arday, tab: 'courses' });
});

// Bogga Imtixaanka
app.get('/exam', (req, res) => {
    if (!req.session.ardayId) return res.redirect('/');
    const arday = ardayda.find(u => u.username === req.session.ardayId);
    res.render('dashboard', { arday, tab: 'exam' });
});

// Bogga Natiijooyinka
app.get('/result', (req, res) => {
    if (!req.session.ardayId) return res.redirect('/');
    const arday = ardayda.find(u => u.username === req.session.ardayId);
    res.render('dashboard', { arday, tab: 'result' });
});

// Bogga Lacagaha
app.get('/finance', (req, res) => {
    if (!req.session.ardayId) return res.redirect('/');
    const arday = ardayda.find(u => u.username === req.session.ardayId);
    res.render('dashboard', { arday, tab: 'finance' });
});

// Bogga Assignment
app.get('/assignment', (req, res) => {
    if (!req.session.ardayId) return res.redirect('/');
    const arday = ardayda.find(u => u.username === req.session.ardayId);
    res.render('dashboard', { arday, tab: 'assignment' });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server-ka BIILE ACADEMY ka kacay: ${PORT}`));
