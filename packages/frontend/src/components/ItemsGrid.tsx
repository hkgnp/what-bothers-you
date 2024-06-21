import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { Item } from '../types'
import { Tag } from '@opengovsg/design-system-react'
import dayjs from 'dayjs'

type ItemProps = {
  allItems: Item[]
}

const ItemsGrid = ({ allItems }: ItemProps) => {
  return (
    <SimpleGrid spacing={2} columns={[1, 3]}>
      {allItems.toReversed().map((item) => (
        <Box
          w={['100%', '300px']}
          borderWidth={2}
          borderRadius="8px"
          p={4}
          backgroundColor="navy"
        >
          <Tag fontSize="10" mb={4}>
            {dayjs(item.date).format('DD MMMM YYYY')}
          </Tag>
          <Text fontSize="13" textColor="white">
            {item.value}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ItemsGrid
