import { TaskData } from '@/components/Kanban/KanbanModal/KanbanModal'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Tarefa } from '../types/tarefa'

const TASKS_PATH = 'tarefas'

export type User = {
  id_usuario: number
  nome: string
  sobrenome: string
  email: string
  senha: string
  lgpd: boolean
}

export type UserResponse = {
  user: User
  token: string
}

export type LoginRequest = {
  email: string
  password: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: '/',
    baseUrl: 'http://localhost:8080/',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }
    //   return headers
    // },
  }),
  endpoints: builder => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<User, User>({
      query: arg => {
        console.log('oi', arg)
        return {
          url: 'signup',
          method: 'POST',
        }
      },
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
    getTasks: builder.query<Tarefa[], void>({
      query: () => TASKS_PATH,
    }),
    getTaskById: builder.query<Tarefa, number>({
      query: tarefa_id => `${TASKS_PATH}/${tarefa_id}`,
    }),
    createTask: builder.mutation<TaskData, {data: TaskData}>({
      query: ({ data }) => ({
        url: TASKS_PATH,
        method: 'POST',
        body: data,
      }),
    }),
    updateTask: builder.mutation<Tarefa, { tarefa_id: number; data: Partial<Tarefa> }>({
      query: ({ tarefa_id, data }) => ({
        url: `${TASKS_PATH}/${tarefa_id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteTask: builder.mutation<void, { tarefa_id: number }>({
      query: ({ tarefa_id }) => ({
        url: `${TASKS_PATH}/${tarefa_id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useProtectedMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation
} = api
