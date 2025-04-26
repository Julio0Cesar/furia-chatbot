# Imagem base para construir o projeto
FROM node:18 AS build

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto

# Copia o package.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para rodar o npm
CMD ["npm", "start"]