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

## Implementacoes da Atividade

### Exercicio 2: NativeWind no componente Task

O componente [`src/components/Task.tsx`](src/components/Task.tsx) foi refatorado para usar NativeWind no lugar da API classica de estilos.

Ele possui:

- fundo branco;
- bordas arredondadas;
- sombra leve;
- padding interno;
- organizacao em linha com `flex-row`;
- texto e botoes separados pelas extremidades.

### Exercicio 3: Gluestack-UI nos formularios

O Gluestack-UI foi inicializado no layout raiz em [`app/_layout.tsx`](app/_layout.tsx).

Na tela principal, o formulario em [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx) usa:

- `Input`
- `InputField`
- `Button`
- `ButtonText`

### Exercicio 4: Confirmacao de exclusao

A exclusao de tarefas agora passa por um `AlertDialog` do Gluestack-UI.

Antes de remover uma tarefa, o app exibe a mensagem:

```text
Tem certeza que deseja excluir esta tarefa?
```

A requisicao para o backend e a remocao da lista acontecem apenas apos a confirmacao.

### Exercicio 5: Empty State

O componente [`src/components/EmptyState.tsx`](src/components/EmptyState.tsx) e exibido quando a lista de tarefas esta vazia.

Ele combina:

- `View` com classes do NativeWind para centralizacao;
- `Heading` e `Text` do Gluestack-UI para tipografia.

## Estrutura Principal

```text
app/
  _layout.tsx
  (tabs)/
    index.tsx
    settings.tsx
  task/
    [id].tsx

src/
  components/
    EmptyState.tsx
    Task.tsx
  services/
    api.ts
  store/
    useAuthStore.ts
    useTaskStore.ts
```

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
