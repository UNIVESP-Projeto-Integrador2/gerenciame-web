import React from 'react'
import {
  Icon,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface CustomInputProps extends InputProps {
  icon?: IconType
}

export const CustomInput = ({ icon, ...rest }: CustomInputProps) => {
  return (
    <InputGroup data-testid="custom-input">
      {icon && (
        <InputLeftElement pointerEvents="none">
          <Icon as={icon} color="gray.200" />
        </InputLeftElement>
      )}
      <Input {...rest} focusBorderColor="brand.blue" errorBorderColor="red.300" />
      <FormErrorMessage>Campo obrigatório.</FormErrorMessage>
    </InputGroup>
  )
}
