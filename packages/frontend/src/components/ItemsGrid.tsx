import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { Tag } from '@opengovsg/design-system-react'
import dayjs from 'dayjs'
import React from 'react'

import { Item } from '../types'

interface ItemProps {
  allItems: Item[]
}

const ItemsGrid = ({ allItems }: ItemProps) => {
  return (
    <SimpleGrid spacing={2} columns={[1, 3]}>
      {allItems.toReversed().map((item, index) => (
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
  )
}

export default ItemsGrid
