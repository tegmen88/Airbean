import '../scss/_cart.scss';
import React, { useState} from "react";
import { MenuItem, placeOrder, checkOrderStatus } from "../interface/api.ts";

interface CartProps {
    orderItems: MenuItem[];
}

const Cart: React.FC<CartProps> = ({ orderItems }) => {
    const [orderNr, setOrderNr] = useState<number | null>(null);

    // Uppdaterad checkout-funktion för att hantera hela varukorgen
    const checkout = async () => {
        if (orderItems.length === 0) {
            alert("Din varukorg är tom!");
            return;
        }
        try {
            const newOrderNr = await placeOrder(orderItems); // Skickar alla varor
            console.log("New order number: ", newOrderNr);
            console.log("Produkter i ordern:", orderItems);

            console.log("Produkter i ordern:");
            orderItems.forEach((item, index) => {
                console.log(`${index + 1}. ${item.title} - ${item.desc} (Pris: ${item.price} kr)`);
            });

            console.log("Produkter i ordern (JSON):", JSON.stringify(orderItems, null, 2));

            setOrderNr(newOrderNr);

        } catch (error) {
            console.error("Error placing order:", error);
            alert("Något gick fel vid beställning. Försök igen!");
        }
    };

    // Funktion för att kontrollera orderstatus
    const checkStatus = async () => {
        if (!orderNr) {
            alert("Inget ordernummer finns. Gör en beställning först!");
            return;
        }
        try {
            const status = await checkOrderStatus(orderNr);
            console.log("Orderstatus: ", status);
            alert(`Din orderstatus: ${status}`);
        } catch (error) {
            console.error("Error checking order status:", error);
        }
    };

    const emptyCart = () => {
        console.log("Varukorgen är nu tömd!");
    };

    // Beräkna totalbelopp
    const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

    // Beräkna totalbelopp
    if (!orderItems || orderItems.length === 0) {
        return (
            <div className="cart">
                <h2>Din beställning</h2>
                <p>Varukorgen är tom.</p>
            </div>
        );
    }

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

            <h2>Total: {totalAmount} kr</h2>

            <button onClick={emptyCart}>Töm varukorgen!</button>
            <button onClick={checkout}>Take my money!!</button>

            {/* Visa kontrollknapp för orderstatus om en ordernummer finns */}
            {orderNr && <button onClick={checkStatus}>Kontrollera orderstatus</button>}
        </div>
    );
};

export default Cart;