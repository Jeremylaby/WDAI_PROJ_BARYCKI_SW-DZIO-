import React, {useEffect, useState} from "react";
import AdminCard from "./AdminCard";


function Admins({token}) {
    const [admins, setAdmins] = useState([])

    function getAdmins() {
        fetch('http://localhost:8080/persons/admins/get', {
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
                setAdmins(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error.message);
            });
    }

    useEffect(() => {
        getAdmins();
    }, []);

    function handleRemoveAdmin(user) {
        fetch(`http://localhost:8080/persons/admins/removepermission/${user.id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Błąd rejestracji');
                });
            }
            return response.json();
        }).then((data) => {
            console.log(data.message)
            getAdmins();
        }).catch((error) => {
            console.error('Błąd podczas w czasie dodawania permisji: ', error.message);
        });
    }

    return <>
        <div className="products-list">
            {admins.map((admin) => (<AdminCard key={admin.id} admin={admin} removeAdmin={handleRemoveAdmin}/>))}
        </div>
    </>
}

export default Admins;