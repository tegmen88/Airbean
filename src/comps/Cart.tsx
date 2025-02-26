import "../scss/_cart.scss";
import React, { useState, useEffect } from "react";
import { MenuItem, placeOrder, checkOrderStatus } from "../interface/api.ts";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartProps {
  orderItems: MenuItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const Cart: React.FC<CartProps> = ({ orderItems, setOrderItems }) => {
  const [orderNr, setOrderNr] = useState<number | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Varukorgens innehåll:", orderItems);

    const hasBryggkaffe = orderItems.some((item) => item.title.includes("Bryggkaffe"));
    const hasGustav = orderItems.some((item) => item.title.includes("Gustav"));

    console.log("Har Bryggkaffe?", hasBryggkaffe);
    console.log("Har Gustav?", hasGustav);

    if (hasBryggkaffe && hasGustav) {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  }, [orderItems]);

  const calculateTotal = () => {
    let total = orderItems.reduce((sum, item) => sum + item.price, 0);
    
    if (discountApplied) {
      total -= 49;
    }

    return total;
  };

  const checkout = async () => {
    if (orderItems.length === 0) {
      alert("Din varukorg är tom!");
      return;
    }
    try {
      const newOrderNr = await placeOrder(orderItems);

      console.log("Order skickad! Ordernummer:", newOrderNr);
      setOrderNr(newOrderNr);
      navigate("/status", { state: { orderNr: newOrderNr } });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Något gick fel vid beställning. Försök igen!");
    }
  };

  //  Lägg tillbaka funktionen för att kolla orderstatus
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
      alert("Kunde inte hämta orderstatus, försök igen.");
    }
  };

  // funktion för att ta bort
  const removeItem = (indexToRemove: number) => {
    const updatedItems = orderItems.filter((_, index) => index !== indexToRemove);
    setOrderItems(updatedItems);
    console.log(`Produkt med index ${indexToRemove} togs bort.`);
  };

  // funktion för att tömma varukorg
  const emptyCart = () => {
    setOrderItems([]);
    console.log("Varukorgen är nu tömd!");
  };
    
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
            <IconButton
                onClick={() => removeItem(index)}
                aria-label="ta bort produkt"
                color="error"
                size="small"

            >
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>

      {discountApplied && (
        <p style={{ color: "red", fontWeight: "bold" }}>
            Kampanjrabatt: -49 kr 
        </p>
      )}

      <h2>Total: {calculateTotal()} kr</h2>

      {/* Knappar för att hantera varukorgen och beställningen */}
      <button onClick={emptyCart}>Töm varukorgen!</button>
      <button onClick={checkout}>Take my money!!</button>

      {/* 🔍 Lägg tillbaka knappen för att kontrollera orderstatus */}
      {orderNr && (
        <button onClick={checkStatus}>Kontrollera orderstatus</button>
      )}
    </div>
  );
};

export default Cart;
