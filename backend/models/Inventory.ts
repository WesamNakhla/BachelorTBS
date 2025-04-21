// Inventory item structure
export interface InventoryItem {
    id: number;
    customerId: number;
    customerName: string;
    goods: string;
    type: string;
    quantity: number;
    unit: string;
    weight: number;
    arrivalDate: string;
    departureDate: string;
  }
  
  // In-memory list of inventory records (for testing)
  let inventoryData: InventoryItem[] = [
    {
      id: 1,
      customerId: 101,
      customerName: "John Doe",
      goods: "Wooden Pallets",
      type: "Storage",
      quantity: 20,
      unit: "pallet",
      weight: 500,
      arrivalDate: "2025-03-20",
      departureDate: "2025-03-25"
    },
    {
      id: 2,
      customerId: 101,
      customerName: "John Doe",
      goods: "Metal Sheets",
      type: "Storage",
      quantity: 10,
      unit: "sheet",
      weight: 300,
      arrivalDate: "2025-03-22",
      departureDate: "2025-03-30"
    },
    {
      id: 3,
      customerId: 102,
      customerName: "Sara Smith",
      goods: "Plastic Containers",
      type: "Transport",
      quantity: 50,
      unit: "box",
      weight: 200,
      arrivalDate: "2025-04-01",
      departureDate: "2025-04-05"
    }
  ];
  
  // Get all inventory items
  export const getAllInventory = (): InventoryItem[] => {
    return inventoryData;
  };
  
  // Get inventory items by customer ID
  export const getInventoryByCustomerId = (customerId: number): InventoryItem[] => {
    return inventoryData.filter((item) => item.customerId === customerId);
  };
  
  // Add new inventory item
  export const addInventoryItem = (item: InventoryItem): void => {
    inventoryData.push(item);
  };
  
  // Delete inventory by ID
  export const deleteInventoryItem = (id: number): void => {
    inventoryData = inventoryData.filter((item) => item.id !== id);
  };
  
  // Reset all inventory (for testing purposes)
  export const resetInventory = (): void => {
    inventoryData = [];
  };
  