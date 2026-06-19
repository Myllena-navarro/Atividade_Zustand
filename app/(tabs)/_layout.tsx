import {
  Redirect,
  Tabs,
} from 'expo-router';

import { useAuthStore } from '../../src/store/useAuthStore';

export default function TabLayout() {
  const sessionToken = useAuthStore(
    (state) => state.sessionToken
  );

  const hasHydrated = useAuthStore(
    (state) => state.hasHydrated
  );

  if (
    hasHydrated &&
    !sessionToken
  ) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Minhas Tarefas',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuracoes',
        }}
      />
    </Tabs>
  );
}
