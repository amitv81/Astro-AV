// src/components/PlanetInterpretations.jsx
import React from "react";
import {
  getPlanetCondition,
  interpretPlanetPlacement,
} from "../utils/interpretationUtils";
import { getLordOfSign, planetRelations } from "../utils/planetRelations";

const houseMeanings = {
  1: "Self, Personality, Health, and Vitality",
  2: "Wealth, Family, Speech, and Values",
  3: "Courage, Siblings, Communication, and Efforts",
  4: "Home, Mother, Property, and Emotional Peace",
  5: "Education, Children, Creativity, and Intelligence",
  6: "Enemies, Diseases, Competition, and Service",
  7: "Marriage, Partnerships, and Public Relations",
  8: "Longevity, Transformation, Secrets, and Inheritance",
  9: "Luck, Religion, Higher Knowledge, and Father",
  10: "Career, Karma, Profession, and Reputation",
  11: "Gains, Social Circle, Elder Siblings, and Desires",
  12: "Expenditure, Moksha, Foreign Lands, and Isolation",
};

const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const PlanetInterpretations = ({ horoscope }) => {
  if (!horoscope || !horoscope.planets) {
    return <p>No horoscope data available.</p>;
  }

  const houses = {};
  horoscope.planets.forEach((planet) => {
    if (!houses[planet.house]) houses[planet.house] = [];
    houses[planet.house].push(planet);
  });

  const ascendantSign =
    horoscope.planets.find((p) => p.name === "Ascendant")?.current_sign || 1;

  const allHouses = Array.from({ length: 12 }, (_, i) => {
    const houseNo = i + 1;
    const signNo = ((ascendantSign + i - 1) % 12) + 1;
    const signName = signs[signNo - 1];
    return { houseNo, signNo, signName, planets: houses[houseNo] || [] };
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>House-Wise Interpretations</h2>

      {allHouses.map(({ houseNo, signNo, signName, planets }) => {
        const houseLord = getLordOfSign(signNo);
        const lordDetails = getLordCondition(houseLord, horoscope.planets);
        const houseInterpretation = getHouseInterpretation(
          planets,
          lordDetails
        );

        return (
          <div key={houseNo} style={styles.houseCard}>
            <h3 style={styles.houseHeading}>
              🏠 House {houseNo} —{" "}
              <span style={styles.houseMeaning}>{houseMeanings[houseNo]}</span>
            </h3>

            <p style={styles.signLine}>
              <strong>Sign:</strong> {signName}
            </p>

            <p style={styles.lordLine}>
              <strong>Lord:</strong> {houseLord} —{" "}
              {lordDetails
                ? lordDetails.description
                : "information not available"}
            </p>

            <p style={styles.summary}>{houseInterpretation.summary}</p>

            {planets.length > 0 ? (
              planets.map((planet) => {
                const condition = getPlanetCondition(
                  planet,
                  planet.sign,
                  planets
                );
                const interpretation = interpretPlanetPlacement(
                  planet,
                  condition
                );
                return (
                  <div key={planet.name} style={styles.planetBlock}>
                    <h4 style={styles.planetName}>{planet.name}</h4>
                    <p style={styles.text}>{interpretation}</p>
                  </div>
                );
              })
            ) : (
              <p style={styles.emptyText}>No planets in this house.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * 🧠 Evaluate Lord’s Strength: Own Sign, Exalted, Debilitated, Friend/Enemy
 */
function getLordCondition(lordName, planets) {
  const rel = planetRelations[lordName];
  if (!rel) return null;

  const lordPlanet = planets.find((p) => p.name === lordName);
  if (!lordPlanet) {
    return {
      description: "Lord not present in chart data.",
      strength: "neutral",
    };
  }

  const lordSign = lordPlanet.sign;
  const signLord = getLordOfSign(lordSign);

  let description = "";
  let strength = "neutral";

  // 🌟 Own sign
  if (getLordOfSign(lordSign) === lordName) {
    strength = "very strong";
    description = `${lordName} is in its own sign (${
      signs[lordSign - 1]
    }) — this gives stability, control, and strong results for this house.`;
    return { strength, description };
  }

  // 🌞 Exaltation
  if (lordSign === rel.exalted) {
    strength = "very strong";
    description = `${lordName} is exalted in ${
      signs[lordSign - 1]
    } — very auspicious and powerful placement.`;
    return { strength, description };
  }

  // 🌚 Debilitation
  if (lordSign === rel.debilitated) {
    strength = "weak";
    description = `${lordName} is debilitated in ${
      signs[lordSign - 1]
    } — it may weaken the house results or bring struggles.`;
    return { strength, description };
  }

  // 🌗 Relationship with sign lord
  let relation = "neutral";
  if (rel.friends.includes(signLord)) relation = "friend";
  else if (rel.enemies.includes(signLord)) relation = "enemy";

  if (relation === "friend") {
    strength = "strong";
    description = `${lordName} is in a friendly sign (${
      signs[lordSign - 1]
    }) — it supports this house well.`;
  } else if (relation === "enemy") {
    strength = "weak";
    description = `${lordName} is in an enemy sign (${
      signs[lordSign - 1]
    }) — it may challenge this house's matters.`;
  } else {
    description = `${lordName} is in a neutral sign (${
      signs[lordSign - 1]
    }) — moderate impact on this house.`;
  }

  return { strength, description };
}

function getHouseInterpretation(planets, lordDetails) {
  let good = 0;
  let bad = 0;
  let neutral = 0;

  planets.forEach((planet) => {
    const condition = getPlanetCondition(planet, planet.sign, planets);
    if (!condition) return;
    if (condition.dignity === "exalted" || condition.signRelation === "friend")
      good++;
    else if (
      condition.dignity === "debilitated" ||
      condition.signRelation === "enemy"
    )
      bad++;
    else neutral++;
  });

  if (
    lordDetails?.strength === "very strong" ||
    lordDetails?.strength === "strong"
  )
    good++;
  if (lordDetails?.strength === "weak") bad++;

  let summary = "";
  if (good > bad && good >= neutral) {
    summary =
      "✨ This house is strong and auspicious — prosperity and stability are indicated.";
  } else if (bad > good) {
    summary =
      "⚠️ This house shows weakness or instability — challenges may appear in its areas.";
  } else {
    summary =
      "⚖️ Mixed influences — results vary depending on planetary periods and aspects.";
  }

  return { summary };
}

export default PlanetInterpretations;

const styles = {
  container: {
    padding: "1.5rem",
    fontFamily: "'Merriweather', serif",
    background: "#fdfbf6",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#3b2d1f",
    fontSize: "1.8rem",
  },
  houseCard: {
    background: "#fffdf9",
    borderRadius: "12px",
    padding: "1.2rem",
    marginBottom: "1.5rem",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  houseHeading: {
    color: "#b25c00",
    fontSize: "1.2rem",
    marginBottom: "0.3rem",
  },
  houseMeaning: {
    fontStyle: "italic",
    color: "#555",
  },
  signLine: { color: "#444", fontSize: "0.95rem", marginBottom: "0.5rem" },
  lordLine: {
    background: "#f4efe3",
    padding: "0.5rem 0.8rem",
    borderRadius: "8px",
    fontSize: "0.9rem",
    marginBottom: "0.8rem",
  },
  summary: {
    background: "#f7f2e7",
    padding: "0.8rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  planetBlock: {
    borderTop: "1px solid #eee",
    paddingTop: "0.6rem",
    marginTop: "0.6rem",
  },
  planetName: { color: "#c97a00", fontWeight: "bold" },
  text: { color: "#333", fontSize: "0.95rem" },
  emptyText: { color: "#777", fontStyle: "italic", fontSize: "0.9rem" },
};
