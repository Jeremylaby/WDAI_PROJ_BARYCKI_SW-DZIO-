import React, {useState} from 'react';
import CryptoJS from 'crypto-js';

const LoginOrRegister = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setflag] = useState(true);
    const key = "SuperSecretKeyKrzysztof";

    const handleRegister = async () => {
        const scryptedPassword=CryptoJS.AES.encrypt(password,key).toString();
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username,scryptedPassword}),
            });

            if (!response.ok) {
                // Tutaj obsłuż błędy zwrócone przez serwer
                console.error('Błąd rejestracji:', response.statusText);
                alert('Błąd rejestracji:', response.statusText)
                return;
            }

            const data = await response.json();
            console.log('Rejestracja zakończona pomyślnie:', data.message);
            alert('Rejestracja zakończona pomyślnie:', data.message)
            console.log('Wygenerowano token: ', data.token)
            const token = data.token;
            onLogin(token);
        } catch (error) {
            console.error('Wystąpił błąd:', error);
            alert('Wystąpił błąd:', error)
        }
    };
    const handleLogin = async () => {
        const scryptedPassword=CryptoJS.AES.encrypt(password,key).toString();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, scryptedPassword}),
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Błąd logowania:', data.error);
                alert('Błąd logowania: '+  data.error)
                return;
            }


            console.log('Zalogowano pomyślnie :');
            alert('Zalogowano pomyślnie')
            console.log('Wygenerowano token: ', data.token)
            const token = data.token;
            onLogin(token);
        } catch (error) {
            console.error('Wystąpił błąd:', error);
            alert('Wystąpił błąd:', error)
        }
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
            <div><div onClick={()=>setflag(true)}>Login</div> or <div onClick={()=>setflag(false)}>Sign Up</div></div>
    {flag ?
        (<button onClick={handleLogin}>Login</button>) : (<button onClick={handleRegister}>Register</button>
        )}
</div>
);
};
export default LoginOrRegister
