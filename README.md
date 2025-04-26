# Furia ChatBot

Este é um chatbot interativo desenvolvido como parte do desafio da Furia. O objetivo principal do projeto é criar uma aplicação simples de chatbot com algumas respostas automáticas e um comportamento de redirecionamento, utilizando React, TypeScript e Tailwind CSS.

## Funcionalidades

- **Chatbot interativo**: O chatbot responde automaticamente com mensagens predeterminadas baseadas na entrada do usuário.
- **Redirecionamento**: Quando o usuário envia uma mensagem específica ("sair"), o bot redireciona para o site da Furia.
- **Interface responsiva**: Usando o Tailwind CSS, a aplicação é responsiva e se adapta a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, ajudando a reduzir erros no código.
- **Tailwind CSS**: Framework CSS utilitário para criar layouts responsivos e estilizados rapidamente.
- **React Testing Library**: Ferramenta para testes unitários e de integração para componentes React.
- **Jest**: Framework de testes para JavaScript.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js**: 18.x
- **npm** ou **yarn**
- **Docker**: Caso queira rodar o projeto em um container Docker

### Instalar Dependências

Clone o repositório e navegue até o diretório do projeto:

```bash
git clone https://github.com/seu-usuario/furia-chatbot.git
cd furia-chatbot
```

Instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

### Rodar a Aplicação

#### Modo Desenvolvimento

Para rodar a aplicação no modo de desenvolvimento, use o seguinte comando:

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

#### Usando Docker

O projeto também pode ser executado usando Docker. Para isso, siga os seguintes passos:

1. Certifique-se de ter o Docker instalado na sua máquina.
2. Construa a imagem do Docker:

    ```bash
    docker build -t furia-chatbot .
    ```

3. Rode o contêiner:

    ```bash
    docker run -p 3000:3000 furia-chatbot
    ```

Isso fará com que a aplicação seja acessível no navegador em [http://localhost:3000](http://localhost:3000).

### Rodar Testes

Para rodar os testes unitários, utilize:

```bash
npm test
# ou
yarn test
```

## Estrutura de Diretórios

- **src**: Contém os arquivos principais da aplicação.
  - **components**: Componentes React como `FuriaChatBot`.
  - **data**: Arquivos de dados, como as respostas do bot.
  - **tests**: Arquivos de teste para componentes e funcionalidades.
  - **utils**: Funções auxiliares para manipulação de dados e lógica do bot.
