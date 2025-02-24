import "../scss/_menupage.scss";
import { useEffect, useState } from "react";
import {
  fetchMenu,
  MenuItem,
  placeOrder,
  checkOrderStatus,
} from "../interface/api.ts"; //Infogat placeOrder och checkOrderStatus
import AddIcon from "@mui/icons-material/Add";

interface MenupageProps {
  addToCart: (item: MenuItem) => void;
}

function Menupage({ addToCart }: MenupageProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderNr, setOrderNr] = useState<number | null>(null); // Lagt till orderNr

  useEffect(() => {
    async function getMenu() {
      try {
        const items = await fetchMenu();
        console.log("API response: ", items);
        setMenuItems(items);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching menu:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getMenu();
  }, []);

  const addButton = async (item: MenuItem) => {
    console.log("Add button: ", item);
    try {
      const newOrderNr = await placeOrder(item);
      console.log("New order number: ", newOrderNr); // Logga ordernumret
      setOrderNr(newOrderNr);
      addToCart(item); // Lägg till produkten i varukorgen
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const checkStatus = async () => {
    if (orderNr) {
      try {
        const status = await checkOrderStatus(orderNr);
        console.log("Order status: ", status);
      } catch (error) {
        console.error("Error checking order status:", error);
      }
    }
  };

  if (isLoading) return <div>Hämtar menyn...</div>;
  if (error) return <div>Ett fel uppstod: {error}</div>;

  return (
    <div className="menu-page">
      <img src="/menuheaderup.png" alt="Flower" className="menuheader up" />
      <h1>Meny</h1>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={item.id || index} className="menu-item">
            <span className="menu-item-name">
              <button className="menu-add-btn" onClick={() => addButton(item)}>
                <AddIcon />
              </button>
              {item.title + " "}
              {item.price}
              <br />
              {item.desc}
            </span>
          </li>
        ))}
      </ul>
      <img src="/menuheaderdown.png" alt="Flower" className="menuheader down" />
      {orderNr && (
        <button onClick={checkStatus}>Kontrollera orderstatus</button>
      )}
    </div>
  );
}

export default Menupage;