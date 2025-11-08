export async function getHoroscope({ date, time, place }) {
  // const API_KEY = "YOUR_API_KEY";
  // const GEO_URL = "https://json.freeastrologyapi.com/geo-details";
  // const PLANETS_URL = "https://json.freeastrologyapi.com/v1/planets";

  try {
    // 🧩 STEP 1 — Commented out all real API calls for now
    /*
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
    const loc = geoData[0];
    const latitude = parseFloat(loc.latitude);
    const longitude = parseFloat(loc.longitude);
    const timezone = parseFloat(loc.timezone_offset || 5.5);

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
    const planetsData = data?.output?.[1];
    */

    // 🧩 STEP 2 — Static mock response (the one you shared)
    const staticData = {
      statusCode: 200,
      input: {
        year: 1981,
        month: 7,
        date: 24,
        hours: 5,
        minutes: 0,
        latitude: 26.22983,
        longitude: 78.17337,
        timezone: 5.5,
        ayanamsha: "lahiri",
      },
      output: [
        {},
        {
          Ascendant: {
            current_sign: 3,
            fullDegree: 88.2222479410811,
            normDegree: 28.222247941081093,
            isRetro: "false",
          },
          Sun: {
            current_sign: 4,
            house_number: 2,
            fullDegree: 97.40820579155965,
            normDegree: 7.408205791559652,
            isRetro: "false",
          },
          Moon: {
            current_sign: 1,
            house_number: 11,
            fullDegree: 1.8609865587741687,
            normDegree: 1.8609865587741687,
            isRetro: "false",
          },
          Mars: {
            current_sign: 3,
            house_number: 1,
            fullDegree: 70.19258133349965,
            normDegree: 10.192581333499646,
            isRetro: "false",
          },
          Mercury: {
            current_sign: 3,
            house_number: 1,
            fullDegree: 80.02263814092859,
            normDegree: 20.022638140928592,
            isRetro: "false",
          },
          Jupiter: {
            current_sign: 6,
            house_number: 4,
            fullDegree: 161.32526993869885,
            normDegree: 11.325269938698852,
            isRetro: "false",
          },
          Venus: {
            current_sign: 5,
            house_number: 3,
            fullDegree: 125.68896811709007,
            normDegree: 5.68896811709007,
            isRetro: "false",
          },
          Saturn: {
            current_sign: 6,
            house_number: 4,
            fullDegree: 161.31781154483693,
            normDegree: 11.317811544836928,
            isRetro: "false",
          },
          Rahu: {
            current_sign: 4,
            house_number: 2,
            fullDegree: 98.1204184775481,
            normDegree: 8.1204184775481,
            isRetro: "true",
          },
          Ketu: {
            current_sign: 10,
            house_number: 8,
            fullDegree: 278.1204184775481,
            normDegree: 8.120418477548128,
            isRetro: "true",
          },
          Uranus: {
            current_sign: 8,
            house_number: 6,
            fullDegree: 212.50902696645463,
            normDegree: 2.509026966454627,
            isRetro: "true",
          },
          Neptune: {
            current_sign: 8,
            house_number: 6,
            fullDegree: 238.9347894218304,
            normDegree: 28.934789421830402,
            isRetro: "true",
          },
          Pluto: {
            current_sign: 6,
            house_number: 4,
            fullDegree: 178.08163362808267,
            normDegree: 28.08163362808267,
            isRetro: "false",
          },
        },
      ],
    };

    const planetsData = staticData.output[1];

    // 🧩 STEP 3 — Convert to usable format
    const planetsArray = Object.entries(planetsData).map(([name, p]) => ({
      name,
      sign: p.current_sign,
      degree: p.normDegree,
      house: p.house_number || null,
      isRetro: p.isRetro === "true",
    }));

    // 🧩 STEP 4 — Return final horoscope object
    const horoscope = {
      location: {
        place: "Gwalior, Madhya Pradesh, India",
        latitude: 26.22983,
        longitude: 78.17337,
        timezone: 5.5,
      },
      planets: planetsArray,
    };

    console.log("✅ Using static horoscope data:", horoscope);
    return horoscope;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return null;
  }
}
