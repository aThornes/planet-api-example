type ExpressRequest = import("express").Request;
type ExpressResponse = import("express").Response;

interface EndpointReq {
  req: ExpressRequest;
  res: ExpressResponse;
}

declare enum CelestialBodyType {
  PLANET = "Planet",
  ASTEROID = "Asteroid",
  COMET = "Comet",
  EXOPLANET = "Exoplanet",
  MOON = "Moon", // You can include other types as needed
}

interface OrbitalParameters {
  orbitalPeriod: number; // In Earth days or years
  semiMajorAxis: number; // In AU or kilometers
  eccentricity: number;
  inclination: number; // In degrees
}

interface DiscoveryInformation {
  date: string; // Date of discovery
  method: string; // Method of discovery
}

interface CelestialBody {
  name: string;
  type: CelestialBodyType;
  mass: number; // In kilograms or Earth masses
  radius: number; // In kilometers or Earth radii
  orbitalParameters: OrbitalParameters;
  surfaceTemperature?: number; // Optional, in Kelvin
  composition?: string; // Optional
  atmosphere?: string; // Optional
  surfaceFeatures?: string[]; // Optional, array of features
  rotationPeriod?: number; // Optional, in hours
  orbitingBodies?: string[]; // Optional, array of moon/satellite names
  discoveryInformation?: DiscoveryInformation;
  distance?: number; // Optional, in AU for our solar system or light-years for exoplanets
  age?: number; // Optional, in years
  discoveryId?: string; // Optional, unique identifier
  physicalCharacteristics?: {
    color?: string; // Optional
    density?: number; // Optional, in g/cm^3
    albedo?: number; // Optional, from 0 to 1
  };
  parentStar?: {
    name: string;
    type: string;
    mass: number; // In solar masses
    age?: number; // Optional, in years
  };
  observationalData?: string[]; // Optional, array of data types
  habitability?: boolean; // Optional, indicating potential habitability
  history?: string; // Optional, historical information
}
