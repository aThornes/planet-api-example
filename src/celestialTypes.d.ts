declare enum CelestialBodyType {
  STAR = "Star",
  PLANET = "Planet",
  ASTEROID = "Asteroid",
  COMET = "Comet",
  EXOPLANET = "Exoplanet",
  MOON = "Moon", // You can include other types as needed
}

declare enum DiscoveryMethod {
  VisualObservation = "Visual Observation",
  Telescopes = "Telescopes",
  Photography = "Photography",
  RadioAstronomy = "Radio Astronomy",
  InfraredAstronomy = "Infrared Astronomy",
  MicrowaveAstronomy = "Microwave Astronomy",
  XRayAstronomy = "X-ray Astronomy",
  GammaRayAstronomy = "Gamma-ray Astronomy",
  TransitPhotometry = "Transit Photometry",
  RadialVelocityMethod = "Radial Velocity Method",
  GravitationalMicrolensing = "Gravitational Microlensing",
}

interface OrbitalParameters {
  orbitalPeriod: number; // In Earth years
  semiMajorAxis: number; // In AU
  eccentricity: number;
  inclination: number; // In degrees
}

interface DiscoveryInformation {
  date: Date;
  method?: DiscoveryMethod;
}

interface PhysicalCharacteristics {
  color?: string;
  density?: number; // In g/cm^3
  albedo?: number;
}

interface Element {
  element: string;
  percentage: number;
}

interface CelestialBody {
  name: string;
  type: CelestialBodyType;

  mass: number; // kg
  radius: number; // km
  orbitalParameters: OrbitalParameters;
  surfaceTemperature?: number; // Kelvin
  composition?: Element[];
  atmosphere?: Element[];
  surfaceFeatures?: string[];
  rotationPeriod?: number; // Hours
  orbitingBodyIds?: string[];
  discoveryInformation?: DiscoveryInformation;
  distance?: number; // AU
  age?: number; // Billion years
  physicalCharacteristics?: PhysicalCharacteristics;
  parentBodyId?: string;
  observationalData?: string[];
  habitability?: boolean;
  history?: string;
}
