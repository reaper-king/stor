FROM node:16.13.1-alpine

WORKDIR /app
COPY . .
RUN npm i --no-optional


RUN npm run build


EXPOSE 3000
CMD ["node", "./build"]
