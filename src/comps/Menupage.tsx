import "../scss/_menupage.scss";
import { useEffect, useState } from "react";
import { fetchMenu, MenuItem } from "../interface/api.ts";
import AddIcon from "@mui/icons-material/Add";

// Definierar props för Menupage-komponenten
interface MenupageProps {
  addToCart: (item: MenuItem) => void; // Funktion för att lägga till en vara i varukorgen
}

function Menupage({ addToCart }: MenupageProps) {
  // stats för lagra meny, hantera eventuella fel & hålla reda på om meny laddas
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect används för att hämta menyn vid komponentens montering
  useEffect(() => {
    async function getMenu() {
      try {
        const items = await fetchMenu(); // Hämtar menyn från API:et
        console.log("API response: ", items);
        setMenuItems(items); // Uppdaterar state med menyprodukterna
      } catch (error) {
        setError((error as Error).message); // Sparar eventuellt felmeddelande i state
        console.error("Error fetching menu:", error);
      } finally {
        setIsLoading(false); // Indikerar att laddningen är klar
      }
    }

    getMenu(); // Anropar funktionen för att hämta menyn
  }, []);

  // Funktion som anropas när en produkt läggs till i varukorgen
  const addButton = (item: MenuItem) => {
    console.log("Add button: ", item);
    addToCart(item); // Lägg till produkten i varukorgen
  };

  // Om menyn fortfarande laddas visas ett meddelande
  if (isLoading) return <div>Hämtar menyn...</div>;
  // Om ett fel uppstod visas ett felmeddelande
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
