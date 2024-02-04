import React from 'react';
import {Outlet, Link, Routes, Route, BrowserRouter} from "react-router-dom";

const Layout = () => {
    return (<>
        <nav>
            <ul className={"Menu"}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Produkty</Link>

                </li>
                <li>
                    <Link to="">Kontakt</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </>)
};export default Layout;