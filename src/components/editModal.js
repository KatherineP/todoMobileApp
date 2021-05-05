import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput, Alert } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './ui/appButton';
import { Todo } from './Todo';

export const EditModal = ({ visible, onCancel, todo, onSave }) => {
  const [inputValue, setInputValue] = useState(todo.title);
  const saveHandler = () => {
    if (inputValue.trim().length < 3) {
      Alert.alert(
        'Error!',
        `Task title should be longer than 3 characters. Now it has only ${
          inputValue.trim().length
        } characters.`
      );
    } else {
      onSave(inputValue, todo.id);
    }
  };

  const onCancelHandler = () => {
    setInputValue(todo.title);
    onCancel();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="type todo item..."
          autoCorrect={false}
          autoCapitalize="none"
          maxLength={64}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <View style={styles.buttons}>
          <AppButton onPress={onCancelHandler} color={THEME.DANGER_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
  },
});
