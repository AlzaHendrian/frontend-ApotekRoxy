import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import Input from '../../components/master-data/Input';
import Table from '../../components/master-data/Table';
import axios from 'axios';

const HomeScreen = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataBarang, setDataBarang] = useState([]);
  const [search, setSearch] = useState('');

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Fungsi search debounce
  const debouncedSearch = (query) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set timeout
    const newTimeout = setTimeout(() => {
      getData(query);
    }, 1000);

    setDebounceTimeout(newTimeout);
  };

  // State kelola data form
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    harga: '',
    qty: '',
  });

  // Fungsi ubah nilai form
  const handleChangeText = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi update tabel
  const handlePressUpdate = (item) => {
    console.log(item);
    setIsUpdate(true);
    setFormData(item);
  };

  const clearFormData = () => {
    setFormData({
      id: '',
      nama: '',
      harga: '',
      qty: '',
    });
    setIsUpdate(false);
  };

  // Fungsi get data
  const getData = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:3000/api/v1/barang?search_name=${search}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setDataBarang(response.data.data);
      console.log('INI RESPONSE DATA:', response.data.data);
    } catch (error) {
      console.log('INI ERROR', error.message);
    }
  };

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  return (
    <View style={{ flex: 1 }}>
      {/* Komponen Input form */}
      <Input
        handleChangeText={handleChangeText}
        formData={formData}
        clearFormData={clearFormData}
        isUpdate={isUpdate}
        refetch={getData}
        title="Master barang"
      />
      {/* Komponen Search input */}
      <View style={{ marginVertical: 6, paddingHorizontal: 16 }}>
        <Text>Search</Text>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            paddingHorizontal: 10,
            fontSize: 16,
            backgroundColor: '#fff',
          }}
          placeholder="Tulis sesuatu..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={(event) => setSearch(event)}
        />
      </View>
      {/* Komponen Table view data barang */}
      <Table
        handleEdit={handlePressUpdate}
        refetch={getData}
        dataBarang={dataBarang}
        title="Master barang"
      />
    </View>
  );
};

export default HomeScreen;
