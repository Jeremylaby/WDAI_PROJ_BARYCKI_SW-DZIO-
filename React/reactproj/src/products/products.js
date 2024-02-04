import React, {useState, useEffect} from "react";
import ProductsList from "./ProductList";
import ReactDOM from "react-dom/client";
import './products.css'
import product from "./Product";


function Products() {
    const [data, setData] = useState([]);
    const [productsdata, setProductsData] = useState([]);
    const [category, setcategory] = useState("default")
    const [searchePhrase, setSearcePhrase] = useState("")


    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((Data) => {
                setData(Data.products)
                setProductsData(Data.products)
                console.log(data);
            })
            .catch((error) => console.log(error));
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
        if (category == "default") {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()) && product.category == category))
        }

    }
    const categoryItems = (e) => {
        if (e.target.value != "default") {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(searchePhrase) && product.category == e.target.value))
        } else {
            setProductsData(data.filter((product) => product.title.toLowerCase().includes(searchePhrase)))
        }


    }
    const handleEdit = (product,id)=>{
        let newData=[...data]
        newData[id-1]=product
        setData(newData)
        newData=[...productsdata]
        newData[id-1]=product
        setProductsData(newData)


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
                    <option value="smartphones">smartphones</option>
                    <option value="laptops">laptops</option>
                    <option value="fragrances">fragrances</option>
                    <option value="skincare">skincare</option>
                    <option value="groceries">groceries</option>
                    <option value="home-decoration">home-decoration</option>
                </select></div>
                <input type="text" placeholder={"search"} onChange={(e) => searchItems(e)}/></div>
        </div>
        <ProductsList products={productsdata} onEdit={handleEdit}/></>)
}

export default Products


function replaceNotLetters(text) {
    //Funkcja pomocnicza do sortowania która usuwa znaki niebędące literami
    text = text.replace(/3D /g, "");
    text = text.toLowerCase();
    return text.replace(/[^a-z]/g, "");
}