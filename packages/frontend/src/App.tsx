import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import ItemsGrid from './components/ItemsGrid'
import NewComment from './components/NewComment'

const App = () => {
  //@ts-expect-error env does not exist on importmeta
  const URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '/api'
  const {
    data: allItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['get-items'],
    queryFn: () =>
      fetch(`${URL}/items`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      }),
  })

  if (!allItems) return

  return (
    <Box px={[5, 20]} py={5}>
      <Text
        textStyle="h5"
        textAlign="center"
        fontWeight={1000}
        mb="5"
        textColor="rgb(67,44,191)"
      >
        What is something that bothers you that WE can work on together?
      </Text>
      <VStack>
        <Box textAlign="right" mb="5" w={['280px', '500px']}>
          <NewComment />
        </Box>
      </VStack>
      <Flex justifyContent="center">
        {!error && <ItemsGrid allItems={allItems} />}
        {isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Flex>
    </Box>
  )
}

export default App
