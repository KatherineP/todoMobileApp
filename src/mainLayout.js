import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { THEME } from './theme';
import { NavBar } from './components/NavBar';
import { MainScreen } from './screens/mainScreen';
import { TodoScreen } from './screens/todoScreen';
import { TodoContext } from './context/todo/todoContext';

export const MainLayout = () => {
  const { todoId } = useContext(TodoContext);

  return (
    <View style={styles.mainContainer}>
      <NavBar title="Todo App" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: THEME.PADDING_H,
    paddingVertical: 20,
    flex: 1,
  },
});
