import { useState } from 'react';

import { AntDesign, Feather } from '@expo/vector-icons';

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
  Text as GluestackText,
} from '@gluestack-ui/themed';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

interface TaskData {
  _id: number | string;
  text: string;
  completed?: boolean;
}

interface TaskProps {
  task: TaskData;
  onOpen?: () => void;
  onToggle?: () => void;
  updateMode?: () => void;
  deleteTask: () => void | Promise<void>;
}

export default function Task({
  task,
  onOpen,
  onToggle,
  updateMode,
  deleteTask,
}: TaskProps) {
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  async function confirmDelete() {
    setShowDeleteDialog(false);
    await deleteTask();
  }

  const handleOpen = onOpen ?? updateMode;

  return (
    <>
      <View className="mt-3 flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        {onToggle && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              task.completed
                ? 'Marcar tarefa como pendente'
                : 'Marcar tarefa como concluida'
            }
            className={`mr-3 h-7 w-7 items-center justify-center rounded-md border border-blue-500 ${
              task.completed ? 'bg-blue-500' : 'bg-white'
            }`}
            onPress={onToggle}
          >
            <Text className="text-[10px] font-bold text-white">
              {task.completed ? 'OK' : ''}
            </Text>
          </Pressable>
        )}

        <Pressable
          accessibilityRole="button"
          className="flex-1"
          disabled={!handleOpen}
          onPress={handleOpen}
        >
          <Text
            className={`text-base ${
              task.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-800'
            }`}
          >
            {task.text}
          </Text>
        </Pressable>

        <View className="ml-3 flex-row items-center gap-3">
          {handleOpen && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Editar tarefa"
              className="h-9 w-9 items-center justify-center rounded-full bg-gray-100"
              onPress={handleOpen}
            >
              <Feather
                name="edit"
                size={18}
                color="#374151"
              />
            </Pressable>
          )}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Excluir tarefa"
            className="h-9 w-9 items-center justify-center rounded-full bg-red-50"
            onPress={() =>
              setShowDeleteDialog(true)
            }
          >
            <AntDesign
              name="delete"
              size={18}
              color="#ef4444"
            />
          </Pressable>
        </View>
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
            <GluestackText>
              Tem certeza que deseja excluir esta tarefa?
            </GluestackText>
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
              onPress={confirmDelete}
            >
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
