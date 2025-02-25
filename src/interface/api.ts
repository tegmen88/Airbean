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


export const checkOrderStatus = async (orderNr: number): Promise<string> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/beans/order/status/${orderNr}`
    ); // API-endpoint
    if (!response.ok) {
      throw new Error(`Failed to check order status: ${response.status}`);
    }
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error checking order status:", error);
    throw error;
  }
};







export const placeOrder = async (items: MenuItem[]): Promise<number> => {
  const orderPayload = {
    details: {
      order: items.map((item) => ({
        name: item.title,
        price: item.price,
      })),
    },
  };

  const response = await fetch(`${BASE_URL}/api/beans/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    throw new Error(`Order kunde inte skickas: ${response.status}`);
  }

  const data = await response.json();
  return data.orderNr;
};