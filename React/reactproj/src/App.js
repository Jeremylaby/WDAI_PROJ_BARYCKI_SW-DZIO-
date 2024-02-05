import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductsCollection from "./products/ProductsCollection";
import React, {useState} from "react";
import Layout from "./Menu";
import HelloWorld from './HelloWorld';
import LoginOrRegister from "./Login/LoginOrRegister";
import { jwtDecode } from 'jwt-decode'
import { CartProvider } from './CartElements/CartContext';
import Cart from './CartElements/Cart';


function App() {
    const [token, setToken] = useState("");
    const secretKey = 'nie-pokazuj-tego-klucza-nikomu'; // Remember to keep your secrets secure

    const handleLogin = (newToken) => {
        setToken(newToken);
        try {
            const decodedToken = jwtDecode(newToken);
            const role = decodedToken.role;
            console.log('Rola użytkownika:', role);
        } catch (error) {
            console.error('Błąd dekodowania tokena:', error);
        }
    };

    return (
        <CartProvider> {/* Wrap the entire Routes in CartProvider */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HelloWorld />} />
                        <Route path="products" element={<ProductsCollection role={jwtDecode(token).role} />} />
                        <Route path="cart" element={<Cart />} /> {/* Route for the Cart */}
                        {/* ... add other routes as needed */}
                    </Route>
                    {/* If you have routes outside the layout, add them here */}
                </Routes>
            </BrowserRouter>
            {!token ? (
                <LoginOrRegister onLogin={handleLogin} />
            ) : (
                <div className={"Wrapper"}>
                    {/* ... other components that require a token */}
                </div>
            )}
        </CartProvider>
    );
}

export default App;
