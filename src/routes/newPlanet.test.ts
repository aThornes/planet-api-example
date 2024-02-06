import newPlanet from "./newPlanet";
import { addPlanet } from "@handlers/planetHandler";
import mockPlanet from "../../__tests__/mock/mockPlanet.json";

jest.mock("@handlers/planetHandler", () => ({
    __esModule: true,
    addPlanet: jest.fn()
}));

const mockfn = jest.fn();
const mockAddPlanet = addPlanet as jest.Mocked<typeof mockfn>;

describe("New planet functionality", () => {
    test("If a parameter is missing, return 400", () => {
        const mockRec = {
            body: {}
        } as unknown as ExpressRequest;
        const mockRes = {
            status: jest.fn(() => ({
                send: jest.fn()
            }))
        } as unknown as ExpressResponse;

        newPlanet(mockRec, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    test("If planet is sent for creation, return 200", () => {
        const mockReq = { body: mockPlanet } as unknown as ExpressRequest;
        
        const mockResponseID = "mockIdValue";
        const mockSend = jest.fn();
        const mockRes = {
            status: jest.fn(() => ({
                send: mockSend
            }))
        } as unknown as ExpressResponse;

        const ID = mockPlanet;
        mockAddPlanet.mockImplementationOnce(() => mockResponseID) //ID
        
        newPlanet(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockSend).toHaveBeenCalledWith({ "id": mockResponseID } ); //EXPECT ID
    });
});

