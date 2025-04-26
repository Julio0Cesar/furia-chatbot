import botResponses from '../data/botResponses.json'

interface BotResponse {
  keywords?: string[]
  text: string
  options?: string[]
  redirect?: boolean
}

// Função que recebe a mensagem do usuário e retorna a resposta do bot
export function getBotResponse(userMessage: string): BotResponse {
    const message = userMessage.trim().toLowerCase()
  
    const responses: { [key: string]: BotResponse } = botResponses
  
    // Percorre todas as respostas para procurar uma opção com a mensagem
    for (const key in responses) {
      const response = responses[key]
      if (response.keywords && response.keywords.includes(message)) {
        
        //Se a mensagem for "sair", redireciona para outra pagina
        if (message === 'sair') {
          return { text: '...', redirect: true }
        }
        return response
      }
    }
  
    //caso não encontre nenhuma possibilidade retorna mensagem automatica default
    return responses['default'] || { text: 'Desculpe, não entendi.' }
  }
  