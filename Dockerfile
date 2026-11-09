FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build-time SITE_URL — canonical/sitemap/metadata/OG tek kaynağı.
# Kullanım: docker build --build-arg SITE_URL=https://ornek.com .
# Verilmezse (boş) lib/data/config.js varsayılan prod URL fallback'i uygulanır;
# bu yüzden ARG'ye burada varsayılan değer yazılmaz (tek kaynak config.js'tir).
ARG SITE_URL

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
# ARG -> ENV köprüsü: `npm run build` (aşağıda) bu değeri process.env.SITE_URL
# olarak okur. SSG'de gömüldüğü için runtime env değildir; değiştirmek için
# image yeniden build edilmeli.
ENV SITE_URL=${SITE_URL}

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
