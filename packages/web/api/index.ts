import { handle } from 'hono/vercel';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

const app = new Hono()
  .basePath('/api')
  .use(cors({ origin: (origin) => origin ?? '*', credentials: true }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }, 200))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))
  .post(
    '/contact',
    zValidator(
      'json',
      z.object({
        name: z.string().min(1),
        contact: z.string().min(1),
        message: z.string().min(1),
      })
    ),
    async (c) => {
      const data = c.req.valid('json');
      console.log('[CONTACT REQUEST]', {
        name: data.name,
        contact: data.contact,
        message: data.message,
        timestamp: new Date().toISOString(),
      });
      return c.json({ ok: true }, 200);
    }
  );

export default handle(app);
