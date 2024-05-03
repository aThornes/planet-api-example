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

interface PhysicalCharacteristics {
  color: string;
  density: number; // In g/cm^3
  albedo: number; // From 0 to 1
}

interface CelestialBody {
  name: string;
  type: CelestialBodyType;

  mass: number;
  radius: number;
  orbitalParameters: OrbitalParameters;
  surfaceTemperature?: number;
  composition?: string;
  atmosphere?: string;
  surfaceFeatures?: string[];
  rotationPeriod?: number;
  orbitingBodies?: string[];
  discoveryInformation?: DiscoveryInformation;
  distance?: number;
  age?: number;
  discoveryId?: string;
  physicalCharacteristics?: PhysicalCharacteristics;
  parentStarId?: string;
  observationalData?: string[];
  habitability?: boolean;
  history?: string;
}
