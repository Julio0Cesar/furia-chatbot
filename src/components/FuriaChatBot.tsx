import { FC, useEffect, useRef } from 'react'
import Icon_Furia from '../assets/Icon-Furia.svg'
import Icon_User from '../assets/Icon-User.svg'

interface Message {
  sender: string
  text: string
  options?: string[]
  redirect?: boolean
}

interface FuriaChatbotProps {
  messages: Message[]
  onSend: (message: string) => void
}

const FuriaChatbot: FC<FuriaChatbotProps> = ({ messages, onSend }) => {

  //Sempre rola automaticamente para a última mensagem
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="p-4">
      {messages.map((msg, idx) => {
        const isBot = msg.sender === 'bot'
        const text = msg.text

        return (
          <div key={idx} className={`flex ${isBot ? "justify-start" : "justify-end"} m-2 items-end`}>
            {isBot && (
              <div className="rounded-full bg-white p-2 m-2 mr-0 max-h-12">
                <img src={typeof Icon_Furia === 'string' ? Icon_Furia : (Icon_Furia as unknown as string)} alt="Bot" width={32} height={32} />
              </div>
            )}
            <div className={`rounded-t-lg ${isBot ? "rounded-br-lg" : "rounded-bl-lg"} bg-white m-2 p-2 max-w-3xl`} style={{ fontSize: '1.15rem' }}>
              <h4 dangerouslySetInnerHTML={{ __html: text }}/>
              {isBot && msg.options && (
                <div className="flex gap-2 mt-5">
                  {msg.options.map((option, i) => (
                    <button
                      key={i}
                      className="bg-black text-black p-2 rounded-lg options"
                      onClick={() => onSend(option)}
                    >
                      <h5>{option}</h5>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {!isBot && (
              <div className="rounded-full bg-white p-2 m-2 ml-0 max-h-12">
                <img src={typeof Icon_User === 'string' ? Icon_User : (Icon_User as unknown as string)} alt="Bot" width={32} height={32} />
              </div>
            )}
          </div>
        )
      })}
        <div ref={bottomRef} />
    </div>
  )
}

export default FuriaChatbot
