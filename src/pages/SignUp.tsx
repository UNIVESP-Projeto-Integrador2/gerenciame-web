import React from 'react'
import { Link as ReactDOMLink } from 'react-router-dom'
import {
  FormControl,
  Button,
  Box,
  Container,
  Checkbox,
  VStack,
  Link,
  Text,
  Heading,
} from '@chakra-ui/react'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { CustomInput } from '../components/CustomInput'
import { useInputState } from '../hooks/useInputState'

export const SignUpPage = () => {
  const [firstName, handleFirstNameChange] = useInputState('')
  const [lastName, handleLastNameChange] = useInputState('')
  const [email, handleEmailChange] = useInputState('')

  return (
    <Container maxW={'2xl'} centerContent marginTop={'36'}>
      <Heading marginBottom={4}>Cadastro</Heading>
      <Box borderWidth="1px" borderColor="brand.blue" borderRadius="lg" w="400px" p="8">
        <FormControl onSubmit={() => console.log('foi')}>
          <VStack spacing={4} align="stretch">
            <CustomInput
              icon={FiUser}
              id="nome"
              type="text"
              placeholder="Digite seu primeiro nome"
              value={firstName}
              onChange={handleFirstNameChange}
            />

            <CustomInput
              icon={FiUser}
              id="sobrenome"
              type="text"
              placeholder="Digite seu sobrenome"
              value={lastName}
              onChange={handleLastNameChange}
            />

            <CustomInput
              icon={FiMail}
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={handleEmailChange}
            />

            <CustomInput
              icon={FiLock}
              id="senha"
              type="password"
              placeholder="Digite uma senha segura"
            />

            <CustomInput
              icon={FiLock}
              id="confirma_senha"
              type="password"
              placeholder="Confirme a senha"
            />

            <Checkbox>Aceito os termos...</Checkbox>

            <Button type="submit" bg="brand.blue" w="100%">
              Cadastrar
            </Button>

            <Text align="center">
              <Link as={ReactDOMLink} to="/">
                Já tenho cadastro
              </Link>
            </Text>
          </VStack>
        </FormControl>
      </Box>
    </Container>
  )
}
