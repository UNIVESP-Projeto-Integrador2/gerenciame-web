import React, { useState } from 'react'
import { Link as ReactDOMLink, useNavigate } from 'react-router-dom'
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
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { FiMail, FiLock, FiUser, FiCalendar, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { CustomInput } from '../components/CustomInput'
import { useInputState } from '../hooks/useInputState'

export const SignUpPage = () => {
  const [name, handleNameChange] = useInputState('')
  const [email, handleEmailChange] = useInputState('')
  const [isLoading, setIsloading] = useState(false)

  const navigate = useNavigate()

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
              <Heading marginBottom={4}>Cadastro</Heading>
              <Box borderWidth="1px" borderColor="#5457C1" borderRadius="lg" w="400px" p="8">
                <FormControl onSubmit={() => console.log('foi')}>
                  <VStack spacing={4} align="stretch">
                    <CustomInput
                      icon={FiUser}
                      id="nome"
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={name}
                      onChange={handleNameChange}
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

                    <Checkbox>
                      Aceito os <Link color="teal.500">Termos e Condições</Link>
                    </Checkbox>

                    <Button
                      type="submit"
                      bg="#F78EA7"
                      w="100%"
                      color="#703b48"
                      onClick={() => {
                        setIsloading(true)
                        setTimeout(() => navigate({ pathname: '/login' }), 2000)
                      }}
                    >
                      Cadastrar
                    </Button>

                    <Text align="center">
                      <Link as={ReactDOMLink} to="/login">
                        Já tenho cadastro
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
