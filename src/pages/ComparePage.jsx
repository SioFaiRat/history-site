import { Link } from 'react-router-dom';
import { cities } from '../data/cities.js';
import { heroes } from '../data/heroes.js';

// Простая визуализация: столбцы длительности обороны + число героев в базе.
const maxDays = Math.max(...cities.map((c) => c.facts.defenseDays));

export default function ComparePage() {
  return (
    <div className="compare-page">
      <h1>Сравнение городов-героев</h1>
      <p>
        Сколько дней длилась оборона (или осада/оккупационный путь до
        освобождения) каждого города и сколько Героев Советского Союза связано
        с ним в нашей базе. Данные о героях пополняются через «Память народа».
      </p>

      <table className="compare-table">
        <thead>
          <tr>
            <th>Город</th>
            <th>Дни обороны</th>
            <th style={{ width: '40%' }} />
            <th>Героев в базе</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((c) => {
            const heroCount = heroes.filter((h) => h.cityId === c.id).length;
            const pct = (c.facts.defenseDays / maxDays) * 100;
            return (
              <tr key={c.id}>
                <td>
                  <Link to={`/cities/${c.id}`}>★ {c.name}</Link>
                </td>
                <td>{c.facts.defenseDays}</td>
                <td>
                  <div className="bar" style={{ width: `${pct}%` }} title={`${c.facts.defenseDays} дн.`} />
                </td>
                <td>{heroCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
