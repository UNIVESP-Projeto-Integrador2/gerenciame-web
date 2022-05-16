import { useGetTasksQuery } from '@/services/api'
import { Tarefa } from '@/types/tarefa'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getWeek } from 'date-fns'
import { DropResult } from 'react-beautiful-dnd'
import {
  ColumnProps,
  formatWeekTasks,
  parseDbTasksToTasks,
  parseDbTaskToTask,
  Task,
} from '@/utils/formatTasks'

export const useKanban = () => {
  const [columns, setColumns] = useState<ColumnProps[]>([])
  const { isOpen: addTaskIsOpen, onOpen: addTaskOnOpen, onClose: addTaskOnClose } = useDisclosure()
  const { data, isLoading, error } = useGetTasksQuery()
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()))
  const [allTasks, setAllTasks] = useState<Task[]>([])

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const parsedTasks = parseDbTasksToTasks((data as any).tarefas as Tarefa[])
      setAllTasks(parsedTasks)
      const formattedColumns = formatWeekTasks(currentWeek, parsedTasks)
      setColumns(formattedColumns)
    }
  }, [currentWeek, data])

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      console.error('no destination')
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = columns.find(column => `col-${column.name}` === source.droppableId)
    const finish = columns.find(column => `col-${column.name}` === destination.droppableId)

    if (!start || !finish) return

    if (start.name === finish.name) {
      const newTasks: Task[] = Array.from(start.tasks)

      const swapTask = newTasks[source.index]
      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, swapTask)

      const newColumnsState1 = columns.map(column => {
        if (column.id === start.id) {
          column.tasks = newTasks
        }
        return column
      })

      setColumns([...newColumnsState1])
      return
    }

    const startTasks: Task[] = Array.from(start.tasks)
    const [item] = startTasks.splice(source.index, 1)

    const finishTasks: Task[] = Array.from(finish.tasks)
    finishTasks.splice(destination.index, 0, item)

    const newColumnsState = columns.map(column => {
      if (column.id === start.id) {
        column.tasks = startTasks
      } else if (column.id === finish.id) {
        column.tasks = finishTasks
      }
      return column
    })
    setColumns([...newColumnsState])
  }

  const addTask = (task: Tarefa) => {
    addTaskOnClose()

    const newTask = parseDbTaskToTask(task)
    const newTasks = [...allTasks, newTask]
    setAllTasks(newTasks)

    const updatedColumns = formatWeekTasks(currentWeek, newTasks)
    setColumns(updatedColumns)
  }

  const removeTask = (taskId: number) => {
    const newTasks = allTasks.filter(task => task.id_tarefa !== taskId)
    setAllTasks(newTasks)

    const updatedColumns = formatWeekTasks(currentWeek, newTasks)
    setColumns(updatedColumns)
  }

  // TODO: editar
  const editTask = (taskId: number, newTask) => {
    const updatedColumns = columns.map(column => {
      return Object.assign({}, column, {
        taskIds: column.tasks.map(task => {
          if (task.id_tarefa === taskId) {
            task = newTask
          }
          return task
        }),
      })
    })
    setColumns(updatedColumns)
  }

  const handleChangeWeek = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      setCurrentWeek(prev => prev - 1)
    } else if (action === 'next') {
      setCurrentWeek(prev => prev + 1)
    }
  }

  return {
    onDragEnd,
    addTask,
    removeTask,
    editTask,
    columns,
    addTaskIsOpen,
    addTaskOnOpen,
    addTaskOnClose,
    handleChangeWeek,
    isLoading,
    error,
  }
}
