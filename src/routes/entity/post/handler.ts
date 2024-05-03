interface EntityBody {
  name: string;
  type: string;
  mass: number;
  solarDistance: number;
  description: string;
  mRadius: number;
  eRadius: number;
  pRadius: number;
  density: number;
  gravity: number;
  temperature: number;
  surfacePressure: number;
  rotationalPeriod: number;
}

const handler = async ({ req, res }: EndpointReq) => {
  const body = req.body as EntityBody;

  return res.status(200).json({ message: "Hello, World!" });
};

export default handler;
