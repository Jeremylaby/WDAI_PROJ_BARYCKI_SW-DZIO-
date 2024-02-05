import React from 'react';
import ProductCard from "./ProductCard";

function ProductsList({products,onEdit,role, addToCart}) {
    return (<div className="products-list">
        {products.map((product) => (<ProductCard key={product.id} product={product} role={role} onEdit={onEdit} addToCart = {addToCart}/>))}</div>);
}export default ProductsList;
