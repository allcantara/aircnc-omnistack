import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, [])

  async function logout() {
    await AsyncStorage.setItem('techs', '');
    await AsyncStorage.setItem('user', '');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 12
  },
});
