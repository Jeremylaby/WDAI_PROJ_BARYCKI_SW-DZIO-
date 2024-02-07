import React from 'react';
import {Outlet, Link, Routes, Route, BrowserRouter} from "react-router-dom";

function  Layout (role) {
    const flag=role.role==="admin"
    console.log(flag)
    console.log(role)
    return (<>
        <nav>
            <ol className={"Menu"}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Produkty</Link>
                </li>
                <li>
                    <Link to=""> Kontakt</Link>
                </li>
                {flag&&(
                    <li>
                    <Link to={"/persons/users"}>Urzytkownicy</Link>
                </li>)}
                {flag&&(
                    <li>
                        <Link to={"/persons/admins"}>Admini</Link>
                    </li>)}

            </ol>
        </nav>
        <Outlet/>
    </>)
};
export default Layout;