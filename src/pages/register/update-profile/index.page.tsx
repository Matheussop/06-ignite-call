import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { Container, Header } from '.././styles'
import { ProfileBox, FormAnnotation, ProfileAvatar } from './styles'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { api } from '@/src/lib/axios'
import { NextSeo } from 'next-seo'

const TextHeader = 'Por último, uma breve descrição e uma foto de perfil.'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const { register, handleSubmit } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const router = useRouter()

  const session = useSession()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  async function handleChangeProfileImg() {
    console.log('Trocar de imagem')
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text>{TextHeader}</Text>
          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <Text size="sm">Foto de perfil</Text>
          <ProfileAvatar>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
            <Button onClick={handleChangeProfileImg} variant="secondary">
              Selecionar foto
            </Button>
          </ProfileAvatar>
          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
          </label>
          <FormAnnotation>
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
          <Button type="submit">
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}
