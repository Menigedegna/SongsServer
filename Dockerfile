FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ARG MONGO_URL
ENV MONGO_URL ${MONGO_URL}
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]


