import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useToggle } from '@/hooks/useToggle'
import { KanbanEditForm } from '../KanbanEditForm'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { Box, HStack, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { Task } from '@/utils/formatTasks'
import { format } from 'date-fns'
import { KanbanModal } from '../KanbanModal'
import { useKanban } from '../hooks/useKanban'
import KanbanEditModal from '../KanbanEditModal/KanbanEditModal'
import { TaskData } from '../KanbanModal/KanbanModal'
import { Tarefa } from '@/types/tarefa'

type KanbanTaskProps = {
  task: Task
  editTask: (id: number, newTask: Tarefa) => void
  removeTask: (id: number) => void
}

const KanbanTask = ({ task, editTask, removeTask }: KanbanTaskProps) => {
  const [isEditing, toggle] = useToggle(false)

  const { addTaskOnClose } = useKanban()

  const dataInicial = new Date(task.data_inicial.replace(/-/g, '/'))
  const dataFinal = new Date(task.data_limite.replace(/-/g, '/'))

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
            // <KanbanEditForm editTask={editTask} task={task} toggle={toggle} />
            <KanbanEditModal
              isOpen={isEditing}
              updateTask={editTask}
              task={task}
              onClose={() => {
                addTaskOnClose()
                toggle()
              }}
            />
          ) : (
            <VStack>
              <Text fontSize="0.8rem">{task.nome_tarefa}</Text>
              <Text fontSize="0.8rem">{task.descricao}</Text>
              <Text fontSize="0.8rem">{format(new Date(dataInicial), 'dd/MM/yyyy')}</Text>
              <Text fontSize="0.8rem">{format(new Date(dataFinal), 'dd/MM/yyyy')}</Text>
              {String(task.status)}
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
