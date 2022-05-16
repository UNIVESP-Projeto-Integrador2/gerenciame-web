import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useToggle } from '@/hooks/useToggle'
import { KanbanEditForm } from '../KanbanEditForm'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { Task } from '@/utils/formatTasks'
import { format } from 'date-fns'

type KanbanTaskProps = {
  task: Task
  editTask: (id: number, newTask: Task) => void
  removeTask: (id: number) => void
}

const KanbanTask = ({ task, editTask, removeTask }: KanbanTaskProps) => {
  const [isEditing, toggle] = useToggle(false)

  return (
    <Draggable draggableId={`task-${task.id_tarefa}`} index={task.id_tarefa}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          bg="whiteAlpha.800"
          my="1rem"
          p="10px"
          h="min-content"
          borderRadius={4}
        >
          {isEditing ? (
            <KanbanEditForm editTask={editTask} task={task} toggle={toggle} />
          ) : (
            <VStack>
              <Text fontSize="0.8rem">{task.nome_tarefa}</Text>
              <Text fontSize="0.8rem">{task.descricao}</Text>
              <Text fontSize="0.8rem">{format(new Date(task.dt_inicial), 'dd/MM/yyyy')}</Text>
              <Text fontSize="0.8rem">{format(new Date(task.dt_final), 'dd/MM/yyyy')}</Text>
              {String(task.stts_tarefa)}
              <HStack>
                <IconButton
                  aria-label="Editar"
                  fontSize="12px"
                  size="xs"
                  icon={<FiEdit />}
                  onClick={toggle}
                />
                <IconButton
                  aria-label="Editar"
                  fontSize="12px"
                  size="xs"
                  icon={<FiTrash />}
                  onClick={() => removeTask(task.id_tarefa)}
                />
              </HStack>
            </VStack>
          )}
        </Box>
      )}
    </Draggable>
  )
}

export default KanbanTask
