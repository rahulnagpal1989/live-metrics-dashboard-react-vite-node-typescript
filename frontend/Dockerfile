FROM node:22
WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
ENV PORT=5173
ENV VITE_BASE_URL="http://localhost:4000"
RUN npm run build
CMD ["npm", "run", "start"]
