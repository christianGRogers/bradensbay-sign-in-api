
const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { signInWithEmailAndPassword } = require('firebase/auth');

const PORT = 3005;

const firebaseConfig = {
    apiKey: "AIzaSyDmdf8NhoFAzXKGuBWYq5XoDrM5eNClgOg",
    authDomain: "bradensbay-1720893101514.firebaseapp.com",
    databaseURL: "https://bradensbay-1720893101514-default-rtdb.firebaseio.com/",
    projectId: "bradensbay-1720893101514",
    storageBucket: "bradensbay-1720893101514.appspot.com",
    messagingSenderId: "280971564912",
    appId: "1:280971564912:web:989fff5191d0512c1b21b5",
    measurementId: "G-DNJS8CVKWD"
};

const firebaseApp = initializeApp(firebaseConfig);


const app = express();
app.use(cors());
app.use(express.json());


async function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            uid = userCredential.user.uid;
            return uid;
        })
}
app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'email / password is required' });
    }

    try {
        const result = await loginUser(email, password);
        return res.status(200).json(result);
    } catch (error) {
        console.error(`Error processing request for email ${email}: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
