import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = { primary: "#26D0CE", white: "#fff" }


function ListItem({ todo, allTodos, settingfunc }) {


    const MarkTodoDone = (todo_id)=>{
        const NewTodoList = allTodos.map((item)=>{
            if(item.id===todo_id){
                return {...item, iscomplete:true}
            }
            return item
        })
        settingfunc(NewTodoList)
    }

    const DeleteTodo = (todo_id)=>{
        const NewTodoList = allTodos.filter(item => item.id != todo_id);
        settingfunc(NewTodoList);
    }

    return (
        <View style={styles.ListItem}>
            <View style={{ flex: 1 }}>
                <Text
                    style={[styles.ListText, { textDecorationLine: todo?.iscomplete ? "line-through" : "none" }]}>
                    {todo?.task}
                </Text>
            </View>

            {/* Render Done Button Only When Its Not Complete */}
            {
                !todo?.iscomplete && (
                    <TouchableOpacity style={[styles.ActionIcon]} onPress={()=>MarkTodoDone(todo.id)}>
                        <MaterialIcons name="done-outline" size={25} color="black" />
                    </TouchableOpacity>
                )
            }

            <TouchableOpacity style={[styles.ActionIcon]} onPress={()=>DeleteTodo(todo.id)}>
                <MaterialCommunityIcons name="delete-forever" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}

export default ListItem


const styles = StyleSheet.create({
    ListItem: {
        padding: 20,
        backgroundColor: COLORS.white,
        flexDirection: "row",
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
    ListText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black"

    },
    ActionIcon: {
        height: 25,
        width: 25,

        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 5,
        borderRadius: 3,
    },

})