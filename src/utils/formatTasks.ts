import { getDay, getWeek } from 'date-fns'
import { groupBy } from 'ramda'
import { Tarefa } from '@/types/tarefa'
import { Weekdays } from '@/types/weekdays'

export type Task = Tarefa & {
  dayOfWeek: number
  weekOfYear: number
}

export type ColumnProps = {
  id: number
  name: string
  tasks: Task[]
}

export const parseDbTasksToTasks = (allTasks: Tarefa[]) => allTasks.map(parseDbTaskToTask)

export const parseDbTaskToTask = (task: Tarefa) => ({
  ...task,
  dayOfWeek: getDay(new Date(task.data_inicial)),
  weekOfYear: getWeek(new Date(task.data_limite)),
})

export const getGroupedTasksByWeekOfTheYear = (tasks: Task[]) =>
  groupBy(task => String(task.weekOfYear), tasks)

export const getGroupedTasksByDayOfTheWeek = (tasks: Task[]) =>
  groupBy(task => String(task.dayOfWeek), tasks)

export const format = (groupedTasksByDayOfTheWeek: Record<string, Task[]>): ColumnProps[] => {
  const formattedColumns: ColumnProps[] = Object.entries(groupedTasksByDayOfTheWeek).map(
    ([key, value]) => {
      return {
        id: Number(key),
        name: Weekdays[key],
        tasks: value,
      }
    },
  )

  return Object.entries(Weekdays).map(([key, value]) => {
    const foundDay = formattedColumns.find(({ id }) => id === Number(key))
    return foundDay
      ? foundDay
      : {
          id: Number(key),
          name: value,
          tasks: [] as Task[],
        }
  })
}

export const formatWeekTasks = (currentWeek: number, allTasks: Task[]) => {
  const groupedTasksByWeekOfTheYear: Record<string, Task[]> =
    getGroupedTasksByWeekOfTheYear(allTasks)

  const groupedTasksByDayOfTheWeek: Record<string, Task[]> = getGroupedTasksByDayOfTheWeek(
    groupedTasksByWeekOfTheYear[String(currentWeek)],
  )

  return format(groupedTasksByDayOfTheWeek)
}
