import { describe, test, expect, vi, beforeEach } from 'vitest'
import { Request, Response, NextFunction } from 'express'
import { handleInputErrors } from './handleInputErrors'
import { validationResult } from 'express-validator'

// Mock express-validator
vi.mock('express-validator', () => ({
  validationResult: vi.fn(),
}))

describe('handleInputErrors middleware', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    vi.clearAllMocks()
    req = {}
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    }
    next = vi.fn() as unknown as NextFunction
  })

  test('should call next() if validation has no errors', () => {
    // Mock validationResult to return an object where isEmpty() returns true
    vi.mocked(validationResult).mockReturnValue({
      isEmpty: () => true,
      array: () => [],
    } as any)

    handleInputErrors(req as Request, res as Response, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  test('should return 400 and JSON with errors if validation has errors', () => {
    const mockErrors = [{ msg: 'Error de prueba', path: 'name', type: 'field' }]
    
    // Mock validationResult to return an object where isEmpty() returns false
    vi.mocked(validationResult).mockReturnValue({
      isEmpty: () => false,
      array: () => mockErrors,
    } as any)

    handleInputErrors(req as Request, res as Response, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ errors: mockErrors })
  })
})
