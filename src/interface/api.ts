const BASE_URL = 'https://airbean-9pcyw.ondigitalocean.app'

// interface
export interface MenuItem {
    "id": string;
    "title": string;
    "desc": string;
    "price": number;
}

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
            throw new Error('Unexpected API response format');
        }
    } catch (error) {
        console.error('Error fetching menu:', error);
        return []; // Returnera en tom array vid fel för att förhindra krasch
    }
};
