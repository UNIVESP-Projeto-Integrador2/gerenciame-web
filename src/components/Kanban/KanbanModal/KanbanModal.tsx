import React, { FormEvent } from 'react'
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
} from '@chakra-ui/react'
import { useFormState } from '@/hooks/useFormState'

type KanbanModalProps = {
  addTask: (newTask: any) => void
  isOpen: boolean
  onClose: () => void
}

type TaskData = {
  nome_tarefa: string
  descricao: string
  dt_inicio: Date
  dt_final: Date
}

const KanbanModal = ({ addTask, onClose, isOpen }: KanbanModalProps) => {
  const [data, handleChange] = useFormState<TaskData>({
    nome_tarefa: '',
    descricao: '',
    dt_inicio: new Date(),
    dt_final: new Date(),
  })

  const handleAddTask = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(data)
    addTask(data)
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
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
              <Input
                name="dt_final"
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
