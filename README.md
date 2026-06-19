# Tasks Mobile

Aplicativo mobile de tarefas desenvolvido com React Native, Expo e TypeScript.

O projeto usa Expo Router para navegacao, Zustand para estado global, NativeWind para estilizar componentes com classes utilitarias e Gluestack-UI para componentes acessiveis de formulario e dialogos.

## Funcionalidades

- Login e cadastro de usuario.
- Listagem de tarefas.
- Adicao de novas tarefas.
- Marcacao de tarefa como concluida ou pendente.
- Tela de detalhes da tarefa.
- Exclusao com confirmacao via `AlertDialog`.
- Estado vazio quando nao ha tarefas cadastradas.
- Persistencia local com Zustand e AsyncStorage.

## Tecnologias

- React Native
- Expo
- Expo Router
- TypeScript
- Zustand
- AsyncStorage
- Axios
- NativeWind
- Tailwind CSS
- Gluestack-UI

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Ou use um alvo especifico:

```bash
npm run android
npm run ios
npm run web
```

## Backend

Este repositorio contem o front mobile. A API usada pelo app esta configurada em:

```text
src/services/api.ts
```

Por padrao, o app aponta para:

```text
http://192.168.10.40:5001
```

Se o backend estiver em outro endereco, ajuste o `baseURL` nesse arquivo.

## Scripts

```bash
npm start
npm run android
npm run ios
npm run web
```

## Validacao

Para verificar erros de TypeScript:

```bash
npx tsc --noEmit
```

## Autora

Myllena Navarro Lins

## Observacao

Projeto desenvolvido para fins academicos na disciplina de desenvolvimento mobile.
