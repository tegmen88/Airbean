import "../scss/_cart.scss";
import React, { useState } from "react";
import { MenuItem, placeOrder, checkOrderStatus } from "../interface/api.ts";
import { useNavigate } from "react-router-dom";

// Definierar props för Cart-komponenten
interface CartProps {
  orderItems: MenuItem[]; // Lista över produkter i varukorgen
  setOrderItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; // Lista över produkter i varukorgen
}

// Cart-komponenten hanterar varukorgen och beställningsflödet
const Cart: React.FC<CartProps> = ({ orderItems, setOrderItems }) => {
  const [orderNr, setOrderNr] = useState<number | null>(null); // Sparar ordernumret efter beställning
  const navigate = useNavigate(); // För navigering

  // Uppdaterad checkout-funktion för att hantera hela varukorgen
  const checkout = async () => {
    if (orderItems.length === 0) {
      alert("Din varukorg är tom!"); // Meddelande om varukorgen är tom
      return;
    }
    try {
      const newOrderNr = await placeOrder(orderItems); // Skickar alla varor
      console.log("New order number: ", newOrderNr);
      console.log("Produkter i ordern:", orderItems);

      console.log("Produkter i ordern:");
      orderItems.forEach((item, index) => {
        // Loggar detaljer om beställningen
        console.log(
          `${index + 1}. ${item.title} - ${item.desc} (Pris: ${item.price} kr)`
        );
      });

      console.log(
        "Produkter i ordern (JSON):",
        JSON.stringify(orderItems, null, 2)
      );

      setOrderNr(newOrderNr); // Sparar ordernumret

      // Skicka användaren till status-sidan med ordernummer
      navigate("/status", { state: { orderNr: newOrderNr } });
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

  // funktion för att tömma varukorg
  const emptyCart = () => {
    setOrderItems([]);
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
        {/* Loopar igenom varukorgen och visar varje produkt */}
        {orderItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.price} kr
          </li>
        ))}
      </ul>

      <h2>Total: {totalAmount} kr</h2>

      {/* Knappar för att hantera varukorgen och beställningen */}
      <button onClick={emptyCart}>Töm varukorgen!</button>
      <button onClick={checkout}>Take my money!!</button>

      {/* Visa kontrollknapp för orderstatus om en ordernummer finns */}
      {orderNr && (
        <button onClick={checkStatus}>Kontrollera orderstatus</button>
      )}
    </div>
  );
};

export default Cart;
