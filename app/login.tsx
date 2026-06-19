import {
  Link,
  router,
} from 'expo-router';

import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useAuthStore } from '../src/store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] =
    useState<string | null>(null);

  const login = useAuthStore(
    (state) => state.login
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  const authError = useAuthStore(
    (state) => state.error
  );

  async function handleLogin() {
    const normalizedEmail = email.trim();

    if (
      !normalizedEmail ||
      !password
    ) {
      setFormError(
        'Informe e-mail e senha.'
      );
      return;
    }

    setFormError(null);
    setEmail(normalizedEmail);

    const success = await login({
      email: normalizedEmail,
      password,
    });

    if (success) {
      router.replace('/');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Entrar
      </Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        style={[
          styles.button,
          isLoading &&
            styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        )}
      </Pressable>

      {formError || authError ? (
        <Text style={styles.error}>
          {formError || authError}
        </Text>
      ) : null}

      <Link
        href="/signup"
        style={styles.link}
      >
        Nao tem uma conta? Cadastre-se
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 48,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#2F80ED',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  link: {
    color: '#2F80ED',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 14,
  },
});
