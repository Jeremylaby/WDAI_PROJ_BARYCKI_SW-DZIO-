import React, {useState, useEffect} from "react";
import ProductsList from "./ProductsMap";
import ReactDOM from "react-dom/client";
import './products.css'
import product from "./ProductCard";
import {Link} from "react-router-dom";


function ProductsCollection({role}) {
    const [data, setData] = useState([]);
    const [productsdata, setProductsData] = useState([]);
    const [category, setcategory] = useState("default")
    const [searchePhrase, setSearcePhrase] = useState("")

    useEffect(() => {
        fetch('http://localhost:8080/getproducts', {
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
                setData(data.products);
                setProductsData(data.products);
                console.log(data.products);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    }, []);

    const sortItems = (type) => {

        let dataToSort = [...productsdata]
        switch (type) {
            case "dsc":
                setProductsData(sortProducts(dataToSort))
                break;
            case "asc":
                setProductsData(sortProducts(dataToSort).reverse())
                break;
            case "none":
                setProductsData([...productsdata.sort((a, b) => a.id - b.id)])
                break;
        }
        console.log(productsdata)
    }
    const sortProducts = (dataToSort) => {
        //Sortuje po nazwie
        if (dataToSort) {
            dataToSort.sort((a, b) => {
                const strA = replaceNotLetters(a.title);
                const strB = replaceNotLetters(b.title);
                return strA.localeCompare(strB);
            });
            return dataToSort;
        }
    }

    const searchItems = (e) => {
        setSearcePhrase(e.target.value.toLowerCase())
        console.log(e.target.value)
        if (category === "default") {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()) && product.category == category))
        }

    }
    const categoryItems = (e) => {
        if (e.target.value !== "default") {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(searchePhrase) && product.category == e.target.value))
        } else {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(searchePhrase)))
        }


    }
    const addToCart = async (product) =>{

    }
    const handleEdit = async (product, id) => {
        let newData = [...data];
        newData[id - 1] = product;
        newData = [...productsdata];
        newData[id - 1] = product;
        setProductsData(newData);
        setData(newData);
        fetch(`http://localhost:8080/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Nie udało się zaktualizować produktu.');
            }
            return response.json();
        }).then((data)=>{
            console.log(data.message)
        }).catch((error) => {
            console.error('Błąd podczas w czasie przesyłania danych: ', error);
        });
    }
    return (<>
        <div className="button-conteiner">
            <div className="buttons">
                <div className="sort-buttons">
                    <div className={"Dsc"} onClick={() =>
                        sortItems('dsc')
                    }>DSC
                    </div>
                    <div className={"Asc"} onClick={() =>
                        sortItems('asc')
                    }>ASC
                    </div>
                    <div className={"Default"} onClick={() =>
                        sortItems('none')
                    }>DEFAULT
                    </div>
                </div>
                <div><select id="category" name="category" onChange={(e) => {
                    setcategory(e.target.value);
                    categoryItems(e)
                }}>
                    <option value="default">default</option>
                    <option value="Suplements">Suplements</option>
                    <option value="Accessories">Accessories</option>
                    <option value="FreeWeights">FreeWeights</option>
                    <option value="Machines">Machines</option>
                    <option value="clothes">clothes</option>
                </select></div>
                <input type="text" placeholder={"search"} onChange={(e) => searchItems(e)}/>
            <div link = "/product">
                chuj
                <Link to="/">chuj</Link>
            </div></div>
        </div>
        <ProductsList products={productsdata} onEdit={handleEdit} role={role} addToCart = {addToCart}/></>)
}

export default ProductsCollection


function replaceNotLetters(text) {
    //Funkcja pomocnicza do sortowania która usuwa znaki niebędące literami
    text = text.replace(/3D /g, "");
    text = text.toLowerCase();
    return text.replace(/[^a-z]/g, "");
}