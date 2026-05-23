import { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useTaskStore } from '../src/store/useTaskStore';

export default function Home() {
  const [text, setText] = useState('');

  const tasks = useTaskStore(
    (state) => state.tasks
  );

  const fetchTasks = useTaskStore(
    (state) => state.fetchTasks
  );

  const addTask = useTaskStore(
    (state) => state.addTask
  );

  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleAddTask() {
    if (!text.trim()) return;

    await addTask(text);

    setText('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Minhas tarefas
      </Text>

      <TextInput
        placeholder="Digite uma tarefa"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={handleAddTask}
      >
        <Text style={styles.buttonText}>
          Adicionar
        </Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) =>
          item._id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>
              {item.text}
            </Text>

            <Pressable
              onPress={() =>
                deleteTask(item._id)
              }
            >
              <Text style={styles.delete}>
                Excluir
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2F80ED',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },

  taskText: {
    fontSize: 16,
  },

  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});