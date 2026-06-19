import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="task/[id]"
        options={{
          title: 'Detalhes',
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: 'Entrar',
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          title: 'Cadastro',
        }}
      />
    </Stack>
  );
}
