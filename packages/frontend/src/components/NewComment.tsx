import { FormControl } from '@chakra-ui/react'
import { Button, Textarea } from '@opengovsg/design-system-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

const NewComment = () => {
  const client = useQueryClient()

  const { handleSubmit, control, reset } = useForm<{
    comment: string
  }>({
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: (body: { value: string; date: Date }) =>
      fetch('/api/items', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((res) => {
        if (!res.ok) throw new Error('Failed to mutate')
        return res.json()
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['get-items'] })
    },
  })

  const onSubmit = useCallback(
    (formData: { comment: string }) => {
      mutation.mutate({
        value: formData.comment,
        date: new Date(),
      })
      reset()
    },
    [mutation, reset],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={'comment'}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl>
              <Textarea value={value || ''} onChange={onChange} mb="3" />
            </FormControl>
          )
        }}
      />
      <Button type="submit" variant="outline" colorScheme="main" size="xs">
        Comment!
      </Button>
    </form>
  )
}

export default NewComment
