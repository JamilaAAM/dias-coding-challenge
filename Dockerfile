FROM node:20-alpine AS runtime

COPY /app /app

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]

