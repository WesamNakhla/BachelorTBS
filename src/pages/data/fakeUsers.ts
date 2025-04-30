import type { User } from "../types/User";

export const fakeUsers: User[] = [
  {
    id: 1,
    name: "Wesam Ahmad",
    email: "admin@tbs.no",
    phone: "+47 912 345 67",
    role: "admin",
    status: "active",
    createdAt: "2024-12-01T09:30:00Z",
  },
  {
    id: 2,
    name: "Lina Foss",
    email: "employee@tbs.no",
    phone: "+47 998 765 43",
    role: "employee",
    status: "active",
    createdAt: "2024-11-15T14:00:00Z",
  },
  {
    id: 3,
    name: "Khaled Noor",
    email: "khaled@client.no",
    phone: "+47 955 112 33",
    role: "customer",
    status: "inactive",
    createdAt: "2024-10-05T08:20:00Z",
  },
];
