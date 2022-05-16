import { createSlice } from '@reduxjs/toolkit'
import { Tarefa } from '@/types/tarefa'
import { api } from '../api'
import type { RootState } from '../store'

type TasksState = {
  tasks: Tarefa[]
}

const slice = createSlice({
  name: 'auth',
  initialState: { tasks: [] } as TasksState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.getTasks.matchFulfilled, (state, { payload }) => {
      state.tasks = payload
    })
  },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
