import { useEffect } from 'react';

import {
  router,
  Stack,
  useSegments,
} from 'expo-router';

import { useAuthStore } from '../src/store/useAuthStore';

export default function Layout() {
  const segments = useSegments();

  const sessionToken = useAuthStore(
    (state) => state.sessionToken
  );

  const hasHydrated = useAuthStore(
    (state) => state.hasHydrated
  );

  useEffect(() => {
    if (!hasHydrated) return;

    const currentRoute = segments[0];
    const isAuthRoute =
      currentRoute === 'login' ||
      currentRoute === 'signup';

    if (
      !sessionToken &&
      !isAuthRoute
    ) {
      router.replace('/login');
      return;
    }

    if (
      sessionToken &&
      isAuthRoute
    ) {
      router.replace('/');
    }
  }, [
    hasHydrated,
    segments,
    sessionToken,
  ]);

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
