import React from 'react'
import { Box, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react'
import { FiLogOut, FiCalendar, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Header(props: { userEmail: string }) {
  const { userEmail } = props
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Flex
      w="100%"
      alignItems="center"
      backgroundColor="#5457C1"
      paddingY={3}
      paddingX={6}
      position="fixed"
      h="60px"
      zIndex={2}
    >
      <Box w="90%">
        <Flex direction="row" alignContent="center">
          <Flex>
            <FiChevronsLeft color="white" size={20} />
            <FiCalendar color="white" size={20} />
            <FiChevronsRight color="white" size={20} />
          </Flex>
          <Heading size="sm" color="whiteAlpha.900">
            gerencia.me
          </Heading>
        </Flex>
      </Box>
      <Spacer />
      {user ? (
        <IconButton aria-label="Sair" icon={<FiLogOut />} onClick={() => console.log('sair')}>
          Sair
        </IconButton>
      ) : (
        // <ButtonGroup gap="2">
        //   <Button colorScheme="brand.blue" onClick={() => navigate({ pathname: '/signup' })}>
        //     Cadastro
        //   </Button>
        //   <Button colorScheme="brand.blue" onClick={() => navigate({ pathname: '/' })}>
        //     Entrar
        //   </Button>
        // </ButtonGroup>
        <>
          <Text color="white" pr="10px" fontSize="sm">
            {userEmail}
          </Text>
          <IconButton
            aria-label="Sair"
            icon={<FiLogOut />}
            onClick={() => navigate({ pathname: '/' })}
          >
            Sair
          </IconButton>
        </>
      )}
    </Flex>
  )
}
