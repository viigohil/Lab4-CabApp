import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import imageMap from '../utils/imageMap'; 

export default function CabsListScreen({ navigation }) {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      const cabsCollection = await getDocs(collection(db, 'cabs'));
      setCabs(cabsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchCabs();
  }, []);

  const getCabImage = (carModel) => {
    const imageKey = carModel.toLowerCase().replace(/\s+/g, '_');
    const defaultImageUri = 'https://via.placeholder.com/200x150.png?text=No+Image';
    return imageMap[imageKey] ? { uri: imageMap[imageKey] } : { uri: defaultImageUri }; 
  };

  const renderCabItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Cab Detail', { cabId: item.id })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={getCabImage(item.carModel)} 
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.carModel}>{item.carModel}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={item => item.id}
        renderItem={renderCabItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#90f0f9',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    padding: 19,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carModel: {
    fontSize: 20,
    color: '#555',
  },
});
