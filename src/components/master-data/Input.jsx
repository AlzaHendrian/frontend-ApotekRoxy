import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const Input = ({handleChangeText, formData, clearFormData, isUpdate, refetch, title}) => {
  const handleOnPress = async () => {
    const data = new URLSearchParams();
    data.append('id', formData.id);
    data.append('nama', formData.nama);
    data.append('harga', formData.harga);
    data.append('qty', formData.qty);

    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/v1/barang',
        data.toString(),
      );
      if (response) {
        Alert.alert('Add Barang Success');
      }
      await refetch();
      clearFormData();
    } catch (error) {
      console.error('ini error post', JSON.stringify(error, null, 4));
      Alert.alert('Failed add Barang');
    }
  };

  const updateData = async () => {
    try {
      const dataUpdate = new URLSearchParams();
      dataUpdate.append('id', formData.id);
      dataUpdate.append('nama', formData.nama);
      dataUpdate.append('harga', formData.harga);
      dataUpdate.append('qty', formData.qty);

      const response = await axios.put(
        `http://10.0.2.2:3000/api/v1/barang/${formData.id}`, dataUpdate.toString(),
      );
      Alert.alert('Data Updated');
      console.log('RESPONSE :', response);
      await refetch();
      clearFormData();
    } catch (err) {
      console.log('eror delete :', JSON.stringify(err, null, 4));
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {title === 'Master barang' ? (
        <>
        <TextInput
            style={styles.input}
            placeholder="ID Barang"
            placeholderTextColor="#aaa"
            onChangeText={value => handleChangeText('id', value)}
            value={formData?.id.toString()}
        />
        <TextInput
            style={styles.input}
            placeholder="Nama Barang"
            placeholderTextColor="#aaa"
            onChangeText={value => handleChangeText('nama', value)}
            value={formData?.nama.toString()}
        />
        <TextInput
            style={styles.input}
            placeholder="Harga"
            placeholderTextColor="#aaa"
            onChangeText={value => handleChangeText('harga', value)}
            value={formData?.harga.toString()}
        />
        <TextInput
            style={styles.input}
            placeholder="Qty"
            placeholderTextColor="#aaa"
            onChangeText={value => handleChangeText('qty', value)}
            value={formData?.qty.toString()}
        />
        <TouchableOpacity
            style={styles.addButton}
            onPress={isUpdate ? updateData : handleOnPress}>
            <Text style={styles.buttonText}>{isUpdate ? "Edit" : "Add"}</Text>
        </TouchableOpacity>
        </>
        
        
    ): (
        <>
            <TextInput
                style={styles.input}
                placeholder="ID transaksi"
                placeholderTextColor="#aaa"
                onChangeText={value => handleChangeText('nama', value)}
                value={formData?.nama.toString()}
            />
            <TextInput
                style={styles.input}
                placeholder="Tanggal transaksi"
                placeholderTextColor="#aaa"
                onChangeText={value => handleChangeText('harga', value)}
                value={formData?.harga.toString()}
            />
            <TextInput
                style={styles.input}
                placeholder="Total"
                placeholderTextColor="#aaa"
                onChangeText={value => handleChangeText('qty', value)}
                value={formData?.qty.toString()}
            />
        </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Input;
