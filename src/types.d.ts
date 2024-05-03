type ExpressRequest = import("express").Request;
type ExpressResponse = import("express").Response;

interface EndpointReq {
  req: ExpressRequest;
  res: ExpressResponse;
}
