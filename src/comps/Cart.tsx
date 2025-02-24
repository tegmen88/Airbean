import React from "react";
import { MenuItem } from "../interface/api.ts";

interface CartProps {
  orderItems: MenuItem[];
}

const Cart: React.FC<CartProps> = ({ orderItems }) => {
  return (
    <div className="cart">
      <h2>Din beställning</h2>
      <ul>
        {orderItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.price} kr
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
