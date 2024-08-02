import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import imageMap from '../utils/imageMap'; 

export default function CabDetailScreen({ route, navigation }) {
  const { cabId, onBookingSuccess } = route.params;
  const [cab, setCab] = useState(null);

  useEffect(() => {
    const fetchCab = async () => {
      const cabDoc = await getDoc(doc(db, 'cabs', cabId));
      setCab(cabDoc.data());
    };

    fetchCab();
  }, [cabId]);

  const handleBooking = async () => {
    const myCabsCollection = collection(db, 'myCabs');
    const myCabsSnapshot = await getDocs(myCabsCollection);
    if (myCabsSnapshot.size >= 2) {
      Alert.alert('Booking Error', 'You cannot book more than 2 cabs at a time.');
      return;
    }
    await setDoc(doc(myCabsCollection, cabId), cab);
    Alert.alert('Success', 'Cab booked successfully!');
    if (onBookingSuccess) onBookingSuccess();
    navigation.goBack();
  };

  const getCabImage = (carModel) => {
    const imageKey = carModel.toLowerCase().replace(/\s+/g, '_');
    const defaultImageUri = 'https://via.placeholder.com/300x200.png?text=No+Image';
    return imageMap[imageKey] ? { uri: imageMap[imageKey] } : { uri: defaultImageUri };
  };

  return cab ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={getCabImage(cab.carModel)} style={styles.image} />
        <Text style={styles.header}>{cab.companyName}</Text>
        <Text style={styles.subHeader}>{cab.carModel}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>Passengers: {cab.passengers}</Text>
          <Text style={styles.detail}>Rating: {cab.rating}</Text>
          <Text style={styles.detail}>Cost/hour: ${cab.costPerHour}</Text>
        </View>
        <Button title="Book Cab" onPress={handleBooking} color="#007BFF" />
      </View>
    </ScrollView>
  ) : (
    <View style={styles.loadingContainer}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#90f0f9',
  },
  card: {
    backgroundColor: '#ffffff', 
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 350, 
    height: 300, 
    borderRadius: 6,
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    color: '#555',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detail: {
    fontSize: 19,
    color: '#333',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
