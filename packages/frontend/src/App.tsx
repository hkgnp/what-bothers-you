import { Box, Flex, Text, VStack } from '@chakra-ui/react'

import ItemsGrid from './components/ItemsGrid'
import NewComment from './components/NewComment'

const App = () => {
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
        <ItemsGrid />
      </Flex>
    </Box>
  )
}

export default App
