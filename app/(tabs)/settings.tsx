import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTaskStore } from '../../src/store/useTaskStore';

export default function Settings() {
  const totalTasks = useTaskStore(
    (state) => state.tasks.length
  );

  const completedTasks = useTaskStore(
    (state) =>
      state.tasks.filter(
        (task) => task.completed
      ).length
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Configuracoes
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>
          Total de tarefas
        </Text>
        <Text style={styles.value}>
          {totalTasks}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Tarefas concluidas
        </Text>
        <Text style={styles.value}>
          {completedTasks}
        </Text>
      </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  label: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },

  value: {
    color: '#111',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
