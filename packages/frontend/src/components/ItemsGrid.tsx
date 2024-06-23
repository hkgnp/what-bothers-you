import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { Tag } from '@opengovsg/design-system-react'
import { Infobox } from '@opengovsg/design-system-react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { api } from '../libs/fetch'

const ItemsGrid = () => {
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
          res.sort((a, b) => (dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1)),
        ),
  })

  return (
    <>
      <SimpleGrid spacing={2} columns={[1, 3]}>
        {isSuccess &&
          allItems.map((item, index) => (
            <Box
              key={index}
              w={['100%', '300px']}
              borderWidth={2}
              borderRadius="8px"
              borderColor="rgb(67,44,191)"
              p={4}
            >
              <Tag fontSize="10" mb={4} variant="subtle">
                {dayjs(item.date).format('DD MMM YYYY')}
              </Tag>
              <Text fontSize="14" textColor="rgb(67,44,191)">
                {item.value}
              </Text>
            </Box>
          ))}
      </SimpleGrid>
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
    </>
  )
}

export default ItemsGrid
