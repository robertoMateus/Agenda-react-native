import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface CardProps {
  titulo: string;
  hora: string;
}

const CardAgenda = ({ titulo, hora }: CardProps) => {
  const [sublinhado, setSublinhado] = useState<boolean>(false);

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.interiorCard}>
        <BouncyCheckbox 
          fillColor='#0096FF' 
          onPress={() => setSublinhado(!sublinhado)} 
        />
        <View>
          <Text style={sublinhado ? styles.tituloCardSublinhado : styles.tituloCard}>
            {titulo}
          </Text>
          <Text style={styles.horaCard}>{hora}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: '100%',
   // height: 70, 
    justifyContent: "center"
  },
  interiorCard: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tituloCard: {
    textAlign: "left",
    paddingTop: 3,
    flexShrink: 1
  },
  horaCard: {
    
  },
  tituloCardSublinhado: {
    textAlign: "left",
    textDecorationLine: 'line-through',
    color: '#999',
    paddingTop: 3
  }
});

export default CardAgenda;