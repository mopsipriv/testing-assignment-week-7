import { describe,expect, test,vi } from "vitest"
import { getDogImage } from "../controllers/dogController"
import { getRandomDogImage } from "../services/dogService"

vi.mock("../services/dogService")

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe('dogController.getDogImage',() => {
    test('Return dog with valid request', async () => {
        const mockDogData = {
            "imageUrl": "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            "status": "success"
        }

        vi.mocked(getRandomDogImage).mockResolvedValueOnce(mockDogData)

        const req: any = {}
        const res = createMockResponse()

        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockDogData
        })
    })
})