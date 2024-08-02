import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Image } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import imageMap from '../utils/imageMap';

export default function MyCabScreen() {
  const [myCabs, setMyCabs] = useState([]);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    const fetchMyCabs = async () => {
      try {
        const myCabsCollection = await getDocs(collection(db, 'myCabs'));
        setMyCabs(myCabsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching myCabs:', error);
        Alert.alert('Error', 'Unable to fetch booked cabs.');
      }
    };

    fetchMyCabs();
  }, [isFocused]); 

  const handleCancelBooking = async (cabId) => {
    try {
      await deleteDoc(doc(db, 'myCabs', cabId));
      setMyCabs(myCabs.filter(cab => cab.id !== cabId));
      Alert.alert('Success', 'Booking canceled successfully.');
    } catch (error) {
      console.error('Error canceling booking:', error);
      Alert.alert('Error', 'Unable to cancel the booking.');
    }
  };

  const getCabImage = (carModel) => {
    const imageKey = carModel.toLowerCase().replace(/\s+/g, '_');
    return imageMap[imageKey] ? { uri: imageMap[imageKey] } : { uri: 'https://via.placeholder.com/150.png?text=No+Image' };
  };

  const renderCabItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={getCabImage(item.carModel)}
        style={styles.image}
      />
      <Text style={styles.header}>{item.companyName}</Text>
      <Text style={styles.subHeader}>{item.carModel}</Text>
      <Text style={styles.detail}>Passengers: {item.passengers}</Text>
      <Text style={styles.detail}>Rating: {item.rating}</Text>
      <Text style={styles.detail}>Cost/hour: ${item.costPerHour}</Text>
      <Button title="Cancel Booking" onPress={() => handleCancelBooking(item.id)} color="#FF4C4C" />
    </View>
  );

  return (
    <View style={styles.container}>
      {myCabs.length === 0 ? (
        <Text style={styles.noCabsText}>No cabs booked yet.</Text>
      ) : (
        <FlatList
          data={myCabs}
          keyExtractor={item => item.id}
          renderItem={renderCabItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#90f0f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 20,
    color: '#555',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  noCabsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  list: {
    paddingBottom: 20,
  },
});
