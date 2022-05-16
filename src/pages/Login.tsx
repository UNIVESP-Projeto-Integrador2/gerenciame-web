import React, { FormEvent } from 'react'
import { Link as ReactDOMLink, useNavigate } from 'react-router-dom'
import {
  FormControl,
  Button,
  Box,
  Container,
  VStack,
  Heading,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import { FiMail, FiLock } from 'react-icons/fi'
import { CustomInput } from '../components/CustomInput'
import { LoginRequest, useLoginMutation } from '../services/api'
import { useFormState } from '@/hooks/useFormState'

export const LoginPage = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [formState, handleChange] = useFormState<LoginRequest>({
    email: '',
    password: '',
  })

  const [login, { isLoading }] = useLoginMutation()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      await login(formState).unwrap()
      navigate({ pathname: '/' })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Erro',
        description: 'Ah não, um erro aconteceu!',
        isClosable: true,
      })
    }
  }

  return (
    <Container data-testid="sign-in" maxW={'2xl'} centerContent marginTop={32}>
      <Heading marginBottom={4}>Login</Heading>
      <Box borderWidth="1px" borderColor="brand.blue" borderRadius="lg" w="400px" p="8">
        <FormControl isRequired>
          <VStack spacing={4} align="stretch">
            <CustomInput
              icon={FiMail}
              id="email"
              type="email"
              placeholder="Digite seu email"
              onChange={handleChange}
            />

            <CustomInput
              icon={FiLock}
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              onChange={handleChange}
            />

            <Button
              isLoading={isLoading}
              type="submit"
              bg="brand.blue"
              w="100%"
              onClick={handleSubmit}
            >
              Entrar
            </Button>

            <Text align="center">
              <Link as={ReactDOMLink} to="/signup">
                Ainda não tenho cadastro
              </Link>
            </Text>
          </VStack>
        </FormControl>
      </Box>
    </Container>
  )
}
