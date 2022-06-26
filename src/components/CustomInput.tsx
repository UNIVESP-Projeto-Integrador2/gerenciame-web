import React from 'react'
import {
  Icon,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface CustomInputProps extends InputProps {
  icon?: IconType
}

export const CustomInput = ({ icon, ...rest }: CustomInputProps) => {
  return (
    <Flex direction="column">
      <InputGroup data-testid="custom-input">
        {icon && (
          <InputLeftElement pointerEvents="none">
            <Icon as={icon} color="gray.200" />
          </InputLeftElement>
        )}
        <Input {...rest} focusBorderColor="#5457C1" errorBorderColor="red.300" />
      </InputGroup>
      <FormErrorMessage fontSize="10px">Campo obrigatório</FormErrorMessage>
    </Flex>
  )
}
