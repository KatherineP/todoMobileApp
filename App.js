import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';

import * as Font from 'expo-font';
import { TodoState } from './src/context/todo/todoState';
import { MainLayout } from './src/mainLayout';

async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  // const [todoId, setTodoId] = useState(null);
  // const [todos, setTodos] = useState([{ id: 1, title: 'learn React Native' }]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TodoState>
      <MainLayout />
    </TodoState>
  );
}
