import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../components/ui/appText';
import { TodoContext } from '../context/todo/todoContext';

export const Todo = ({ todo, onRemove }) => {
  const { changeScreen } = useContext(TodoContext);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => changeScreen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <View style={styles.item}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
});
