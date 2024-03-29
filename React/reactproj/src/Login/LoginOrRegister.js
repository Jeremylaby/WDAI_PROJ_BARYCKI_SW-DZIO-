import React, {useState} from 'react';
import CryptoJS from 'crypto-js';

const LoginOrRegister = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setflag] = useState(true);
    const key = "SuperSecretKeyKrzysztof";

    const handleRegister = async () => {
        const scryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, scryptedPassword}),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Błąd rejestracji');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Rejestracja zakończona pomyślnie: ', data.message);
                alert('Rejestracja zakończona pomyślnie: ' + data.message);
                console.log('Wygenerowano token: ', data.token);
                onLogin(data.token);
            })
            .catch(error => {
                console.error('Wystąpił błąd: ', error.message);
                alert('Wystąpił błąd: ' + error.message);
            });
    };
    const handleLogin = async () => {
        const scryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, scryptedPassword}),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Błąd logowania');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Zalogowano pomyślnie :');
                alert('Zalogowano pomyślnie ' + data.message);
                console.log('Wygenerowano token: ', data.token);
                const token = data.token;
                onLogin(token);
            })
            .catch((error) => {
                console.error('Wystąpił błąd: ', error.message);
                alert('Wystąpił błąd: ' + error.message);
            });
    };

    return (
        <div>
            <h1>Login/Register Form</h1>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br/>
            <div>
                <div onClick={() => setflag(true)}>Login</div>
                or <div onClick={() => setflag(false)}>Sign Up</div></div>
            {flag ?
                (<button onClick={handleLogin}>Login</button>) : (<button onClick={handleRegister}>Register</button>
                )}
        </div>
    );
};
export default LoginOrRegister
