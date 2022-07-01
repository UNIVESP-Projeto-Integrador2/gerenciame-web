/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import { format } from 'date-fns'

import { v4 as uuid } from 'uuid'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Stack,
  InputRightElement,
  InputGroup,
  IconButton,
} from '@chakra-ui/react'
import { useFormState } from '@/hooks/useFormState'
import Subtask from './Subtask'
import { Tarefa } from '@/types/tarefa'

type KanbanModalProps = {
  addTask: (newTask: any) => Promise<{
    data: Tarefa
  }>
  isOpen: boolean
  onClose: () => void
  addSubtask: (subtask: any) => void
}

// igual tarefa, mas sem o id
export type TaskData = {
  nome_tarefa: string
  descricao: string
  data_inicial: Date
  data_limite: Date
  status: string
  hora?: string
  subtarefas?: { data: SubtaskData }[]
}

export type SubtaskData = {
  id_subtarefa: string
  id_tarefa: number
  nome_subtarefa: string
  anexo_subtarefa?: string
  status_subtarefa?: string
}

const KanbanModal = ({ addTask, onClose, isOpen, addSubtask }: KanbanModalProps) => {
  const [subtaskValue, setSubtaskValue] = useState('')
  const [subtasks, setSubtasks] = useState<{ data: SubtaskData }[]>([])
  const [taskId, setTaskId] = useState<number>()

  const [data, handleChange] = useFormState<TaskData>({
    nome_tarefa: '',
    descricao: '',
    data_inicial: new Date(),
    data_limite: new Date(),
    status: 'A fazer',
    hora: '00:00:00',
    subtarefas: subtasks,
  })

  const handleAddTask = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const dataInicial = data.data_inicial.replace(/-/g, '/').split('T')[0]
    const dataFinal = data.data_limite.replace(/-/g, '/').split('T')[0]

    const dataInicialF = new Date(dataInicial).toISOString().split('T')[0]
    const dataFinalF = new Date(dataFinal).toISOString().split('T')[0]

    const formattedData = { ...data, data_inicial: dataInicialF, data_limite: dataFinalF }

    addTask(formattedData).then(res => {
      setTaskId(res.data.id_tarefa)

      subtasks.forEach(sub => {
        const formattedSubtask = { ...sub.data, id_tarefa: res.data.id_tarefa }
        addSubtask(formattedSubtask)
      })
    })

    onClose()
  }

  const handleAddSubtask = () => {
    if (subtaskValue.length) {
      const newSubtask = {
        data: {
          id: uuid(),
          nome_subtarefa: subtaskValue,
          status_subtarefa: 'A_FAZER',
        },
        handleDelete: handleDeleteSubtask,
        toggleCheck,
      }

      addSubtask(newSubtask.data)
      setSubtasks([...subtasks, newSubtask])
      setSubtaskValue('')
    }
  }

  const handleDeleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.data.id !== id))
  }

  const toggleCheck = (id: string) => {
    const subtaskToUpdateIndex = subtasks.findIndex(subtask => subtask.data.id === id)

    if (subtaskToUpdateIndex === -1) return

    const updatedTask = { ...subtasks[subtaskToUpdateIndex] }

    updatedTask.data.status_subtarefa =
      updatedTask.data.status_subtarefa === 'A_FAZER' ? 'FEITO' : 'A_FAZER'

    setSubtasks(
      subtasks.map(task => {
        return task.data.id === id ? updatedTask : task
      }),
    )
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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

            <FormControl>
              <FormLabel fontWeight="bold" fontSize="14px">
                Subtarefas
              </FormLabel>
              <Stack spacing={5}>
                <InputGroup size="md">
                  <Input
                    value={subtaskValue}
                    variant="outline"
                    type="text"
                    placeholder="Adicione subtarefas..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSubtaskValue(e.target.value)}
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      margin={2}
                      aria-label="adicionar"
                      colorScheme="cyan"
                      variant="link"
                      onClick={handleAddSubtask}
                      icon={<BsPlusCircleFill />}
                    />
                  </InputRightElement>
                </InputGroup>

                {subtasks &&
                  subtasks.map(task => (
                    <Stack w="100%" align="center" key={task.data.id}>
                      <Subtask
                        key={task.data.id}
                        data={task.data}
                        toggleCheck={toggleCheck}
                        handleDelete={handleDeleteSubtask}
                      />
                    </Stack>
                  ))}
              </Stack>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel fontWeight="bold" fontSize="14px">
                Descrição
              </FormLabel>
              <Textarea name="descricao" placeholder="Descrição" onChange={handleChange} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel fontWeight="bold" fontSize="14px">
                Data de início
              </FormLabel>
              <Input
                name="data_inicial"
                type="datetime-local"
                placeholder="Início"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel fontWeight="bold" fontSize="14px">
                Data final
              </FormLabel>
              <Input
                name="data_limite"
                type="datetime-local"
                placeholder="Fim"
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" colorScheme="yellow" onClick={handleAddTask}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default KanbanModal
