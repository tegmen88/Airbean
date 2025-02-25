import "../scss/_menupage.scss";
import { useEffect, useState } from "react";
import { fetchMenu, MenuItem } from "../interface/api.ts";
import AddIcon from "@mui/icons-material/Add";

interface MenupageProps {
  addToCart: (item: MenuItem) => void;
}

function Menupage({ addToCart }: MenupageProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const addButton = (item: MenuItem) => {
    console.log("Add button: ", item);
    addToCart(item); // Lägg till produkten i varukorgen
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
      </div>
  );
}

export default Menupage;