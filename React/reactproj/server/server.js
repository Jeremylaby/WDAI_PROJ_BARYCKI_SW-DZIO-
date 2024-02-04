const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 8080; //Line 3
const path = require('path');

const secretKey = 'nie-pokazuj-tego-klucza-nikomu';
const key = "SuperSecretKeyKrzysztof"
const CryptoJS = require('crypto-js');
const {join} = require("path");

const usersPath = "users.json";
const adminsPath = "admins.json";
const productsPath = "products.json"
let users
let admins
let products

fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Błąd odczytu pliku:', err);
        return;
    }

    try {
        users = JSON.parse(data);
        console.log(users); // Dane z pliku JSON
    } catch (parseError) {
        console.error('Błąd parsowania danych JSON:', parseError);
    }
});
fs.readFile(adminsPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Błąd odczytu pliku:', err);
        return;
    }

    try {
        admins = JSON.parse(data);
        console.log(admins); // Dane z pliku JSON
    } catch (parseError) {
        console.error('Błąd parsowania danych JSON:', parseError);
    }
});
app.use(cors())
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static("build"))
app.get('/', (req, res) => {
    res.send('Hello from our server!')
})



app.get('/getproducts', async (req,res) => {
        try {
            const data = await fs.promises.readFile(productsPath, 'utf8');
            const products = JSON.parse(data);
            res.json(products); // Przekazuj dane w obiekcie
        } catch (error) {
            console.error('Błąd odczytu pliku lub parsowania JSON:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    });
app.post('/register', async (req, res) => {
    try {
        const {username, scryptedPassword} = req.body;
        const bytes = CryptoJS.AES.decrypt(scryptedPassword, key);
        const password = bytes.toString(CryptoJS.enc.Utf8);
        if (!username.trim()) {
            return res.status(401).json({error: 'Username is Blank!!!'});
        }
        if (!password.trim()) {
            return res.status(401).json({error: 'Password is Blank!!!'});
        }
        const existingUser = users.find((u) => u.username === username)
            || admins.find((u) => u.username === username);

        if (existingUser) {
            return res.status(400).json({error: 'User with that username already exist!!!.'});
        }

        // Generowanie soli
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tworzenie obiektu użytkownika
        const newUser = {
            id: users.length + 1,
            username: username,
            hashedPassword: hashedPassword,
            salt: salt,
        };

        // Dodanie użytkownika do listy
        users.push(newUser);
        const token = jwt.sign({userId: newUser.id, role: "user"}, secretKey, {expiresIn: '1h'});

        res.status(201).json({message: 'Super', token});
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        console.log("New has been added : ", newUser.id, newUser.username)
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({error: 'An error occurred during registration.'});
    }
});

app.post('/login', async (req, res) => {
    async function passworValidation(user, password) {
        const salt = user.salt;
        const hashedPassword = await bcrypt.hash(password, salt);
        const isPasswordValid = hashedPassword === user.hashedPassword;
        return isPasswordValid;
    }

    try {
        const {username, scryptedPassword} = req.body;

        // Znajdź użytkownika w bazie danych
        const user = users.find((u) => u.username === username);
        const admin = admins.find((a) => a.username === username);
        const bytes = CryptoJS.AES.decrypt(scryptedPassword, key);
        const password = bytes.toString(CryptoJS.enc.Utf8);
        let token;
        if (user) {
            const isPasswordValid = await passworValidation(user, password);
            if (!isPasswordValid) {
                return res.status(401).json({error: 'Invalid password.'});
            }
            token = jwt.sign({userId: user.id, role: "user"}, secretKey, {expiresIn: '1h'});
        } else if (admin) {
            const isPasswordValid = await passworValidation(admin, password);
            if (!isPasswordValid) {
                return res.status(401).json({error: 'Invalid password.'});
            }
            token = jwt.sign({userId: admin.id, role: "admin"}, secretKey, {expiresIn: '1h'});
            console.log("admin")
        } else {
            return res.status(401).json({error: 'Invalid username'});
        }


        // W
        res.status(201).json({message: "git", token});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({error: 'An error occurred while logging in.'});
    }
});
app.put('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    try {
        // Załaduj obecną listę produktów z pliku
        const data = await fs.promises.readFile(productsPath, 'utf8');
        products = JSON.parse(data);

        // Zaktualizuj produkt w tablicy
        products.products[productId-1] = updatedProduct;

        await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2), 'utf8');

        res.json(products.products[productId -1]);
    } catch (error) {
        console.error('Błąd podczas aktualizacji produktu:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas aktualizacji produktu' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


