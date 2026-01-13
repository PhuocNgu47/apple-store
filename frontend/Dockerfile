FROM node:18-alpine AS build

# Build argument cho VITE_API_URL
ARG VITE_API_URL=http://localhost:5000/api

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set environment variable cho build time
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
