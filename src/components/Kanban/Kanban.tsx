import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { KanbanColumn } from './KanbanColumn'
import { KanbanModal } from './KanbanModal'
import { Box, Center, HStack, IconButton, Tooltip } from '@chakra-ui/react'
import { useKanban } from './hooks/useKanban'
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi'

const Kanban = () => {
  const {
    // onDragEnd,
    addTask,
    columns,
    removeTask,
    editTask,
    addTaskIsOpen,
    addTaskOnClose,
    addTaskOnOpen,
    handleChangeWeek,
  } = useKanban()

  return (
    <>
      {addTaskIsOpen && (
        <KanbanModal onClose={addTaskOnClose} addTask={addTask} isOpen={addTaskIsOpen} />
      )}
      <DragDropContext onDragEnd={e => console.log(e)}>
        <Center>
          <HStack>
            {columns.map(({ id, name, tasks }) => (
              <KanbanColumn
                id={id}
                key={id}
                name={name}
                tasks={tasks}
                removeTask={removeTask}
                editTask={editTask}
              />
            ))}
          </HStack>
        </Center>
      </DragDropContext>
      <Box padding="1rem 0">
        <Tooltip width="100%" label="Adicionar tarefa" placement="bottom" bg="black" color="white">
          <IconButton
            aria-label="label"
            icon={<FiPlus />}
            onClick={() => addTaskOnOpen()}
            zIndex={9999}
            position="fixed"
            right="50px"
            bottom="50px"
            bg="brand.blue"
            color="white"
            borderRadius="50%"
          />
        </Tooltip>
      </Box>
      <Box padding="1rem 0">
        <Tooltip width="100%" label="Próxima semana" placement="bottom" bg="black" color="white">
          <IconButton
            aria-label="label"
            icon={<FiChevronRight />}
            onClick={() => handleChangeWeek('next')}
            zIndex={9999}
            position="fixed"
            right="50px"
            bottom="calc(100vh / 2)"
            bg="brand.blue"
            color="white"
            borderRadius="50%"
          />
        </Tooltip>
      </Box>
      <Box padding="1rem 0">
        <Tooltip width="100%" label="Semana anterior" placement="bottom" bg="black" color="white">
          <IconButton
            aria-label="label"
            icon={<FiChevronLeft />}
            onClick={() => handleChangeWeek('prev')}
            zIndex={9999}
            position="fixed"
            left="50px"
            bottom="calc(100vh / 2)"
            bg="brand.blue"
            color="white"
            borderRadius="50%"
          />
        </Tooltip>
      </Box>
    </>
  )
}

export default Kanban
