FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ARG MONGO_URI
ENV MONGO_URI ${MONGO_URI}
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]


