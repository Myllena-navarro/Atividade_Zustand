import { useEffect, useState } from 'react';

import { router } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

import { Task, useTaskStore } from '../../src/store/useTaskStore';

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

  const toggleTask = useTaskStore(
    (state) => state.toggleTask
  );

  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleAddTask() {
    if (!text.trim()) return;

    await addTask(text.trim());

    setText('');
  }

  function openTask(task: Task) {
    router.push(`/task/${task._id}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Minhas tarefas
      </Text>

      <View style={styles.form}>
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
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) =>
          item._id.toString()
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Pressable
              style={[
                styles.checkbox,
                item.completed &&
                  styles.checkboxCompleted,
              ]}
              onPress={() =>
                toggleTask(item._id)
              }
            >
              <Text style={styles.checkboxText}>
                {item.completed ? 'OK' : ''}
              </Text>
            </Pressable>

            <Pressable
              style={styles.taskContent}
              onPress={() => openTask(item)}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed &&
                    styles.taskTextCompleted,
                ]}
              >
                {item.text}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
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
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhuma tarefa cadastrada.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 28,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  form: {
    marginBottom: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2F80ED',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  list: {
    paddingBottom: 24,
  },

  task: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxCompleted: {
    backgroundColor: '#2F80ED',
  },

  checkboxText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  taskContent: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  taskText: {
    fontSize: 16,
  },

  taskTextCompleted: {
    color: '#777',
    textDecorationLine: 'line-through',
  },

  deleteButton: {
    padding: 6,
  },

  delete: {
    color: 'red',
    fontWeight: 'bold',
  },

  empty: {
    color: '#777',
    textAlign: 'center',
    marginTop: 32,
  },
});
