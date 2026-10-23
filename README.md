# Sarıyer Kent Konseyi — Next.js

Bootstrap tasarımının Next.js App Router ile yeniden yapılandırılmış sürümüdür.

## Stack
- Next.js 15
- React 19
- App Router
- CSS Modules yerine merkezi `app/globals.css`
- `placehold.co` ile remote placeholder görseller

## Kurulum
```bash
npm install
npm run dev
```

Sonra `http://localhost:3000` adresini açın.

Production:
```bash
npm run build
npm start
```

## Docker
Uygulamayı Docker ile 3001 portunda başlatmak için:
```bash
docker compose up --build -d
```

Uygulama `http://localhost:3001` adresinde çalışır. Durdurmak için:
```bash
docker compose down
```

## Not
Görseller projeye indirilmemiştir; tasarımda istenildiği gibi doğrudan `https://placehold.co/...` üzerinden çağrılır.
