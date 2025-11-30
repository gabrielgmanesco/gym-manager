FROM node:20

WORKDIR /usr/src/app

# Instalar dependências de build para módulos nativos (sqlite3)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para nodemon)
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]