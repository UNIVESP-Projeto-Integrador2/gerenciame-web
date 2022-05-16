import React from 'react'
import { Center, Heading, Spinner, useToast } from '@chakra-ui/react'
import Kanban from '../components/Kanban/Kanban'
import { useGetTasksQuery } from '../services/api'

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
      <Heading>Dashboard</Heading>
      <Kanban />
    </>
  )
}
