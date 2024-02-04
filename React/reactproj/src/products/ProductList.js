import React from 'react';
import Product from "./Product";

function ProductsList({products,onEdit,role}) {
    return (<div className="products-list">
        {products.map((product) => (<Product key={product.id} product={product} role={role} onEdit={onEdit}/>))}</div>);
}export default ProductsList;
