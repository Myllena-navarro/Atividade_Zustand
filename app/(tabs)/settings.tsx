import { router } from 'expo-router';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useAuthStore } from '../../src/store/useAuthStore';
import { useTaskStore } from '../../src/store/useTaskStore';

export default function Settings() {
  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

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
          Usuario
        </Text>
        <Text style={styles.value}>
          {user?.name ||
            user?.email ||
            'Sessao ativa'}
        </Text>
      </View>

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

      <Pressable
        style={styles.logoutButton}
        onPress={() => {
          logout();
          router.replace('/login');
        }}
      >
        <Text style={styles.logoutText}>
          Sair
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

  logoutButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 28,
  },

  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
