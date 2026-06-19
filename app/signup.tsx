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

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] =
    useState<string | null>(null);

  const signup = useAuthStore(
    (state) => state.signup
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  const authError = useAuthStore(
    (state) => state.error
  );

  async function handleSignup() {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (
      !normalizedName ||
      !normalizedEmail ||
      !password
    ) {
      setFormError(
        'Informe nome, e-mail e senha.'
      );
      return;
    }

    setFormError(null);
    setName(normalizedName);
    setEmail(normalizedEmail);

    const success = await signup({
      name: normalizedName,
      email: normalizedEmail,
      password,
    });

    if (success) {
      router.replace('/login');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Criar Conta
      </Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        style={styles.input}
      />

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
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Criar Conta
          </Text>
        )}
      </Pressable>

      {formError || authError ? (
        <Text style={styles.error}>
          {formError || authError}
        </Text>
      ) : null}

      <Link
        href="/login"
        style={styles.link}
      >
        Ja tem uma conta? Entrar
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
