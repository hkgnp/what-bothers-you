import { FormControl } from '@chakra-ui/react'
import {
  Button,
  FormErrorMessage,
  Infobox,
  Textarea,
  Toast,
} from '@opengovsg/design-system-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { api } from '../libs/fetch'

const NewComment = () => {
  const client = useQueryClient()

  const { handleSubmit, control, reset } = useForm<{
    comment: string
  }>({
    mode: 'onChange',
  })

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (body: { value: string; date: Date }) =>
      api.url('/item').post(body),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['get-items'] })
    },
  })

  const onSubmit = useCallback(
    (formData: { comment: string }) => {
      mutate({
        value: formData.comment,
        date: new Date(),
      })
      reset()
    },
    [mutate, reset],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={'comment'}
        rules={{
          required: 'Please enter something',
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <FormControl isInvalid={!!error}>
              <Textarea
                value={value || ''}
                onChange={onChange}
                mb="3"
                placeholder="Enter your comment here"
              />
              <FormErrorMessage mt="0">{error?.message}</FormErrorMessage>
            </FormControl>
          )
        }}
      />
      <Button
        isLoading={isPending}
        type="submit"
        variant="outline"
        colorScheme={isError ? 'critical' : 'main'}
        size="xs"
      >
        {isError ? 'Unable to post comment' : 'Comment!'}
      </Button>
    </form>
  )
}

export default NewComment
