import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';

import {
  persist,
  createJSONStorage,
} from 'zustand/middleware';

import { api } from '../services/api';

export interface Task {
  _id: number;
  text: string;
  dueDate?: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];

  addTask: (
    title: string
  ) => Promise<void>;

  fetchTasks: () => Promise<void>;

  toggleTask: (
    id: number
  ) => Promise<void>;

  deleteTask: (
    id: number
  ) => Promise<void>;
}

export const useTaskStore =
  create<TaskState>()(
    persist(
      (set) => ({
        tasks: [],

        fetchTasks: async () => {
          try {
            const response =
              await api.get('/');

            set({
              tasks: response.data,
            });
          } catch (error) {
            console.log(error);
          }
        },

        addTask: async (title) => {
          try {
            const response =
              await api.post('/save', {
                text: title,
                completed: false,
              });

            set((state) => ({
              tasks: [
                ...state.tasks,
                response.data,
              ],
            }));
          } catch (error) {
            console.log(error);
          }
        },

        toggleTask: async (id) => {
          try {
            const currentTask =
              useTaskStore
                .getState()
                .tasks.find(
                  (task) =>
                    task._id === id
                );

            if (!currentTask) return;

            await api.post('/update', {
              _id: id,
              text: currentTask.text,
              dueDate: currentTask.dueDate,
              completed:
                !currentTask.completed,
            });

            set((state) => ({
              tasks: state.tasks.map(
                (task) =>
                  task._id === id
                    ? {
                        ...task,
                        completed:
                          !task.completed,
                      }
                    : task
              ),
            }));
          } catch (error) {
            console.log(error);
          }
        },

        deleteTask: async (id) => {
          try {
            await api.post('/delete', {
              _id: id,
            });

            set((state) => ({
              tasks: state.tasks.filter(
                (task) =>
                  task._id !== id
              ),
            }));
          } catch (error) {
            console.log(error);
          }
        },
      }),

      {
        name: 'tasks-storage',

        storage: createJSONStorage(
          () => AsyncStorage
        ),
      }
    )
  );
