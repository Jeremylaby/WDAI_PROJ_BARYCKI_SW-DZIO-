import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);

    return (
        <div>
            {cartItems.map(item => (
                <div key={item.id}>
                    <span>{item.title}</span>
                    <span>{item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                </div>
            ))}
            <div>Total: ${getCartTotal()}</div>
        </div>
    );
}

export default Cart;