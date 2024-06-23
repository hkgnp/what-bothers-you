import { FormControl } from '@chakra-ui/react'
import { Button, Textarea } from '@opengovsg/design-system-react'
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

  const { mutate, isPending } = useMutation({
    mutationFn: (body: { value: string; date: Date }) =>
      api
        .url('/items')
        .headers({
          'Content-Type': 'application/json',
        })
        .post(body),
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
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl>
              <Textarea
                value={value || ''}
                onChange={onChange}
                mb="3"
                placeholder="Enter your comment here"
              />
            </FormControl>
          )
        }}
      />
      <Button
        isLoading={isPending}
        type="submit"
        variant="outline"
        colorScheme="main"
        size="xs"
      >
        Comment!
      </Button>
    </form>
  )
}

export default NewComment
