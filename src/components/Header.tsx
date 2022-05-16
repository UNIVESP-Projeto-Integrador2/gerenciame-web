import React from 'react'
import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Flex w="100%" alignItems="center" backgroundColor="brand.blue" paddingY={3} paddingX={6}>
      <Box w="90%">
        <Heading size="lg" color="whiteAlpha.900">
          gerencia.me
        </Heading>
      </Box>
      <Spacer />
      {user ? (
        <IconButton aria-label="Sair" icon={<FiLogOut />} onClick={() => console.log('sair')}>
          Sair
        </IconButton>
      ) : (
        <ButtonGroup gap="2">
          <Button colorScheme="brand.blue" onClick={() => navigate({ pathname: '/signup' })}>
            Cadastro
          </Button>
          <Button colorScheme="brand.blue" onClick={() => navigate({ pathname: '/' })}>
            Entrar
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  )
}
