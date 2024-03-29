import React, { useState, useContext } from 'react'; // Add useContext to your import from React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from './CartElements/CartContext';


function ProductCard({ product, onEdit,role }) {
    const [edit, setEdit] = useState(false);
    const [editedTitle, setEditedTitle] = useState(product.title);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [editedPrice, setEditedPrice] = useState(product.price);

    const { addToCart } = useContext(CartContext);

    const handleCancel = () => {
        setEditedTitle(product.title);
        setEditedDescription(product.description);
        setEditedPrice(product.price);
        setEdit(false);
    };

    const handleAccept = () => {
        const updatedProduct = {
            ...product,
            title: editedTitle,
            description: editedDescription,
            price: editedPrice,
        };
        onEdit(updatedProduct, product.id);
        setEdit(false);
    };

    return (
        <div className="product-card">
            {!edit && (role==="admin")&& (
                <div className={"edit-conteiner"}>
                    <FontAwesomeIcon
                        className={"edit-icon"}
                        onClick={() => {
                            setEdit(true);
                        }}
                        icon={faPenToSquare}
                        style={{ color: "#ffffff" }}
                    />
                </div>
            )}
            <div className="product">
                <div className="product-conteiner">
                    <img className="product-img" src={"http://localhost:8080"+product.images} alt={product.title} />
                    <div className="product-properties">
            <span
                contentEditable={edit}
                className="product-title"
                onBlur={(e) => setEditedTitle(e.target.innerText)}
                dangerouslySetInnerHTML={{ __html: editedTitle }}
            ></span>
                        <div>Price: <span
                            contentEditable={edit}
                            className="product-price"
                            onBlur={(e) => setEditedPrice(e.target.innerText)}
                            dangerouslySetInnerHTML={{ __html: editedPrice }}
                        ></span>$</div>
                        <span className="product-brand">Brand: {product.brand}</span>
                        <span className="product-category">Category: {product.category}</span>
                    </div>
                </div>
                <div
                    contentEditable={edit}
                    className="product-description"
                    onBlur={(e) => setEditedDescription(e.target.innerText)}
                    dangerouslySetInnerHTML={{ __html: editedDescription }}
                ></div>
                <div className="product-footer">
                    <span className="product-discount">Discount: {product.discountPercentage}%</span>
                    <span className="product-rating">Rating: {product.rating}</span>
                </div>
                {edit && (
                    <div className={"accept-cancel"}>
                        <span onClick={handleCancel}>Cancel</span>
                        <span onClick={handleAccept}>Accept</span>
                    </div>
                )}
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;
