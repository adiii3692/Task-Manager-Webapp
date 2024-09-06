FROM node:22.8-alpine3.19

WORKDIR /app

COPY package*.json ./

# Clean install
RUN npm ci

COPY . .

EXPOSE 5555

CMD ["npm","run","dev"]