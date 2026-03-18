FROM node:20

WORKDIR /usr/src/app

ARG API_URL
ARG USERNAME
ARG PASSWORD
ARG NEXT_PUBLIC_PROJECT_NAME
ARG TELEGRAM_BOT_TOKEN
ARG PORT

ENV API_URL=$API_URL
ENV USERNAME=$USERNAME
ENV PASSWORD=$PASSWORD
ENV NEXT_PUBLIC_PROJECT_NAME=$NEXT_PUBLIC_PROJECT_NAME
ENV TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN
ENV PORT=$PORT

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml* ./

# ← Главная магия: кэшируем pnpm store между сборками
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE $PORT

CMD ["npm", "run", "start"]