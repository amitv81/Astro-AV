// src/utils/interpretationUtils.js
import { planetRelations, getLordOfSign } from "./planetRelations.js";

/**
 * Determines planetary condition based on sign, conjunction, and dignity
 */
export function getPlanetCondition(planet, sign, planetsInSameHouse) {
  const rel = planetRelations[planet.name];
  if (!rel) return null;

  // (1) Relation to sign lord
  const signLord = getLordOfSign(sign);
  let signRelation = "neutral";
  if (rel.friends.includes(signLord)) signRelation = "friend";
  else if (rel.enemies.includes(signLord)) signRelation = "enemy";

  // (2) Relation to other planets in same house
  let conjunction = "neutral";
  for (const other of planetsInSameHouse) {
    if (other.name === planet.name) continue;
    if (rel.friends.includes(other.name)) conjunction = "friend";
    else if (rel.enemies.includes(other.name)) conjunction = "enemy";
  }

  // (3) Exaltation or debilitation
  let dignity = "normal";
  if (sign === rel.exalted) dignity = "exalted";
  else if (sign === rel.debilitated) dignity = "debilitated";

  return { signRelation, conjunction, dignity };
}

/**
 * Produces a readable interpretation string
 */
export function interpretPlanetPlacement(planet, condition) {
  if (!condition) return "";

  const base = `${planet.name} is placed in a ${condition.signRelation} sign and has ${condition.conjunction} conjunctions.`;

  if (condition.dignity === "exalted") {
    return `${base} It is exalted — very strong and auspicious, giving fame, recognition, and fulfillment in this house.`;
  }
  if (condition.dignity === "debilitated") {
    return `${base} It is debilitated — weak and may cause struggles or losses related to this house.`;
  }

  if (
    condition.signRelation === "friend" &&
    condition.conjunction === "friend"
  ) {
    return `${base} Both sign and conjunction are friendly — strong positive outcomes are indicated.`;
  }
  if (condition.signRelation === "enemy" || condition.conjunction === "enemy") {
    return `${base} Adverse influences are present — may create tension or difficulties.`;
  }

  return `${base} Overall neutral influence — moderate results expected.`;
}
