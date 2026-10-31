import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

describe('Edge Cases', () => {
  it('should handle malformed JSON body gracefully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send('not valid json{');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
  });

  it('should reject a tampered or garbage bearer token', async () => {
    const response = await request(app)
      .get('/api/payments')
      .set('Authorization', 'Bearer not.a.real.token');
    expect(response.status).toBe(401);
  });

  it('should attach a request id header to every response', async () => {
    const response = await request(app).get('/api/health');
    expect(response.headers['x-request-id']).toBeTruthy();
  });

  it('should not expose the debug Sentry route unless explicitly enabled', async () => {
    const response = await request(app).get('/api/debug-sentry');
    expect(response.status).toBe(404);
  });
});
