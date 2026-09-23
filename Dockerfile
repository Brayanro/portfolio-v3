FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:1.25.4-alpine-slim
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
