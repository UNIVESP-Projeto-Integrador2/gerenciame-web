import React, { FormEvent } from 'react'
import { useFormState } from '@/hooks/useFormState'
import './KanbanEditForm.css'
import { Button, FormControl, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import { FiSave, FiX } from 'react-icons/fi'
import { Task } from '@/utils/formatTasks'

type KanbanEditFormProps = {
  task: Task
  editTask: (id: number, newTask: Task) => void
  toggle: () => void
}

const KanbanEditForm = ({ task, editTask }: KanbanEditFormProps) => {
  const [data, handleChange] = useFormState<Task>(task)

  const handleEditTask = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    editTask(task.id_tarefa, data)
  }
  return (
    <>
      <VStack width="full" align="center" justifyContent="center">
        <FormControl>
          <FormLabel fontWeight="bold" fontSize="14px">
            Tarefa
          </FormLabel>
          <Input
            type="text"
            name="nome_tarefa"
            placeholder="Digite o nome da tarefa"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel fontWeight="bold" fontSize="14px">
            Descrição
          </FormLabel>
          <Input name="descricao" type="text" placeholder="Descrição" onChange={handleChange} />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel fontWeight="bold" fontSize="14px">
            Data de início
          </FormLabel>
          <Input
            name="dt_inicial"
            type="datetime-local"
            placeholder="Início"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel fontWeight="bold" fontSize="14px">
            Data final
          </FormLabel>
          <Input name="dt_final" type="datetime-local" placeholder="Fim" onChange={handleChange} />
        </FormControl>
      </VStack>
      <HStack>
        <Button colorScheme="blackAlpha" mr={3} onClick={() => console.log('cancel')}>
          <FiX />
        </Button>
        <Button type="submit" colorScheme="yellow" onClick={handleEditTask}>
          <FiSave />
        </Button>
      </HStack>
      {/* <form
        onSubmit={e => {
          e.preventDefault()
          props.editTask(props.taskId, user, text)
          props.toggle()
        }}
        className="KanbanEditForm"
      >
        <div className="KanbanEditForm-input-container">
          <label htmlFor="task">Task: </label>
          <input
            className="KanbanEditForm-input-textarea"
            type="text"
            value={text}
            onChange={handleChangeText}
            name="task"
            id="task"
            required
          ></input>
        </div>
        <div className="KanbanEditForm-input-container">
          <label htmlFor="user">For: </label>
          <input
            className="KanbanEditForm-input"
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={handleChangeUser}
            required
          ></input>
        </div>
        <button className="KanbanEditForm-btn" style={{ backgroundColor: `${props.color}` }}>
          Save
        </button>
      </form> */}
    </>
  )
}

export default KanbanEditForm
