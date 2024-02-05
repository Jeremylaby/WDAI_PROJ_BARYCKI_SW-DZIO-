import React, {useEffect, useState} from "react";
import ProductCard from "../products/ProductCard";
import UserCard from "./UserCard";

function Users(){
    const [users,setUsers]=useState([])
    const [admins,setAdmins]=useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/persons/users/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('fetching products failed');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    }, []);
return<>
    <div className="products-list">
        {users.map((user) => (<UserCard key={user.id} user={user}/>))}</div>
</>
}export default Users;