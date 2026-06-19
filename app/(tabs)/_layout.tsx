import { Tabs } from 'expo-router';

export default function TabLayout() {
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
