import React, { useState, useContext } from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';
import { THEME } from '../theme';
import { AppCard } from '../components/ui/card';
import { EditModal } from '../components/editModal';
import { AppText } from '../components/ui/appText';
import { AppButton } from '../components/ui/appButton';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TodoContext } from '../context/todo/todoContext';

export const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const { todos, changeScreen, removeTodo, todoId, editTodo } = useContext(
    TodoContext
  );
  const todo = todos.find((i) => i.id === todoId);

  const saveHandler = async (title, id) => {
    await editTodo(title, id);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        todo={todo}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppText style={styles.title}>{todo.title}</AppText>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: Dimensions.get('window').width / 3,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
});
