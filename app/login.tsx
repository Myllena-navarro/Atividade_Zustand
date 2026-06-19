import { Link } from 'expo-router';

import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    setEmail(email.trim());
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
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </Pressable>

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
});
