# 📱 Tasks App - Zustand + Expo Router

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido como atividade prática de React Native utilizando Expo.
O objetivo principal foi evoluir a arquitetura da aplicação de tarefas, substituindo gerenciamento local de estado por uma solução global moderna utilizando Zustand.

Além disso, o projeto implementa navegação com Expo Router, persistência local com AsyncStorage e organização baseada em componentes.

---

# 🎯 Objetivos da Atividade

* Implementar gerenciamento global de estado
* Eliminar prop drilling
* Utilizar Zustand para controle centralizado
* Persistir tarefas localmente
* Implementar navegação com Expo Router
* Utilizar navegação Stack e Tabs
* Melhorar organização e escalabilidade do projeto

---

# 🛠 Tecnologias Utilizadas

* React Native
* Expo
* TypeScript
* Zustand
* Expo Router
* AsyncStorage

---

# 📂 Estrutura do Projeto

```bash
app/
 ├── _layout.tsx
 ├── index.tsx
 ├── settings.tsx
 └── task/
      └── [id].tsx

src/
 ├── components/
 ├── store/
 │    └── useTaskStore.ts
 └── styles/
```

---

# 🧠 Gerenciamento Global com Zustand

O Zustand foi utilizado para centralizar o gerenciamento das tarefas da aplicação.

A store contém:

* lista de tarefas
* adição de tarefas
* remoção de tarefas
* atualização de status
* persistência local

Exemplo:

```tsx
const tasks = useTaskStore((state) => state.tasks);
```

---

# 💾 Persistência com AsyncStorage

A persistência foi implementada utilizando:

* `persist`
* `createJSONStorage`
* `AsyncStorage`

Isso permite que as tarefas continuem salvas mesmo após fechar o aplicativo.

---

# 🧭 Navegação com Expo Router

O projeto utiliza:

* Tabs Navigation
* Stack Navigation
* Rotas dinâmicas

Exemplo de rota dinâmica:

```bash
/task/[id].tsx
```

---

# 📱 Funcionalidades

✅ Adicionar tarefas
✅ Remover tarefas
✅ Marcar tarefas como concluídas
✅ Persistência local
✅ Navegação entre telas
✅ Tela de detalhes da tarefa
✅ Estado global com Zustand
✅ Navegação com Expo Router

---

# 🚀 Como Executar o Projeto

## 1. Clonar repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Entrar na pasta

```bash
cd nome-do-projeto
```

---

## 3. Instalar dependências

```bash
npm install
```

---

## 4. Executar projeto

```bash
npx expo start
```

---

# 📦 Dependências Instaladas

```bash
npm install zustand
npx expo install @react-native-async-storage/async-storage
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

---

# 🎓 Conceitos Trabalhados

* Estado Global
* Hooks
* Persistência de Dados
* Arquitetura React Native
* Navegação Mobile
* Componentização
* Performance com Selectors
* Organização de Projeto

---

# 👩‍💻 Autora

Myllena Navarro Lins

---

# 📌 Observação

Este projeto foi desenvolvido para fins acadêmicos como atividade prática da disciplina de desenvolvimento mobile.
