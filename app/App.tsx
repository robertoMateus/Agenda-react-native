import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/poppins';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import CardAgenda from '../components/CardAgenda';
import { router } from 'expo-router';

export default function App() {
   useFonts({
    Poppins_700Bold: Poppins_700Bold,
  });

  const [agenda,setAgenda] = useState([])

  const carregarTarefas = async () => {
    try {
      const tarefasString = await AsyncStorage.getItem('tarefas');
      const tarefas = tarefasString ? JSON.parse(tarefasString) : [];
      setAgenda(tarefas);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };


  useEffect(() => {
    carregarTarefas()
  })


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda</Text>
       {agenda.map((item) => (
        <CardAgenda key={item.id} titulo={item.titulo} hora={item.hora} />
      ))}
      <Pressable onPress={() => router.navigate("/CadastrarTarefa")} style={styles.adicionarTarefa}>
        <Text style = {styles.textoBotao}>
          +
        </Text>
      </Pressable>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: '100%',
    paddingBottom: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  titulo: {
    paddingTop: 40,
    fontSize: 40,
    fontFamily: "Poppins_700Bold",
    width: '100%',
    height: 100
  },
  card: {
    marginTop: 20,
    width: '100%',
    height: 55,
    justifyContent: "center"
  },
  interiorCard: {
    flexDirection: "row",

  },
  tituloCard: {
    textAlign: "left",
    paddingTop: 3
  },
  adicionarTarefa: {
    marginTop: 30,
    backgroundColor: '#0096FF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF', 
  fontSize: 30, 
  lineHeight: 30, 
  fontWeight: 'bold', 
  }
});
