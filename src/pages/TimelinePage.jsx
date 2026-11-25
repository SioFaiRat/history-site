import { Link } from 'react-router-dom';
import { events } from '../data/events.js';
import { getCityById } from '../data/cities.js';

export default function TimelinePage() {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="timeline-page">
      <h1>Общая хронология войны</h1>
      <p>
        Ключевые события 1941–1945 годов с привязкой к городам-героям. Каждая
        запись ведёт в раздел соответствующего города.
      </p>
      <ol className="timeline">
        {sorted.map((e) => {
          const city = getCityById(e.cityId);
          return (
            <li key={e.id} className="timeline__item">
              <span className="timeline__date">
                {new Date(e.date).toLocaleDateString('ru-RU')}
              </span>
              <div>
                <strong>{e.title}</strong>
                <p>{e.description}</p>
                {city && (
                  <Link to={`/cities/${city.id}`}>★ {city.name} →</Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
