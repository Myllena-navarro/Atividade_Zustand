import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonText,
  Heading,
  Text,
} from '@gluestack-ui/themed';

import {
  Redirect,
  router,
  useLocalSearchParams,
} from 'expo-router';

import { View } from 'react-native';

import { useAuthStore } from '../../src/store/useAuthStore';
import { useTaskStore } from '../../src/store/useTaskStore';

export default function TaskDetails() {
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const sessionToken = useAuthStore(
    (state) => state.sessionToken
  );

  const hasHydrated = useAuthStore(
    (state) => state.hasHydrated
  );

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const task = useTaskStore(
    (state) =>
      state.tasks.find(
        (item) =>
          item._id.toString() === id
      )
  );

  const toggleTask = useTaskStore(
    (state) => state.toggleTask
  );

  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  if (
    hasHydrated &&
    !sessionToken
  ) {
    return <Redirect href="/login" />;
  }

  if (!task) {
    return (
      <View className="flex-1 bg-white px-5 pt-7">
        <Heading size="2xl">
          Tarefa nao encontrada
        </Heading>
      </View>
    );
  }

  const selectedTask = task;

  async function handleDeleteTask() {
    setShowDeleteDialog(false);
    await deleteTask(selectedTask._id);
    router.replace('/');
  }

  return (
    <View className="flex-1 bg-white px-5 pt-7">
      <Heading
        size="2xl"
        color="$textDark900"
        mb="$5"
      >
        Detalhes da tarefa
      </Heading>

      <View className="border-b border-gray-200 py-3.5">
        <Text
          size="sm"
          color="$textLight600"
          mb="$1"
        >
          Descricao
        </Text>
        <Text
          size="lg"
          color="$textDark900"
        >
          {selectedTask.text}
        </Text>
      </View>

      <View className="border-b border-gray-200 py-3.5">
        <Text
          size="sm"
          color="$textLight600"
          mb="$1"
        >
          Status
        </Text>
        <Text
          size="md"
          color="$textDark900"
          fontWeight="$bold"
        >
          {selectedTask.completed
            ? 'Concluida'
            : 'Pendente'}
        </Text>
      </View>

      {selectedTask.dueDate ? (
        <View className="border-b border-gray-200 py-3.5">
          <Text
            size="sm"
            color="$textLight600"
            mb="$1"
          >
            Prazo
          </Text>
          <Text
            size="md"
            color="$textDark900"
            fontWeight="$bold"
          >
            {new Date(
              selectedTask.dueDate
            ).toLocaleDateString()}
          </Text>
        </View>
      ) : null}

      <View className="mt-6 gap-3">
        <Button
          action="primary"
          onPress={() =>
            toggleTask(selectedTask._id)
          }
        >
          <ButtonText>
            {selectedTask.completed
              ? 'Marcar como pendente'
              : 'Marcar como concluida'}
          </ButtonText>
        </Button>

        <Button
          variant="outline"
          action="negative"
          onPress={() =>
            setShowDeleteDialog(true)
          }
        >
          <ButtonText>
            Excluir tarefa
          </ButtonText>
        </Button>
      </View>

      <AlertDialog
        isOpen={showDeleteDialog}
        onClose={() =>
          setShowDeleteDialog(false)
        }
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">
              Excluir tarefa
            </Heading>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Tem certeza que deseja excluir esta tarefa?
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() =>
                setShowDeleteDialog(false)
              }
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>

            <Button
              action="negative"
              onPress={handleDeleteTask}
            >
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
