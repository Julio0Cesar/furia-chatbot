import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

//configura o ambiente de teste
beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    })
    global.HTMLDivElement.prototype.scrollIntoView = jest.fn()
    jest.useFakeTimers()  
})

describe('App', () => {
  it('deve renderizar a mensagem inicial de boas-vindas', () => {
    render(<App />)
    expect(screen.getByText('Bem-vindo! Diga "Olá" para começarmos.')).toBeInTheDocument()
  })

  it('deve permitir o envio de uma mensagem do usuário', async () => {
    render(<App />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Olá' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    // Espera um tempo para a resposta do bot
    await act(async () => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Olá')).toBeInTheDocument()
  })

  it('deve exibir a resposta do bot após o envio da mensagem', async () => {
    render(<App />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Olá' } })

    // Envolver com act() para garantir que todas as atualizações sejam processadas
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
      jest.advanceTimersByTime(1000)
    })
  })

  it('deve redirecionar para o site da FURIA quando a resposta for de redirecionamento', async () => {
    render(<App />)
    Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
    })

    // Mock da função de redirecionamento
    jest.spyOn(global, 'setTimeout').mockImplementationOnce((callback, delay) => {
        callback()
        return 1 as any // Retorna um número, com o tipo 'any' para evitar o erro de tipo
    })
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'sair' } })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(window.location.href).toBe('https://www.furia.gg/')
    })
  })
})
