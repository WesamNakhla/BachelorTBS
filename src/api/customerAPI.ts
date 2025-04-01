import axios from "axios";

// Define customer type
export interface Customer {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// ✅ Fetch all customers
export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get("/api/customers");
  return response.data;
};

// ✅ Get one customer by ID
export const getCustomerById = async (id: string | number): Promise<Customer> => {
  const response = await axios.get(`/api/customers/${id}`);
  return response.data;
};

// ✅ Create a new customer
export const createCustomer = async (data: Omit<Customer, "id">): Promise<void> => {
  await axios.post("/api/customers", data);
};

// ✅ Update a customer
export const updateCustomer = async (
  id: string | number,
  data: Omit<Customer, "id">
): Promise<void> => {
  await axios.put(`/api/customers/${id}`, data);
};

// ✅ Delete a customer
export const deleteCustomer = async (id: string | number): Promise<void> => {
  await axios.delete(`/api/customers/${id}`);
};

// ✅ Get total number of customers (for dashboard use)
export const getCustomersCount = async (): Promise<number> => {
  const response = await axios.get("/api/customers/count");
  return response.data.count; // Assuming API returns: { count: 42 }
};