/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
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
import { SubtaskData, SubtaskProps } from '../KanbanModal/Subtask'
import { Task } from '@/utils/formatTasks'
import { Tarefa } from '@/types/tarefa'
import { useKanban } from '../hooks/useKanban'
import SubtaskEdit from './SubtaskEdit'

type KanbanModalProps = {
  updateTask: (id: number, newTask: Tarefa) => void
  isOpen: boolean
  onClose: () => void
  task: Task
}

export type TaskData = {
  nome_tarefa: string
  descricao: string
  data_inicial: Date
  data_limite: Date
  status: string
  hora?: string
  subtarefas?: SubtaskData[]
}

const KanbanEditModal = ({ updateTask, onClose, isOpen, task }: KanbanModalProps) => {
  const [data, handleChange] = useFormState<TaskData>({
    nome_tarefa: task.nome_tarefa,
    descricao: task.descricao,
    data_inicial: task.data_inicial,
    data_limite: task.data_limite,
    status: task.status,
    hora: task.hora,
    subtarefas: task.subtarefas,
  })

  const { editSubTask, removeSubTask } = useKanban()

  // const subtarefasComplete = task.subtarefas?.map(sub => ({
  //   data: { ...sub },
  //   handleDelete: handleDeleteSubtask,
  //   toggleCheck,
  // }))

  const [subtaskValue, setSubtaskValue] = useState('')
  const [subtasks, setSubtasks] = useState<SubtaskData[] | undefined>(task.subtarefas)

  const handleUpdateTask = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    updateTask(task.id_tarefa, { ...data, id_tarefa: task.id_tarefa })
    onClose()
  }

  const handleDeleteSubtask = (id: string) => {
    if (subtasks) {
      setSubtasks(subtasks.filter(subtask => subtask.id_subtarefa !== parseInt(id)))
      removeSubTask(parseInt(id))
    }
  }

  console.log(task)

  const handleAddSubtask = () => {
    if (subtaskValue.length) {
      const newSubtask = {
        data: {
          id: uuid(),
          nome_subtarefa: subtaskValue,
          anexo_subtarefa: 'https://via.placeholder.com/150',
          status_subtarefa: false,
        },
        handleDelete: handleDeleteSubtask,
        toggleCheck,
      }

      if (subtasks) {
        setSubtasks([...subtasks, newSubtask])
      } else {
        setSubtasks([newSubtask])
      }
      setSubtaskValue('')
    }
  }

  const toggleCheck = (id: number) => {
    if (!subtasks) return

    const subtaskToUpdateIndex = subtasks.findIndex(subtask => subtask.id_subtarefa === id)

    if (subtaskToUpdateIndex === -1) return

    const updatedTask = { ...subtasks[subtaskToUpdateIndex] }
    updatedTask.status_subtarefa = updatedTask.status_subtarefa === 'A_FAZER' ? 'FEITO' : 'A_FAZER'

    setSubtasks(
      subtasks.map(task => {
        return task.id_subtarefa === id ? updatedTask : task
      }),
    )

    editSubTask(updatedTask.id_subtarefa, updatedTask)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar tarefa</ModalHeader>
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
                value={data.nome_tarefa}
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
                  subtasks.map(subtask => (
                    <Stack w="100%" align="center" key={subtask.id_subtarefa}>
                      <SubtaskEdit
                        key={subtask.id_subtarefa}
                        data={subtask}
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
              <Textarea
                name="descricao"
                placeholder="Descrição"
                onChange={handleChange}
                value={data.descricao}
              />
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
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                value={`${data.data_inicial.toString()} ${data.hora}`}
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
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                value={`${data.data_limite.toString()} ${data.hora}`}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" colorScheme="yellow" onClick={handleUpdateTask}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default KanbanEditModal
