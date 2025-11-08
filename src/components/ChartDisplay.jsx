import React from "react";

export default function ChartDisplay({ horoscope }) {
  if (!horoscope) return null;

  return (
    <div className="chart-display">
      <h2>Planetary Positions</h2>
      <p>
        <strong>Location:</strong> {horoscope.location.place} <br />
        <strong>Latitude:</strong> {horoscope.location.latitude}°,{" "}
        <strong>Longitude:</strong> {horoscope.location.longitude}°,{" "}
        <strong>Timezone:</strong> UTC+{horoscope.location.timezone}
      </p>

      <table>
        <thead>
          <tr>
            <th>Planet</th>
            <th>Rashi</th>
            <th>House</th>
          </tr>
        </thead>
        <tbody>
          {horoscope.planets.map((planet, idx) => (
            <tr key={idx}>
              <td>{planet.name}</td>
              <td>{planet.sign}</td>
              <td>{planet.house}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
