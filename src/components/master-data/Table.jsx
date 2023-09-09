import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const Table = ({handleEdit, refetch, dataBarang, title}) => {

  const deleteData = async id => {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:3000/api/v1/barang/${id}`,
      );
      Alert.alert('Data Deleted');
      console.log('RESPONSE :', response);
      await refetch();
    } catch (err) {
      console.log('eror delete :', JSON.stringify(err, null, 4));
    }
  };

 
  const renderHeader = () => {
    return (
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Nama</Text>
        <Text style={styles.headerCell}>Harga</Text>
        <Text style={styles.headerCell}>Qty</Text>
        <Text style={styles.headerCell}>Options</Text>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.nama}</Text>
      <Text style={styles.cell}>{item.harga}</Text>
      <Text style={styles.cell}>{item.qty}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteData(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {title === 'Master barang' ? (
        <>
          <FlatList
            data={dataBarang}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={renderItem}
          />
        </>
      ): (
        <FlatList
            data={dataBarang}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={renderItem}
          />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'green',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginRight: 3,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
});

export default Table;
