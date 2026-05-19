FROM caddy:latest

COPY dist /app/dist
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]