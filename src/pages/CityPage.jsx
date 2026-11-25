import { useParams, Link } from 'react-router-dom';
import { getCityById } from '../data/cities.js';
import { getHeroesByCity } from '../data/heroes.js';
import { getMonumentsByCity } from '../data/monuments.js';
import { getDocumentsByCity } from '../data/documents.js';
import { getEventsByCity } from '../data/events.js';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function CityPage() {
  const { cityId } = useParams();
  const city = getCityById(cityId);

  if (!city) {
    return (
      <div className="city-page">
        <h1>Город не найден</h1>
        <Link to="/">← Вернуться на карту</Link>
      </div>
    );
  }

  const heroes = getHeroesByCity(city.id);
  const monuments = getMonumentsByCity(city.id);
  const documents = getDocumentsByCity(city.id);
  const events = getEventsByCity(city.id).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <article className="city-page">
      <header className="city-page__header">
        <span className="city-page__star">★</span>
        <div>
          <h1>{city.name}</h1>
          {city.modernName !== city.name && (
            <p className="city-page__modern">современное название — {city.modernName}</p>
          )}
          <p className="city-page__award">
            Звание присвоено: {formatDate(city.awardDate)}
          </p>
        </div>
      </header>

      {/* Вкладки-разделы города */}
      <section className="city-section" id="history">
        <h2>История обороны</h2>
        <p>{city.shortDescription}</p>
        <ul className="timeline-mini">
          {events.map((e) => (
            <li key={e.id}>
              <strong>{formatDate(e.date)}</strong> — {e.title}. {e.description}
            </li>
          ))}
        </ul>
        <p>
          TODO: добавить карты боёв и развёрнутую хронологию (по материалам
          «Памяти народа» — боевые документы подразделений по направлению
          боёв «{city.modernName}»).
        </p>
      </section>

      <section className="city-section" id="heroes">
        <h2>Герои</h2>
        {heroes.length === 0 ? (
          <p className="placeholder">
            Список героев заполняется через API «Память народа». Планируется
            фильтр по родам войск.
          </p>
        ) : (
          <ul className="heroes-list">
            {heroes.map((h) => (
              <li key={h.id} className="hero-card">
                <h3>{h.name}</h3>
                <p className="hero-card__meta">
                  {h.rank} · {h.branch} · награда: {formatDate(h.awardDate)}
                </p>
                <p className="hero-card__birth">Место рождения: {h.birthPlace}</p>
                <p>{h.biography}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="city-section" id="monuments">
        <h2>Памятники и мемориалы</h2>
        {monuments.length === 0 ? (
          <p className="placeholder">Мемориалы этого города ещё добавляются.</p>
        ) : (
          monuments.map((m) => (
            <div key={m.id} className="monument-card">
              <h3>{m.name}</h3>
              <p>{m.description}</p>
              <p className="monument-card__coords">
                Координаты: {m.coordinates.join(', ')} ·{' '}
                <a
                  href={`https://www.openstreetmap.org/?mlat=${m.coordinates[0]}&mlon=${m.coordinates[1]}#map=15/${m.coordinates[0]}/${m.coordinates[1]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  показать на карте
                </a>
              </p>
              {/* TODO: фото от дизайнера в public/images/monuments/ */}
            </div>
          ))
        )}
      </section>

      <section className="city-section" id="documents">
        <h2>Документы</h2>
        {documents.length === 0 ? (
          <p className="placeholder">
            Сканы из архивов подключаются через сервис{' '}
            <code>src/services/pamyatNaroda.js</code>.
          </p>
        ) : (
          <ul className="docs-list">
            {documents.map((d) => (
              <li key={d.id}>
                <a href={d.scanUrl} target="_blank" rel="noreferrer">
                  {d.title}
                </a>{' '}
                <em>({d.archiveSource}, {formatDate(d.date)})</em>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="city-section" id="facts">
        <h2>Цифры и факты</h2>
        <dl className="facts">
          <div>
            <dt>Дней обороны</dt>
            <dd>{city.facts.defenseDays}</dd>
          </div>
          <div>
            <dt>Начало</dt>
            <dd>{formatDate(city.defenseStart)}</dd>
          </div>
          <div>
            <dt>Окончание</dt>
            <dd>{formatDate(city.defenseEnd)}</dd>
          </div>
        </dl>
        <ul>
          {city.facts.keyEvents.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <p className="placeholder">
          TODO: инфографика (потери, награждённые) после подключения данных
          ОБД «Мемориал» и Росархива.
        </p>
      </section>

      <footer>
        <Link to="/">← К карте всех городов</Link>
      </footer>
    </article>
  );
}
