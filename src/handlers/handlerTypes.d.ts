type Store = "planet" | "user";

interface UpdateParams {
  $set?: Record<string, any>; //Key name and value to set or overwrite
  $inc?: Record<string, number>; //Key name and amount to increment by
  $push?: Record<string, any>; //Key name and new item to push to array
  $dropIndex?: Record<string, number>; //Key name and array index to drop item
}

interface DBQueryBase {
  store: Store;
  id: string;
}

interface DBWriteItem {
  id?: string;
  store: Store;
  jsonData: Record<string, any>;
}

interface DBEditItem extends DBQueryBase {
  update: UpdateParams;
}

interface PlanetBase {
  name: string;
  type: "terrestrial" | "gaseous";

  mass: number; // kg
  solarDistance: number; // AU
}

/* Planet interface types */
interface Planet extends PlanetBase {
  description: string;

  mRadius: number; //Mean radius
  eRadius: number; //Equatorial radius
  pRadius: number; //Polar radius

  density: number; // g/cm3
  gravity: number; // m/s2

  temperature: number; // kelvin
  surfacePressure: number; // kPa

  rotationalPeriod: number; // seconds
}

interface UpdatePlanet {
  name?: string;
  description?: string;
  type?: "terrestrial" | "gaseous";

  mRadius?: number; //Mean radius
  eRadius?: number; //Equatorial radius
  pRadius?: number; //Polar radius

  mass?: number; // kg
  density?: number; // g/cm3
  gravity?: number; // m/s2

  temperature?: number; // kelvin
  surfacePressure?: number; // kPa

  rotationalPeriod?: number; // seconds
  solarDistance?: number; // AU
}

interface PlanetSearchableParams {
  name?: string;
  type?: "terrestrial" | "gaseous";

  mass: number; // kg
  solarDistance: number; // AU
}

interface PlanetSearchParams {
  name?: string;
  classification?: string;
  minDistance?: number;
  maxDistance?: number;
  minMass?: number;
  maxMass?: number;
}
