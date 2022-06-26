import React, { FormEvent, useState } from 'react'
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
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { FiMail, FiLock, FiCalendar, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { CustomInput } from '../components/CustomInput'
import { LoginRequest, useLoginMutation } from '../services/api'
import { useFormState } from '@/hooks/useFormState'

export const LoginPage = (props: { setUserEmail: (email) => void }) => {
  const { setUserEmail } = props
  const navigate = useNavigate()
  // const toast = useToast()

  const [isLoading, setIsloading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  // const [formState, handleChange] = useFormState<LoginRequest>({
  //   email: '',
  //   password: '',
  // })

  // const [login, { isLoading }] = useLoginMutation()

  // async function handleSubmit(event: FormEvent) {
  //   event.preventDefault()

  //   try {
  //     await login(formState).unwrap()
  //     navigate({ pathname: '/' })
  //   } catch (error) {
  //     toast({
  //       status: 'error',
  //       title: 'Erro',
  //       description: 'Ah não, um erro aconteceu!',
  //       isClosable: true,
  //     })
  //   }
  // }

  const handleLogin = () => {
    setIsInvalid(!email || !password)

    if (email && password) {
      setIsloading(true)
      setTimeout(() => navigate({ pathname: '/home' }), 1000)
      setUserEmail(email)
    }
  }

  return (
    <Container p={0} maxW="full">
      <Flex h="100vh">
        <VStack width="50%" backgroundColor="#5457C1" justifyContent="center">
          <Flex>
            <FiChevronsLeft color="white" size={30} />
            <FiCalendar color="white" size={30} />
            <FiChevronsRight color="white" size={30} />
          </Flex>
          <Heading size="xl" color="whiteAlpha.900">
            gerencia.me
          </Heading>
        </VStack>
        <VStack width="50%" justifyContent="center">
          {!isLoading ? (
            <>
              <Heading marginBottom={4}>Login</Heading>
              <Box borderWidth="1px" borderColor="brand.blue" borderRadius="lg" w="400px" p="8">
                <FormControl isRequired isInvalid={isInvalid}>
                  <VStack spacing={4} align="stretch">
                    <CustomInput
                      icon={FiMail}
                      id="email"
                      type="email"
                      placeholder="Digite seu email"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />

                    <CustomInput
                      icon={FiLock}
                      id="senha"
                      type="password"
                      placeholder="Digite sua senha"
                      onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                      isLoading={isLoading}
                      type="submit"
                      bg="#F78EA7"
                      color="#703b48"
                      w="100%"
                      onClick={handleLogin}
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
            </>
          ) : (
            <Spinner color="#F78EA7" size="xl" thickness="4px" emptyColor="gray.200" />
          )}
        </VStack>
      </Flex>
    </Container>
  )
}
