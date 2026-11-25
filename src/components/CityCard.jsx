import { Link } from 'react-router-dom';

export default function CityCard({ city }) {
  return (
    <Link to={`/cities/${city.id}`} className="city-card">
      <span className="city-card__star">★</span>
      <h3>{city.name}</h3>
      {city.modernName !== city.name && (
        <p className="city-card__modern">{city.modernName}</p>
      )}
      <p className="city-card__desc">{city.shortDescription}</p>
      <p className="city-card__days">Оборона: {city.facts.defenseDays} дн.</p>
    </Link>
  );
}
