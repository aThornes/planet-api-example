import newPlanet from "./searchPlanet";
import mockPlanet from "../../__tests__/mock/mockPlanet.json";

import { searchStoredPlanets } from "@handlers/planetHandler";

jest.mock("@handlers/planetHandler", () => ({
  __esModule: true,
  searchStoredPlanets: jest.fn(),
}));

const mockFn = jest.fn();
const mockSearch = searchStoredPlanets as jest.Mocked<typeof mockFn>;

describe("Get planet", () => {
  it("Returns 400 if body is not provided", () => {
    const mockReq = {
      body: {},
    } as any as ExpressRequest;

    const mockRes = {
      status: jest.fn(() => ({ send: jest.fn() })),
    } as any as ExpressResponse;

    newPlanet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("Returns matched response if valid body is provided", () => {
    const mockReq = {
      body: { name: "Earth" },
    } as any as ExpressRequest;

    mockSearch.mockImplementationOnce(() => [mockPlanet]);

    const mockSend = jest.fn();

    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    } as any as ExpressResponse;

    newPlanet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith([mockPlanet]);
  });

  it("Returns 404 if no results match", () => {
    const mockReq = {
      body: { name: "Pluto" },
    } as any as ExpressRequest;

    mockSearch.mockImplementationOnce(() => null);

    const mockSend = jest.fn();

    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    } as any as ExpressResponse;

    newPlanet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
