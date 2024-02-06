import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductsCollection from "./products/ProductsCollection";
import React, {useState} from "react";
import Layout from "./Menu";
import HelloWorld from './HelloWorld';
import LoginOrRegister from "./Login/LoginOrRegister";
import { jwtDecode } from 'jwt-decode'
import { CartProvider } from './CartElements/CartContext';
import Cart from './CartElements/Cart';
import Helloworld from "./HelloWorld";


function App() {
    const [token, setToken] = useState("");
    const secretKey = 'nie-pokazuj-tego-klucza-nikomu'; // Remember to keep your secrets secure
    let role;
    const handleLogin = (newToken) => {
        setToken(newToken);
        try {
            const decodedToken = jwtDecode(newToken);
            role = decodedToken.role;
            console.log('Rola użytkownika:', role);
        } catch (error) {
            console.error('Błąd dekodowania tokena:', error);
        }
    };

    return(<body>
    {!token ? (<LoginOrRegister onLogin={handleLogin}/>) :
        (<div className={"Wrapper"}><BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout role={role}/>}>
                        <Route index element={<Helloworld/>}/>
                    </Route>
                    <Route element={<Layout role={role}/>}>
                        <Route path="products" element={<ProductsCollection role={role}/>}/>
                    </Route>
                </Routes></BrowserRouter>
            </div>
        )}</body>);
}

export default App;
