import { Link } from 'expo-router';

import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignup() {
    setName(name.trim());
    setEmail(email.trim());
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
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>
          Criar Conta
        </Text>
      </Pressable>

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
