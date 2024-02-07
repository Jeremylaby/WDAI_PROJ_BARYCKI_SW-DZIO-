import React, {useEffect, useState} from "react";
import ProductCard from "../products/ProductCard";
import UserCard from "./UserCard";

function Users({token}) {
    const [users, setUsers] = useState([])

    function getUsers() {
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
    }

    useEffect(() => {
        getUsers();
    }, []);

    function handleAddAdmin(user) {
        fetch(`http://localhost:8080/persons/users/grantpermission/${user.id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Nie udało się dodac permisji');
            }
            return response.json();
        }).then((data) => {
            console.log(data.message)
            getUsers();
        }).catch((error) => {
            console.error('Błąd podczas w czasie dodawania permisji: ', error);
        });
    }

    return <>
        <div className="products-list">
            {users.map((user) => (<UserCard key={user.id} user={user} addAdmin={handleAddAdmin}/>))}</div>
    </>
}

export default Users;