// src/pages/Inventory/InventoryList.tsx
import React, { useState, useEffect } from 'react';
import {
  PageContainer,
  PageHeader,
  SearchInput,
  AddButton,
  InventoryTable,
  TableRow,
  TableCell,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalForm,
  FormRow,
  Label,
  Input,
  Select,
  ModalActions,
  SaveButton,
  CancelButton,
  ActionButtons,
  IconButton
} from '../../styles/InventoryStyles';

import { fetchCustomers, Customer } from '../../api/customerAPI';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface InventoryItem {
  customerId: string;
  customerName: string;
  num: string;
  phone: string;
  address: string;
  goods: string;
  type: string;
  weight: string;
  arrivalDate: string;
  departureDate: string;
}

const InventoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<InventoryItem>({
    customerId: '',
    customerName: '',
    num: '',
    phone: '',
    address: '',
    goods: '',
    type: '',
    weight: '',
    arrivalDate: '',
    departureDate: '',
  });

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    loadCustomers();
  }, []);

  const handleCustomerSelect = (id: string) => {
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      setForm((prev) => ({
        ...prev,
        customerId: customer.id.toString(),
        customerName: customer.name,
        num: customer.email, // Temporarily using email as 'num'
        phone: customer.phone,
        address: customer.address,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedList = [...inventory];
      updatedList[editIndex] = form;
      setInventory(updatedList);
      toast.success("Inventory updated successfully!");
    } else {
      setInventory((prev) => [...prev, form]);
      toast.success("Inventory added successfully!");
    }

    setShowModal(false);
    setForm({
      customerId: '',
      customerName: '',
      num: '',
      phone: '',
      address: '',
      goods: '',
      type: '',
      weight: '',
      arrivalDate: '',
      departureDate: '',
    });
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this inventory record?");
    if (!confirmDelete) return;

    const updatedList = [...inventory];
    updatedList.splice(index, 1);
    setInventory(updatedList);
    toast.success("Inventory deleted.");
  };

  const filteredInventory = inventory.filter((item) =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader>
        <h2>Inventory</h2>
        <SearchInput
          type="text"
          placeholder="Search by customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={() => {
          setForm({
            customerId: '',
            customerName: '',
            num: '',
            phone: '',
            address: '',
            goods: '',
            type: '',
            weight: '',
            arrivalDate: '',
            departureDate: '',
          });
          setEditIndex(null);
          setShowModal(true);
        }}>
          + Add New Inventory
        </AddButton>
      </PageHeader>

      <InventoryTable>
        <thead>
          <tr>
            <th>Arrival Date</th>
            <th>Customer</th>
            <th>Num</th>
            <th>Goods</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Departure Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.arrivalDate}</TableCell>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.num}</TableCell>
              <TableCell>{item.goods}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.departureDate}</TableCell>
              <TableCell>
                <ActionButtons>
                  <IconButton onClick={() => setSelectedItem(item)}>
                    <Eye />
                  </IconButton>
                  <IconButton onClick={() => {
                    setForm(item);
                    setEditIndex(index);
                    setShowModal(true);
                  }}>
                    <Pencil />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Trash2 />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </InventoryTable>

      {/* View Modal */}
      {selectedItem && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>Inventory Details</ModalTitle>
            <ModalForm>
              {Object.entries(selectedItem).map(([key, value]) => (
                <FormRow key={key}>
                  <Label>{key}</Label>
                  <Input value={value} readOnly />
                </FormRow>
              ))}
              <ModalActions>
                <CancelButton onClick={() => setSelectedItem(null)}>Close</CancelButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>{editIndex !== null ? "Edit Inventory Entry" : "Add Inventory Entry"}</ModalTitle>
            <ModalForm>
              <FormRow>
                <Label>Customer</Label>
                <Select name="customerId" onChange={(e) => handleCustomerSelect(e.target.value)} value={form.customerId}>
                  <option value="">Select...</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </FormRow>

              <FormRow><Label>Num</Label><Input type="text" name="num" value={form.num} onChange={handleChange} /></FormRow>
              <FormRow><Label>Phone</Label><Input type="text" name="phone" value={form.phone} onChange={handleChange} /></FormRow>
              <FormRow><Label>Address</Label><Input type="text" name="address" value={form.address} onChange={handleChange} /></FormRow>
              <FormRow><Label>Goods</Label><Input type="text" name="goods" value={form.goods} onChange={handleChange} /></FormRow>
              <FormRow><Label>Type</Label><Input type="text" name="type" value={form.type} onChange={handleChange} /></FormRow>
              <FormRow><Label>Weight</Label><Input type="text" name="weight" value={form.weight} onChange={handleChange} /></FormRow>
              <FormRow><Label>Arrival Date</Label><Input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} /></FormRow>
              <FormRow><Label>Departure Date</Label><Input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} /></FormRow>

              <ModalActions>
                <CancelButton onClick={() => { setShowModal(false); setEditIndex(null); }}>Cancel</CancelButton>
                <SaveButton onClick={handleSave}>{editIndex !== null ? "Update" : "Save"}</SaveButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InventoryList;
