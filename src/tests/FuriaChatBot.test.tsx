import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FuriaChatbot from '../components/FuriaChatBot'

window.HTMLElement.prototype.scrollIntoView = function () {}

describe('FuriaChatBot', () => {
  it('deve renderizar o chatbot com mensagem inicial', () => {
    render(<FuriaChatbot messages={[{ sender: 'bot', text: 'Bem-vindo!' }]} onSend={() => {}} />)
    expect(screen.getByText('Bem-vindo!')).toBeInTheDocument()
  })
})
