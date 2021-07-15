import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ListItem from './Components/Middle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = { primary: "#26D0CE", white: "#fff" }



export default function App() {
  const [enteredtext, SetInputText] = useState("")
  const [Todo, setTodo] = useState(
    [

    ])

  const AddTodo = () =>{
    if(enteredtext.length > 0 ){
    const NewTodo = {
      id:Math.random(),
      task:enteredtext,
      iscomplete:false,
    }
    setTodo([...Todo, NewTodo])
    SetInputText("")}
    else{
      Alert.alert("Error","Please Enter Text")
    }
  }

  const ClearAll = () =>{
    Alert.alert("Sure?","Are you sure you wanna delete entire Todo List?"
    ,[{
      text:'Yes',
      onPress:()=>setTodo([]),
    },
    {
      text:'No'
    }
  ])
    
  }


  const SaveTodoToDevice = async (todos)=>{
    try {
      const StringifyAllTodos = JSON.stringify(todos)
      await AsyncStorage.setItem('todos', StringifyAllTodos)
    } catch (e) {
      // saving error
    }
  }

  const GetTodosFromDevice = async () => {
    try {
      const value = await AsyncStorage.getItem('todos')
      console.log(JSON.parse(value))
      console.log(value)
      if(value !== null) {
        setTodo(JSON.parse(value))
      }
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(()=>{
    GetTodosFromDevice();
  },[])

  useEffect(()=>{
    SaveTodoToDevice(Todo)
  },[Todo])



  return (
    <SafeAreaView style={styles.TopContainer}>
      <View style={styles.header}>
        <Text style={styles.HeaderNameText}>MY App</Text>
        <TouchableOpacity onPress={ClearAll}>
          <Entypo name="trash" size={30} color="#FF512F" />
        </TouchableOpacity>
      </View>


      {/* ADD THE MIDDLE PART HERE */}

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={Todo}
        renderItem={({ item }) => <ListItem todo={item} allTodos={Todo} settingfunc={setTodo}/>}
      />


      {/* ADD THE MIDDLE PART HERE */}

      <View style={styles.footer}>
        <View style={styles.FooterInput}>
          <TextInput
          style={styles.TextInputMargin}
          placeholder="Enter Todo"
          onChangeText={text => SetInputText(text)}
          defaultValue={enteredtext}
          />
        </View>
        <TouchableOpacity onPress={AddTodo}>
          <View style={styles.FooterIcon}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderNameText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "bold"
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.white,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  FooterInput: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    borderRadius: 20,
    marginRight: 20,
    paddingHorizontal: 30,
  },
  TextInputMargin: {
    marginVertical: 10,
  },
  FooterIcon: {
    height: 50,
    width: 50,
    backgroundColor: "#40E0D0",
    borderRadius: 30,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  }

});
