#!/usr/bin/env node
// Обогашение локальной базы героев данными из Wikidata (SPARQL).
// Wikidata — надёжный, легальный и структурированный источник без блокировок:
// связи «Человек» → «Награждён: Герой Советского Союза» → «Место рождения/гибели».
//
// Использование:
//   node scripts/fetch-heroes-wikidata.mjs                 # все герои с wikidataId
//   node scripts/fetch-heroes-wikidata.mjs --city volgograd # только один город
//
// Источник истины для MVP — локальные data/*.json; скрипт их ТОЛЬКО обогащает
// и записывает результат в src/data/heroes.js (автогенерируемый модуль).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'https://query.wikidata.org/sparql';
const UA = 'goroda-geroi-edu/0.1 (student project) ';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const HEROES_FILE = path.join(ROOT, 'src', 'data', 'heroes.js');

async function sparql(query) {
  const url = `${ENDPOINT}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/sparql-results+json' },
  });
  if (!res.ok) throw new Error(`Wikidata ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.results.bindings;
}

// Метаданные пачки сущностей по Q-ID.
async function fetchEntities(qids) {
  const values = qids.map((q) => `wd:${q}`).join(' ');
  const query = `
    SELECT ?e ?eLabel ?desc ?birth ?death ?birthPlaceLabel ?militaryBranchLabel WHERE {
      VALUES ?e { ${values} }
      OPTIONAL { ?e schema:description ?desc FILTER(LANG(?desc)="ru") }
      OPTIONAL { ?e wdt:P569 ?birth }
      OPTIONAL { ?e wdt:P570 ?death }
      OPTIONAL { ?e p:P19 ?bst. ?bst ps:P19 ?bpl. ?bpl rdfs:label ?birthPlaceLabel FILTER(LANG(?birthPlaceLabel)="ru") }
      OPTIONAL { ?e wdt:P241 ?mb }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "ru". }
    }`;
  const bindings = await sparql(query);
  const byId = {};
  for (const b of bindings) {
    const qid = b.e.value.split('/').pop();
    if (!byId[qid]) byId[qid] = { qid };
    const rec = byId[qid];
    if (b.eLabel) rec.label = b.eLabel.value;
    if (b.desc) rec.description = b.desc.value;
    if (b.birth) rec.birthDate = b.birth.value.slice(0, 10);
    if (b.death) rec.deathDate = b.death.value.slice(0, 10);
    if (b.birthPlaceLabel) rec.birthPlace = b.birthPlaceLabel.value;
    if (b.militaryBranchLabel) rec.branch = b.militaryBranchLabel.value;
  }
  return Object.values(byId);
}

const yearOf = (iso) => (iso ? Number(iso.slice(0, 4)) : null);

async function main() {
  const cityArgIdx = process.argv.indexOf('--city');
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .filter((f) => (cityArgIdx > -1 ? f === `${process.argv[cityArgIdx + 1]}.json` : true));

  const records = [];
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
    for (const h of data.heroes || []) records.push({ ...h, _file: f });
  }

  const withQid = records.filter((r) => r.wikidataId);
  console.log(`Героев в локальной базе: ${records.length}, с wikidataId: ${withQid.length}`);

  const enriched = [];
  for (let i = 0; i < withQid.length; i += 30) {
    const batch = withQid.slice(i, i + 30);
    const map = Object.fromEntries(
      (await fetchEntities(batch.map((b) => b.wikidataId))).map((e) => [e.qid, e]),
    );
    for (const rec of batch) {
      const wd = map[rec.wikidataId] || {};
      enriched.push({
        ...rec,
        name: wd.label || rec.name,
        birthPlace: wd.birthPlace || rec.birthPlace,
        branch: wd.branch || rec.branch,
        biography: wd.description || rec.biography,
        birthYear: wd.birthDate ? yearOf(wd.birthDate) : rec.birthYear ?? null,
        deathYear: wd.deathDate ? yearOf(wd.deathDate) : rec.deathYear ?? null,
        source: `Википедия/Wikidata (${rec.wikidataId})`,
      });
    }
    // вежливость к endpoint (правила Wikimedia: не более ~60 запросов/мин)
    await new Promise((r) => setTimeout(r, 1200));
  }

  const manualOnly = records.filter((r) => !r.wikidataId);
  const merged = [...manualOnly, ...enriched].sort((a, b) =>
    String(a.cityId).localeCompare(String(b.cityId)),
  );

  const banner =
    '// AUTO-GENERATED — НЕ редактировать вручную.\n' +
    '// Источник: data/*.json (ручная база MVP) + обогащение через Wikidata SPARQL.\n' +
    '// Обновление: node scripts/fetch-heroes-wikidata.mjs\n\nexport const heroes = ';
  fs.writeFileSync(
    HEROES_FILE,
    banner +
      JSON.stringify(merged, null, 2) +
      ';\n\nexport const getHeroesByCity = (cityId) => heroes.filter((h) => h.cityId === cityId);\n',
  );
  console.log(`Готово: ${merged.length} героев записано в src/data/heroes.js`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
