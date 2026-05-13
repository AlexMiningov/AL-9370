# Деплой на Vercel

## Способ 1 — через Vercel CLI (рекомендуется)

```bash
# Установить CLI
npm i -g vercel

# Из корня проекта
cd /home/user/lelikow-mining
vercel

# Следовать инструкциям:
# - Set up and deploy: Y
# - Which scope: выбрать аккаунт
# - Link to existing project: N
# - Project name: lelikow-mining (или любое)
# - Directory: ./  (оставить по умолчанию)
```

## Способ 2 — через GitHub

1. Запушить репо на GitHub
2. Зайти на vercel.com → New Project → Import
3. Выбрать репозиторий
4. В настройках проекта указать:
   - **Root Directory**: `packages/web`
   - **Build Command**: `bun run build`
   - **Output Directory**: `dist`
   - **Install Command**: `bun install`
5. Deploy

## Структура

- Фронтенд (React/Vite) → `packages/web/dist/` → статика Vercel
- API (Hono) → `packages/web/api/index.ts` → Vercel Edge Function
- Все `/api/*` запросы → Edge Function
- Все остальные → SPA (index.html)
