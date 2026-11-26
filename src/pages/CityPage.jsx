import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCityById } from '../data/cities';
import { getMonumentsByCity } from '../data/monuments';
import { getDocumentsByCity } from '../data/documents';
import { getEventsByCity } from '../data/events';
import { fetchHeroesFromWikidata } from '../services/wikidata';
import { getHeroesByCity } from '../data/heroes';

const TABS = [
  { id: 'history', label: 'История' },
  { id: 'heroes', label: 'Герои' },
  { id: 'monuments', label: 'Памятники' },
  { id: 'documents', label: 'Документы' },
  { id: 'facts', label: 'Цифры и факты' },
];

function daysBetween(startISO, endISO) {
  if (!startISO || !endISO) return '—';
  const ms = new Date(endISO) - new Date(startISO);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function CityPage() {
  const { cityId } = useParams();
  const city = getCityById(cityId);
  const [tab, setTab] = useState('history');

  // Состояния для героев из API
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  if (!cityId) return;
  setIsLoading(true);
  setHeroes([]);
  
  fetchHeroesFromWikidata(cityId)
    .then((apiData) => {
      if (apiData.length > 0) {
        setHeroes(apiData);
      } else {
        // Fallback на локальную базу
        console.log(`Wikidata вернул пусто для ${cityId}, используем локальную базу`);
        setHeroes(getHeroesByCity(cityId));
      }
      setIsLoading(false);
    })
    .catch((err) => {
      console.error('Ошибка Wikidata, используем локальную базу:', err);
      setHeroes(getHeroesByCity(cityId));
      setIsLoading(false);
    });
}, [cityId]);
  // Если город не найден в базе — показываем заглушку
  if (!city) {
    return (
      <div className="city-page">
        <p>Город «{cityId}» не найден.</p>
        <Link to="/" className="back-link">← Вернуться на карту</Link>
      </div>
    );
  }

  const monuments = getMonumentsByCity(cityId);
  const documents = getDocumentsByCity(cityId);
  const events = getEventsByCity(cityId);
  const defenseDays = daysBetween(city.defenseStart, city.defenseEnd);

  return (
    <div className="city-page">
      <header className="city-header">
        <Link to="/" className="back-link">← Карта</Link>
        <h1>{city.name}</h1>
        {city.modernName && city.modernName !== city.name && (
          <p className="modern-name">Современное название: {city.modernName}</p>
        )}
      </header>

      <nav className="city-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="city-content">
        {tab === 'history' && (
          <div>
            <p className="city-desc">{city.shortDescription || city.description}</p>
            {events.length > 0 && (
              <ul className="event-list">
                {events.map((e) => (
                  <li key={e.id}>
                    <span className="event-date">{formatDate(e.date)}</span>
                    <strong>{e.title}</strong>
                    <p>{e.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'heroes' && (
          <div>
            <p className="tab-hint">
              Герои — уроженцы города, данные подгружаются из Wikidata.
            </p>
            {isLoading ? (
              <p>Загрузка данных...</p>
            ) : heroes.length === 0 ? (
              <p>
                Данные о героях-уроженцах для этого города в Wikidata не найдены.
                Возможно, список будет пополнен позже из локальной базы.
              </p>
            ) : (
              <div className="hero-grid">
                {heroes.map((h) => (
                  <article key={h.id} className="hero-card">
                    <h3>{h.name}</h3>
                    <p className="hero-rank">{h.rank}</p>
                    <p className="hero-birth">
                      Год рождения: {h.birthDate ? h.birthDate.split('-')[0] : 'неизвестно'}
                    </p>
                    <p className="hero-bio">{h.biography}</p>
                    <small className="hero-source">Источник: {h.source}</small>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'monuments' && (
          <div className="monument-grid">
            {monuments.length === 0 ? (
              <p>Список памятников пока не заполнен.</p>
            ) : (
              monuments.map((m) => (
                <article key={m.id} className="monument-card">
                  {m.photoUrl && (
                    <img src={m.photoUrl} alt={m.name} className="monument-photo" />
                  )}
                  <h3>{m.name}</h3>
                  <p>{m.description}</p>
                </article>
              ))
            )}
          </div>
        )}

        {tab === 'documents' && (
          <ul className="doc-list">
            {documents.length === 0 ? (
              <li>Документы пока не добавлены.</li>
            ) : (
              documents.map((d) => (
                <li key={d.id}>
                  <a href={d.scanUrl} target="_blank" rel="noreferrer">
                    {d.title}
                  </a>
                  <span className="doc-meta">
                    {formatDate(d.date)} · источник: {d.archiveSource}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}

        {tab === 'facts' && (
          <dl className="facts">
            <div>
              <dt>Период обороны</dt>
              <dd>
                {formatDate(city.defenseStart)} — {formatDate(city.defenseEnd)}
              </dd>
            </div>
            <div>
              <dt>Дней обороны</dt>
              <dd>{defenseDays}</dd>
            </div>
            <div>
              <dt>Героев в базе (Wikidata)</dt>
              <dd>{heroes.length}</dd>
            </div>
            <div>
              <dt>Памятников</dt>
              <dd>{monuments.length}</dd>
            </div>
            <div>
              <dt>Документов</dt>
              <dd>{documents.length}</dd>
            </div>
          </dl>
        )}
      </section>

      <footer className="city-footer">
        <Link to="/" className="back-link">← К карте всех городов</Link>
      </footer>
    </div>
  );
}
