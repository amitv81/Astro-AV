// src/utils/planetRelations.js

export const signLords = {
  1: "Mars", // Aries
  2: "Venus", // Taurus
  3: "Mercury", // Gemini
  4: "Moon", // Cancer
  5: "Sun", // Leo
  6: "Mercury", // Virgo
  7: "Venus", // Libra
  8: "Mars", // Scorpio
  9: "Jupiter", // Sagittarius
  10: "Saturn", // Capricorn
  11: "Saturn", // Aquarius
  12: "Jupiter", // Pisces
};

export const planetRelations = {
  Sun: {
    friends: ["Moon", "Mars", "Jupiter"],
    enemies: ["Venus", "Saturn", "Rahu", "Ketu"],
    neutral: ["Mercury"],
    exalted: 1, // Aries
    debilitated: 7, // Libra
  },
  Moon: {
    friends: ["Sun", "Mercury"],
    enemies: ["Rahu", "Ketu"],
    neutral: ["Mars", "Jupiter", "Venus", "Saturn"],
    exalted: 2, // Taurus
    debilitated: 8, // Scorpio
  },
  Mars: {
    friends: ["Sun", "Moon", "Jupiter"],
    enemies: ["Mercury", "Rahu", "Ketu", "Saturn"],
    neutral: ["Venus"],
    exalted: 10, // Capricorn
    debilitated: 4, // Cancer
  },
  Mercury: {
    friends: ["Sun", "Venus"],
    enemies: ["Moon", "Rahu", "Ketu"],
    neutral: ["Mars", "Jupiter", "Saturn"],
    exalted: 6, // Virgo
    debilitated: 12, // Pisces
  },
  Jupiter: {
    friends: ["Sun", "Moon", "Mars"],
    enemies: ["Venus", "Mercury", "Rahu", "Ketu"],
    neutral: ["Saturn"],
    exalted: 4, // Cancer
    debilitated: 10, // Capricorn
  },
  Venus: {
    friends: ["Mercury"],
    enemies: ["Sun", "Moon", "Saturn"],
    neutral: ["Mars", "Jupiter"],
    exalted: 12, // Pisces
    debilitated: 6, // Virgo
  },
  Saturn: {
    friends: ["Mercury", "Venus"],
    enemies: ["Sun", "Moon"],
    neutral: ["Mars", "Jupiter"],
    exalted: 7, // Libra
    debilitated: 1, // Aries
  },
  Rahu: {
    friends: ["Venus", "Saturn", "Mercury"],
    enemies: ["Sun", "Moon"],
    neutral: ["Mars", "Jupiter"],
  },
  Ketu: {
    friends: ["Mars", "Jupiter", "Venus"],
    enemies: ["Sun", "Moon"],
    neutral: ["Mercury", "Saturn"],
  },
};

// Get the lord (ruler) of a sign
export function getLordOfSign(signNumber) {
  return signLords[signNumber];
}
