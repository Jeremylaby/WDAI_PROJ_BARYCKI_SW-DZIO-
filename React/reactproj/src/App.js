import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductsCollection from "./products/ProductsCollection";
import React, {useState} from "react";
import Layout from "./Menu";
import Helloworld from "./HelloWorld";
import LoginOrRegister from "./Login/LoginOrRegister";
import {jwtDecode} from 'jwt-decode'
import Users from "./persons/Users";


function App() {
    const [token, setToken] = useState("")
    const [role, setRole] = useState("")
    const secretKey = 'nie-pokazuj-tego-klucza-nikomu';
    const handleLogin = (newToken) => {
        setToken(newToken);
        try {
            const decodedToken = jwtDecode(newToken);
            setRole(decodedToken.role);
            console.log('Rola użytkownika:', role);
        } catch (error) {
            console.error('Błąd dekodowania tokena:', error);
        }
    }
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
                    {role==="admin" &&(<Route element={<Layout role={role}/>}>
                        <Route path="persons">
                            <Route path={"/persons/users"} element={<Users/>}/>
                        </Route>
                    </Route>)}
                </Routes></BrowserRouter>
            </div>
        )}</body>);
}

export default App;
