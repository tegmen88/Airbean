// interface
export interface MenuItem {
  id: string;
  title: string;
  desc?: string;
  price: number;
}
const BASE_URL = "https://airbean-9pcyw.ondigitalocean.app";

// Fetch metod som hämtar menyn
// api.ts
export const fetchMenu = async (): Promise<MenuItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/beans/`); // API-endpoint
    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.status}`);
    }
    const data = await response.json();
    console.log("API response:", data);

    // Kontrollera att svaret innehåller "menu" som en array
    if (data.success && Array.isArray(data.menu)) {
      return data.menu; // Returnera arrayen
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error fetching menu:", error);
    return []; // Returnera en tom array vid fel för att förhindra krasch
  }
};

// Exporterar en asynkron funktion `checkOrderStatus` som tar ett ordernummer (number) och returnerar orderns status som en sträng (Promise<string>)
export const checkOrderStatus = async (orderNr: number): Promise<string> => {
  try {
    // Skickar en HTTP GET-förfrågan till servern för att hämta orderns status
    const response = await fetch(
      `${BASE_URL}/api/beans/order/status/${orderNr}`
    ); // API-endpoint
    // Om svaret inte är OK (HTTP-statuskod 200-299), kasta ett fel
    if (!response.ok) {
      throw new Error(`Failed to check order status: ${response.status}`);
    }
    // Läser in svaret som JSON
    const data = await response.json();
    // Returnerar statusen för ordern
    return data.status;
  } catch (error) {
    // Loggar eventuella fel som uppstår vid hämtning av orderstatus
    console.error("Error checking order status:", error);
    throw error; // Kastar felet vidare så att det kan hanteras högre upp i koden
  }
};

// Exporterar en asynkron funktion `placeOrder` som tar ett `MenuItem`-objekt som argument och returnerar ett löfte (Promise) som löser sig till ett ordernummer (number)
export const placeOrder = async (items: MenuItem[]): Promise<number> => {
  // Skapar ett orderobjekt med detaljer, inklusive namnet och priset på den beställda varan
  const orderPayload = {
    details: {
      order: items.map((item) => ({
        name: item.title, // namnet på menyalternativet
        price: item.price, // priset på menyalternativet
      })),
    },
  };

  // Skickar en HTTP POST-förfrågan till servern för att skapa en ny order
  const response = await fetch(`${BASE_URL}/api/beans/order`, {
    method: "POST", // Anger att det är en POST-förfrågan
    headers: {
      "Content-Type": "application/json", // Anger att vi skickar JSON-data
    },
    body: JSON.stringify(orderPayload), // Omvandlar `orderPayload` till en JSON-sträng
  });

  // Om svaret inte är OK (HTTP-statuskod 200-299), kasta ett fel
  if (!response.ok) {
    throw new Error(`Order kunde inte skickas: ${response.status}`);
  }

  // Läser in svaret som JSON
  const data = await response.json();
  // Returnerar ordernumret från svaret
  return data.orderNr;
};
