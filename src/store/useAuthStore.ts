import AsyncStorage from '@react-native-async-storage/async-storage';

import { AxiosError } from 'axios';

import { create } from 'zustand';

import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

import { api } from '../services/api';

interface User {
  id?: string | number;
  name?: string;
  email: string;
}

interface AuthResponse {
  user?: User;
  sessionToken?: string;
  token?: string;
  accessToken?: string;
}

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  sessionToken: string | null;
  isLoading: boolean;
  error: string | null;
  signup: (
    input: SignupInput
  ) => Promise<boolean>;
  login: (
    input: LoginInput
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

function getErrorMessage(error: unknown) {
  const requestError =
    error as AxiosError<{
      message?: string;
      error?: string;
    }>;

  return (
    requestError.response?.data?.message ||
    requestError.response?.data?.error ||
    requestError.message ||
    'Nao foi possivel concluir a autenticacao.'
  );
}

function getSessionToken(
  response: AuthResponse
) {
  return (
    response.sessionToken ||
    response.token ||
    response.accessToken ||
    null
  );
}

function applySessionToken(
  sessionToken: string | null
) {
  if (sessionToken) {
    api.defaults.headers.common.Authorization =
      `Bearer ${sessionToken}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        sessionToken: null,
        isLoading: false,
        error: null,

        signup: async (input) => {
          set({
            isLoading: true,
            error: null,
          });

          try {
            const response =
              await api.post<AuthResponse>(
                '/signup',
                input
              );

            const sessionToken =
              getSessionToken(response.data);

            applySessionToken(sessionToken);

            set({
              user:
                response.data.user || {
                  name: input.name,
                  email: input.email,
                },
              sessionToken,
              isLoading: false,
            });

            return true;
          } catch (error) {
            set({
              error: getErrorMessage(error),
              isLoading: false,
            });

            return false;
          }
        },

        login: async (input) => {
          set({
            isLoading: true,
            error: null,
          });

          try {
            const response =
              await api.post<AuthResponse>(
                '/login',
                input
              );

            const sessionToken =
              getSessionToken(response.data);

            if (!sessionToken) {
              throw new Error(
                'A API nao retornou um sessionToken.'
              );
            }

            applySessionToken(sessionToken);

            set({
              user:
                response.data.user || {
                  email: input.email,
                },
              sessionToken,
              isLoading: false,
            });

            return true;
          } catch (error) {
            set({
              error: getErrorMessage(error),
              isLoading: false,
            });

            return false;
          }
        },

        logout: () => {
          applySessionToken(null);

          set({
            user: null,
            sessionToken: null,
            error: null,
          });
        },

        clearError: () => {
          set({
            error: null,
          });
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(
          () => AsyncStorage
        ),
        onRehydrateStorage: () => (
          state
        ) => {
          applySessionToken(
            state?.sessionToken || null
          );
        },
        partialize: (state) => ({
          user: state.user,
          sessionToken:
            state.sessionToken,
        }),
      }
    )
  );
