import { useEffect, useState } from 'react'
import FuriaChatbot from './components/FuriaChatBot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { getBotResponse } from './utils/botResponses'

interface Message {
  sender: string
  text: string
  options?: string[]
  redirect?: boolean
}

function App() {
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  //Primeira mensagem de boas vindas
  useEffect(() => {
    setMessages([{ sender: 'bot', text: 'Bem-vindo! Diga "Olá" para começarmos.' }])
  }, [])

  //Função chamada quando o usuário envia uma mensagem
  const handleSend = (message: string) => {
    if (message.trim() === '') return

    //Remove as ultimas opções do bot e adiciona a mensagem do usuário
    setMessages(prevMessages => {
      const newPrev = [...prevMessages]
      const lastBotWithOptionsIndex = [...newPrev].reverse().findIndex(m => m.sender === 'bot' && m.options)
      if (lastBotWithOptionsIndex !== -1) {
        const index = newPrev.length - 1 - lastBotWithOptionsIndex
        newPrev[index] = { ...newPrev[index], options: undefined }
      }
      return [...newPrev, { sender: 'user', text: message }]
    })
  
    //Antes do retorno da mensagem adiciona ...
    setMessages(prevMessages => [
      ...prevMessages, 
      { sender: 'bot', text: '...' }
    ])
  
    //Depois de 1 segundo, asiciona a resposta  
    setTimeout(() => {
      const botReply = getBotResponse(message)

      //Se a resposta indicar redirecionamento, envia o usuário para o site da FURIA
      if (botReply.redirect) {
        window.location.href = 'https://www.furia.gg/'
        return
      }
      
      //Caso contrário, substitui o "..." pela resposta correta do bot
      setMessages(prevMessages => [
        ...prevMessages.slice(0, -1),
        { sender: 'bot', text: botReply.text, options: botReply.options }
      ])
    }, 1000)
  }
  

  return (<div className="container-center">
    <div className="w-2/3 h-full flex items-center">
      <div className="card w-full h-5/6 overflow-hidden flex flex-col">
        
        <div className="bg-black rounded-tl-lg rounded-tr-lg w-full">
          <div className="pl-10 p-1">
            <h1>Furia Chatbot</h1>
          </div>
        </div>
  
        <div className="flex-1 flex flex-col w-full bg-gray-200 overflow-y-auto">
          <FuriaChatbot messages={messages} onSend={handleSend} />
        </div>
  
        <div className="flex p-2 bg-white border-t">
          <textarea
            className="flex-1 resize-none overflow-y-auto h-12 border rounded-md"
            name="message"
            autoComplete="off"
            required
            placeholder="Digite aqui uma mensagem..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (userInput.trim() !== '') {
                  handleSend(userInput.trim())
                  setUserInput('')
                }
              }
            }}
          />
          <button
            className="ml-2 px-4 bg-black text-white rounded-md h-12"
            onClick={() => {
              if (userInput.trim() !== '') {
                handleSend(userInput.trim())
                setUserInput('')
              }
            }}
            aria-label="Enviar"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="sm" />
          </button>
        </div>
  
      </div>
    </div>
  </div>
  
  )
}

export default App
