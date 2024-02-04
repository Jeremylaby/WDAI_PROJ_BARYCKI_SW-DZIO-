import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from "./products/products";
import React, {useState} from "react";
import Layout from "./Menu";
import Helloworld from "./HelloWorld";
import LoginOrRegister from "./LoginOrRegister";
import { jwtDecode } from 'jwt-decode'

function App() {
    const [token,setToken]=useState("")
    const secretKey = 'nie-pokazuj-tego-klucza-nikomu';
    const handleLogin = (newToken) => {
        setToken(newToken);
    }
    return(<body>{!token?(<LoginOrRegister onLogin={handleLogin}/>):(<div className={"Wrapper"}><BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Helloworld />}/>
          <Route path="products" element={<Products role={jwtDecode(token).role} />} />
        </Route>
      </Routes></BrowserRouter>
    </div>
    )}</body>);
}

export default App;
