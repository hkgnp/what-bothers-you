import dayjs from 'dayjs'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Text, SimpleGrid, Box, Flex } from '@chakra-ui/react'
import { Item } from './types'
import { Tag } from '@opengovsg/design-system-react'
import ItemsGrid from './components/ItemsGrid'

function App() {
  const client = useQueryClient()

  const { data: allItems, error } = useQuery({
    queryKey: ['get-items'],
    queryFn: (): Promise<Item[]> =>
      fetch('/api/items')
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .catch((error) => {
          throw new Error(error)
        }),
  })

  if (!allItems) return

  return (
    <Box p="10">
      <Text textStyle="h5" textAlign="center" fontWeight={1000}>
        What is something that bothers you that WE can work on together?
      </Text>

      <Flex justifyContent="center">
        {!error && <ItemsGrid allItems={allItems} />}
      </Flex>
    </Box>
  )
}

export default App
