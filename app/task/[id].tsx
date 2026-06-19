import {
  Redirect,
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useTaskStore } from '../../src/store/useTaskStore';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function TaskDetails() {
  const sessionToken = useAuthStore(
    (state) => state.sessionToken
  );

  const hasHydrated = useAuthStore(
    (state) => state.hasHydrated
  );

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const task = useTaskStore(
    (state) =>
      state.tasks.find(
        (item) =>
          item._id.toString() === id
      )
  );

  const toggleTask = useTaskStore(
    (state) => state.toggleTask
  );

  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  if (
    hasHydrated &&
    !sessionToken
  ) {
    return <Redirect href="/login" />;
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Tarefa nao encontrada
        </Text>
      </View>
    );
  }

  const selectedTask = task;

  async function handleDeleteTask() {
    await deleteTask(selectedTask._id);
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Detalhes da tarefa
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>
          Descricao
        </Text>
        <Text style={styles.description}>
          {task.text}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Status
        </Text>
        <Text style={styles.status}>
          {task.completed
            ? 'Concluida'
            : 'Pendente'}
        </Text>
      </View>

      {task.dueDate ? (
        <View style={styles.section}>
          <Text style={styles.label}>
            Prazo
          </Text>
          <Text style={styles.status}>
            {new Date(
              task.dueDate
            ).toLocaleDateString()}
          </Text>
        </View>
      ) : null}

      <Pressable
        style={styles.primaryButton}
        onPress={() =>
          toggleTask(task._id)
        }
      >
        <Text style={styles.primaryButtonText}>
          {task.completed
            ? 'Marcar como pendente'
            : 'Marcar como concluida'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={handleDeleteTask}
      >
        <Text style={styles.deleteButtonText}>
          Excluir tarefa
        </Text>
      </Pressable>
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

  section: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  label: {
    color: '#555',
    fontSize: 14,
    marginBottom: 6,
  },

  description: {
    color: '#111',
    fontSize: 18,
  },

  status: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold',
  },

  primaryButton: {
    backgroundColor: '#2F80ED',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },

  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
