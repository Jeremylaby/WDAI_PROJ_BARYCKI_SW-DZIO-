import React from 'react';
import Product from "./Product";

function ProductsList({products,onEdit}) {
    return (<div className="products-list">
        {products.map((product) => (<Product key={product.id} product={product} onEdit={onEdit}/>))}</div>);
}export default ProductsList;
