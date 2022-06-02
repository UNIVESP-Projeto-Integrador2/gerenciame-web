import React from 'react'
import { KanbanTask } from '../KanbanTask'
import { Droppable } from 'react-beautiful-dnd'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { ColumnProps, Task } from '@/utils/formatTasks'

export type KanbanColumnProps = ColumnProps & {
  removeTask: (id: number) => void
  editTask: (id: number, newTask: Task) => void
}

const KanbanColumn = ({ name, tasks, removeTask, editTask }: KanbanColumnProps) => {
  return (
    <VStack
      minH="700px"
      align="stretch"
      backgroundColor="gray.100"
      minW="120px"
      borderRadius={4}
      textAlign="center"
      justifyContent="space-between"
      w="170px"
      p={4}
    >
      <Heading size="md">{name}</Heading>
      <Text fontSize="0.8rem">dia/mes</Text>
      <Droppable droppableId={`col-${name}`}>
        {provided => (
          <Box minH="700px" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map(task => (
              <KanbanTask
                key={task.id_tarefa}
                task={task}
                removeTask={removeTask}
                editTask={editTask}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </VStack>
  )
}

export default KanbanColumn
