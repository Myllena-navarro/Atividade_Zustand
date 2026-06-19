import { useEffect, useState } from 'react';

import {
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
} from '@gluestack-ui/themed';

import { router } from 'expo-router';

import {
  FlatList,
  View,
} from 'react-native';

import EmptyState from '../../src/components/EmptyState';
import TaskCard from '../../src/components/Task';
import {
  Task,
  useTaskStore,
} from '../../src/store/useTaskStore';

export default function Home() {
  const [text, setText] = useState('');

  const tasks = useTaskStore(
    (state) => state.tasks
  );

  const fetchTasks = useTaskStore(
    (state) => state.fetchTasks
  );

  const addTask = useTaskStore(
    (state) => state.addTask
  );

  const toggleTask = useTaskStore(
    (state) => state.toggleTask
  );

  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleAddTask() {
    const taskText = text.trim();

    if (!taskText) return;

    await addTask(taskText);
    setText('');
  }

  function openTask(task: Task) {
    router.push(`/task/${task._id}`);
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 px-5 pt-7">
        <Heading
          size="2xl"
          color="$textDark900"
          mb="$5"
        >
          Minhas tarefas
        </Heading>

        <View className="mb-5 gap-3">
          <Input
            variant="outline"
            size="md"
            bg="$white"
          >
            <InputField
              placeholder="Digite uma tarefa"
              value={text}
              onChangeText={setText}
              returnKeyType="done"
              onSubmitEditing={handleAddTask}
            />
          </Input>

          <Button
            action="primary"
            onPress={handleAddTask}
            isDisabled={!text.trim()}
          >
            <ButtonText>Adicionar</ButtonText>
          </Button>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) =>
            item._id.toString()
          }
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 24,
          }}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onOpen={() => openTask(item)}
              onToggle={() =>
                toggleTask(item._id)
              }
              deleteTask={() =>
                deleteTask(item._id)
              }
            />
          )}
          ListEmptyComponent={<EmptyState />}
        />
      </View>
    </View>
  );
}
