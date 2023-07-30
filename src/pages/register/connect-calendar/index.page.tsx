import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'
import { ConnectBox, ConnectItem } from './styles'

const TextHeader =
  'Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.'

export function Register() {
  async function handleConnect() {
    console.log('Usuário tentou conectar')
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
          <Button size="sm" variant="secondary" onClick={handleConnect}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default Register
