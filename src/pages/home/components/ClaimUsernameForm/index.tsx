import { Button, TextInput, Text } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Digite um nome de usuário com no mínimo 3 letras.' })
    .regex(/^([a-z\\\\-]+)$/i, { message: 'Usuário pode ter apenas letras' })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClainUsername(data: ClaimUsernameFormData) {
    console.log(data.username)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClainUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button type="submit" size="sm">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome de usuário desejado.'}
        </Text>
      </FormAnnotation>
    </>
  )
}

export default ClaimUsernameForm
