# Example JSON requests for endpoints

## Create Body

Sun

```
{
  "name": "Sun",
  "type": "Star",
  "mass": 1.989e30,
  "radius": 696340,
  "orbitalParameters": {
    "orbitalPeriod": 0,
    "semiMajorAxis": 0,
    "eccentricity": 0,
    "inclination": 0
  },
  "surfaceTemperature": 5778,
  "composition": [
    { "element": "Hydrogen", "percentage": 74.9 },
    { "element": "Helium", "percentage": 23.8 },
    { "element": "Oxygen", "percentage": 0.077 },
    { "element": "Carbon", "percentage": 0.043 },
    { "element": "Iron", "percentage": 0.014 },
    { "element": "Neon", "percentage": 0.012 },
    { "element": "Nitrogen", "percentage": 0.01 },
    { "element": "Silicon", "percentage": 0.004 }
  ],
  "atmosphere": [],
  "surfaceFeatures": [],
  "rotationPeriod": 25.05,
  "orbitingBodyIds": [],
  "discoveryInformation": {
    "discoveredBy": "Humans",
    "method": "Visual Observation"
  },
  "distance": 0,
  "age": 4.6e9,
  "physicalCharacteristics": {
    "color": "Yellow",
    "density": 1.408,
    "albedo": 0.06
  },
  "observationalData": [],
  "habitability": false,
  "history": "The Sun is the center of the Solar System, and has been revered by various cultures throughout history."
}

```

Earth

```
{
  "name": "Earth",
  "type": "Planet",
  "mass": 5.972e24,
  "radius": 6371,
  "orbitalParameters": {
    "orbitalPeriod": 365.24,
    "semiMajorAxis": 1,
    "eccentricity": 0.0167,
    "inclination": 0
  },
  "surfaceTemperature": 288,
  "composition": [
    {
      "element": "Iron",
      "percentage": 32.1
    },
    {
      "element": "Oxygen",
      "percentage": 30.1
    }
  ],
  "atmosphere": [
    {
      "element": "Nitrogen",
      "percentage": 78
    },
    {
      "element": "Oxygen",
      "percentage": 21
    }
  ],
  "surfaceFeatures": ["Mountains", "Oceans", "Deserts", "Forests"],
  "rotationPeriod": 0.99726968,
  "discoveryInformation": {
    "method": "Visual Observation"
  },
  "distance": 1,
  "age": 4.543,
  "physicalCharacteristics": {
    "color": "Blue, white, green, brown",
    "density": 5.52,
    "albedo": 0.367
  },
  "observationalData": ["Data 1", "Data 2"],
  "habitability": true,
  "history": "Earth is the third planet from the Sun and the only astronomical object known to harbor life."
}
```

Moon

```
{
  "name": "Moon",
  "type": "Moon",
  "mass": 7.342e22,
  "radius": 1737.4
  "orbitalParameters": {
    "orbitalPeriod": 27.322,
    "semiMajorAxis": 384400,
    "eccentricity": 0.055,
    "inclination": 5.145
  },
  "surfaceTemperature": -233,
  "composition": [
    { "element": "Oxygen", "percentage": 42 },
    { "element": "Silicon", "percentage": 21.1 },
    { "element": "Aluminum", "percentage": 13.9 },
    { "element": "Calcium", "percentage": 12 },
    { "element": "Iron", "percentage": 7.5 },
    { "element": "Magnesium", "percentage": 3.6 },
    { "element": "Sulfur", "percentage": 0.6 }
  ],
  "atmosphere": [],
  "surfaceFeatures": ["Maria", "Craters", "Highlands"],
  "rotationPeriod": 27.322,
  "orbitingBodyIds": ["Earth"],
  "discoveryInformation": {
    "discoveredBy": "Humans",
    "method": "Visual Observation"
  },
  "distance": 0,
  "age": 4.53e9,
  "physicalCharacteristics": {
    "color": "Gray",
    "density": 3.344,
    "albedo": 0.136
  },
  "observationalData": [],
  "habitability": false,
  "history": "The Moon has been observed and studied by humans since ancient times and plays a significant role in cultural and scientific endeavors."
}
```
