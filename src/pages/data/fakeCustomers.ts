// src/data/fakeCustomers.ts

// Customer interface that represents full customer profile data
export interface Customer {
    id: number; // Unique customer ID
    userId: number; // Foreign key that links to the user ID
    companyName: string; // Customer company or full name
    companyEmail: string; // Company contact email
    orgNumber: string; // Organization or tax number (e.g., Norwegian org nr)
    zipCode: string; // Postal/zip code
    city: string; // City or geographical location
    address: string; // Full street address
    contactPerson: string; // Primary contact person name
    companyPhone: string; // Company or contact phone number
    customerType: string; // Type of customer (e.g., Company, Individual, etc.)
  }
  
  // Mock data for testing the customer table and linking with users
  export const fakeCustomers: Customer[] = [
    {
      id: 1,
      userId: 3, // Corresponds to user with ID 3 (assumed to be a customer)
      companyName: "Fiskecentralen AS",
      companyEmail: "post@fiskecentralen.no",
      orgNumber: "923456789",
      zipCode: "0150",
      city: "Oslo",
      address: "Akershusstranda 23",
      contactPerson: "Henrik Jensen",
      companyPhone: "+47 912 345 67",
      customerType: "Company",
    },
  ];
  