import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import { Infobox } from '@opengovsg/design-system-react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import ItemsGrid from './components/ItemsGrid'
import NewComment from './components/NewComment'
import { api } from './libs/fetch'

const App = () => {
  const {
    data: allItems,
    isSuccess,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['get-items'],
    queryFn: () =>
      api
        .get('/items')
        .then((res) =>
          res.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1)),
        ),
  })

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
        {isSuccess && <ItemsGrid allItems={allItems} />}
        {isError && (
          <Infobox variant="error" children="Unable to retrieve comments" />
        )}
        {isPending && (
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
