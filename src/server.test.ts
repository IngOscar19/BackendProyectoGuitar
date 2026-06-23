import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from './server'

describe('GET / (Ruta Raíz)', () => {
  test('debe responder con status 200 y el mensaje de API funcionando', async () => {
    const res = await request(app).get('/')
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('API GuitarLA funcionando correctamente')
  })
})
