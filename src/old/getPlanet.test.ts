import { getPlanetById } from "old/handlers/planetHandler";
import getPlanet from "./getPlanet";
import mockPlanet from "../../__tests__/mock/mockPlanet.json";

jest.mock("@handlers/planetHandler", () => ({
  __esModule: true,
  getPlanetById: jest.fn(),
}));

const mockfn = jest.fn();
const mockGetId = getPlanetById as jest.Mocked<typeof mockfn>;

describe("Get planet functionality", () => {
  test("If ID isn't provided, 400 is returned", () => {
    const mockReq = {} as ExpressRequest;
    const mockRes = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    } as unknown as ExpressResponse; //Only use in JEST test

    getPlanet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  test("If ID isn't found, 404 is returned", () => {
    const mockReq = { params: { id: "h" } } as unknown as ExpressRequest;
    const mockRes = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    } as unknown as ExpressResponse; //Only use in JEST test

    mockGetId.mockImplementationOnce(null);

    getPlanet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  test("If Planet is found, 200 is returned", () => {
    const mockReq = { params: { id: "h" } } as unknown as ExpressRequest;
    const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({
        send: mockSend,
      })),
    } as unknown as ExpressResponse; //Only use in JEST test

    mockGetId.mockImplementationOnce(() => mockPlanet);

    getPlanet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockPlanet);
  });
});
