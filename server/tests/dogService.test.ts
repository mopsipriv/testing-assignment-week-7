import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"
import { getRandomDogImage } from "../services/dogService"

global.fetch = vi.fn()

describe('Dog Service', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should get URL successfully', async () => {
        const mockDog = {
            "message": "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            "status": "success"
        }

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockDog
        })

        const dog = await getRandomDogImage()

        expect(dog.imageUrl).toBe(mockDog.message)
        expect(dog.status).toBe('success')
        expect(fetch).toHaveBeenCalledOnce()

    })

    test('should throw error on failed requerst', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        })

        await expect(getRandomDogImage()).rejects.toThrow('Failed to fetch dog image')
    })
})