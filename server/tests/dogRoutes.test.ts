import { describe,expect, test, vi } from 'vitest'
import request from 'supertest'
import app from '../index'
import * as dogService from '../services/dogService'

describe('Dog routes',() => {
    test('GET /api/dogs/random returns true', async () => {
        vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce({
            imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
            status: 'success',
        })

    const res = await request(app)
        .get('/api/dogs/random')
    
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.imageUrl).toContain('stbernard')
    })

    test('GET /api/dog/random returns 500 and error', async () => {
        vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValue(
            new Error("Failed to fetch dog image: Network error") 
        )
        
        const res = await request(app).get('/api/dogs/random')
        expect(res.status).toBe(500)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe("Failed to fetch dog image: Network error")
    })
})