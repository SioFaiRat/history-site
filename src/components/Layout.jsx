import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <Link to="/" className="logo">
          ★ Города-герои
        </Link>
        <nav className="main-nav">
          <Link to="/">Карта</Link>
          <Link to="/timeline">Хронология</Link>
          <Link to="/compare">Сравнение</Link>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          Источники: «Память народа» (pamyat-naroda.ru), «Подвиг народа»
          (podvignaroda.ru), ОБД «Мемориал» (obd-memorial.ru), Росархив.
        </p>
        <p>Учебный проект о 13 городах-героях Великой Отечественной войны.</p>
      </footer>
    </div>
  );
}
