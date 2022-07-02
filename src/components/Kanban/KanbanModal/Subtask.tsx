// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { HStack, Text, Flex, IconButton, Checkbox } from '@chakra-ui/react'
import { BsFillTrashFill } from 'react-icons/bs'

export type SubtaskData = {
  id: string
  nome_subtarefa: string
  anexo_subtarefa?: string
  status_subtarefa: string
}

export type SubtaskProps = {
  data: SubtaskData
  toggleCheck: (id: string) => void
  handleDelete: (id: string) => void
}

const Subtask = (props: SubtaskProps) => {
  const { data, toggleCheck, handleDelete } = props

  const status = data.status_subtarefa !== 'A_FAZER'

  return (
    <HStack spacing="24px" px="5px" w="100%" h="0.9rem">
      <Checkbox
        isChecked={status}
        size="md"
        borderColor="green.400"
        key={data.id}
        checked={data.status_subtarefa}
        onChange={() => toggleCheck(data.id)}
      />
      <Flex w="70%" justifyContent="space-between" fontSize="0.8rem">
        {status ? <Text as="del">{data.nome_subtarefa}</Text> : <Text>{data.nome_subtarefa}</Text>}
      </Flex>
      <Flex w="10%">
        <IconButton
          aria-label="deletar"
          colorScheme="red"
          variant="ghost"
          onClick={() => handleDelete(data.id)}
          icon={<BsFillTrashFill width="2.5rem" />}
        />
      </Flex>
    </HStack>
  )
}

export default Subtask
