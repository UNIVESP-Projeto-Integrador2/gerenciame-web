import React from 'react'
import { Center, Spinner, useToast } from '@chakra-ui/react'
import Kanban from '../components/Kanban/Kanban'
import { Header } from '@/components/Header'
import { useGetTasksQuery } from '../services/api'
import { UserContext } from '@/context/userContext'

export function DashboardPage() {
  // const [attemptAccess, { data }] = useProtectedMutation()
  const { data: tasks, isLoading, isError } = useGetTasksQuery()
  const toast = useToast()

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner thickness="4px" speed="1.5s" emptyColor="gray.200" color="brand.blue" size="xl" />
      </Center>
    )
  }

  if (isError || !tasks) {
    toast({
      status: 'error',
      title: 'Erro',
      description: 'Ah não, um erro aconteceu!',
      isClosable: true,
    })
  }

  return (
    <>
      <UserContext.Consumer>
        {({ user }) => {
          return (
            <>
              <Header userEmail={user.email} />
              <Kanban />
            </>
          )
        }}
      </UserContext.Consumer>
    </>
  )
}
