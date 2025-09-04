import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CadastrarTarefa() {
  const [tarefa, setTarefa] = useState("");
  const [hora, setHora] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || hora;
    setMostrarPicker(Platform.OS === 'ios'); 
    setHora(currentDate);
  };

  const salvarTarefa = async () => {
    if (!tarefa.trim()) {
    alert("Digite uma tarefa antes de salvar!");
    return;
  }

  const novaTarefa = {
    titulo: tarefa,
    hora: hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    id: Date.now().toString(), 
  };

  try {
    const tarefasString = await AsyncStorage.getItem('tarefas');
    const tarefas = tarefasString ? JSON.parse(tarefasString) : [];

    tarefas.push(novaTarefa);

    await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));

    alert("Tarefa salva com sucesso!");
    setTarefa(""); 
    router.push("")
  } catch (error) {
    console.error("Erro ao salvar tarefa:", error);
    alert("Não foi possível salvar a tarefa.");
  }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#111" />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Cadastre uma tarefa</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Digite a tarefa..."
          style={styles.input}
          multiline={true}
          value={tarefa}
          onChangeText={setTarefa}
        />

        <TouchableOpacity style={styles.botaoHora} onPress={() => setMostrarPicker(true)}>
          <Ionicons name="time-outline" size={20} color="#007AFF" />
          <Text style={styles.textoHora}>
            {hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarTarefa}>
        <Text style={styles.textoSalvar}>Salvar</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeHora}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    padding: 20,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: Platform.OS === "ios" ? 50 : 20,
    marginBottom: 10,
  },
  textoVoltar: {
    fontSize: 18,
    marginLeft: 5,
    color: "#111",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#111",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  botaoHora: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textoHora: {
    fontSize: 16,
    marginLeft: 8,
    color: "#007AFF",
    fontWeight: "500",
  },
  botaoSalvar: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  textoSalvar: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
