import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const TextHeader =
  'Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.'

export function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnect() {
    signIn('google', { callbackUrl: '/register/connect-calendar' })
  }

  async function handleNextStep() {
    router.push('/register/time-intervals')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>{TextHeader}</Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            size="sm"
            variant={isSignedIn ? 'primary' : 'secondary'}
            onClick={handleConnect}
            disabled={!hasAuthError && isSignedIn}
          >
            {!hasAuthError && isSignedIn ? (
              <>
                Conectado
                <Check />
              </>
            ) : (
              <>
                Conecte-se
                <ArrowRight />
              </>
            )}
          </Button>
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Não foi possível conectar com o seu calendário, verifique se você
            habilitou as permissões de acesso ao Google Calendar
          </AuthError>
        )}
        <Button type="submit" disabled={!isSignedIn} onClick={handleNextStep}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default ConnectCalendar
