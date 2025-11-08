// src/api.js
export async function getHoroscope({ date, time, place }) {
  const API_KEY = "f7Vn61ev3j636UproPaOi9ZARSxOHKp15HF8VWSl"; // 🔑 Replace with your key
  const GEO_URL = "https://json.freeastrologyapi.com/geo-details";
  const PLANETS_URL = "https://json.freeastrologyapi.com/planets";

  try {
    // 🌍 1️⃣ Get geolocation
    const geoRes = await fetch(GEO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ location: place }),
    });

    if (!geoRes.ok) throw new Error("Failed to fetch geo details");
    const geoData = await geoRes.json();

    if (!Array.isArray(geoData) || geoData.length === 0)
      throw new Error("Invalid geo data");

    const loc = geoData[0];
    const latitude = parseFloat(loc.latitude);
    const longitude = parseFloat(loc.longitude);
    const timezone = parseFloat(loc.timezone_offset || 5.5);

    // 🕓 2️⃣ Prepare birth details
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    const payload = {
      year,
      month,
      date: day,
      hours,
      minutes,
      latitude,
      longitude,
      timezone,
      ayanamsha: "lahiri",
    };

    // 🔭 3️⃣ Fetch planets
    const response = await fetch(PLANETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to fetch planets data");
    const data = await response.json();

    console.log("🪐 Full planets response:", data);

    // ✅ 4️⃣ Extract planet positions safely
    const planetsData = data?.output?.[1];
    if (!planetsData) throw new Error("No planets data in response");

    // Convert object to array for mapping
    const planetsArray = Object.entries(planetsData).map(([name, p]) => ({
      name,
      sign: p.current_sign,
      degree: p.normDegree,
      house: p.house_number || null,
      isRetro: p.isRetro === "true",
    }));

    // 5️⃣ Prepare final structured output
    const horoscope = {
      location: {
        place: loc.complete_name,
        latitude,
        longitude,
        timezone,
      },
      planets: planetsArray,
    };

    console.log("✅ Parsed horoscope:", horoscope);
    return horoscope;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return null;
  }
}
