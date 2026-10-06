# PW Places

Карта воспоминаний о Perfect World. Next.js App Router, React, TypeScript, Pannellum. Карта и 10 исходных панорам хранятся локально в `public/assets`; отдельный backend не нужен.

## Разработка

Внешние инструменты закреплены в Nix/devenv; префикс команд — `pw-`.

```sh
direnv allow
devenv shell -- pnpm install --frozen-lockfile --ignore-scripts
devenv shell -- pw-dev
```

В активированном direnv shell можно вызывать `pw-dev` напрямую. Node 24 и pnpm 12.3.4 предоставляет Nix; не устанавливайте глобальные CLI. `pnpm-lock.yaml` содержит только новые зависимости, старый npm lockfile удалён без установки.

```sh
devenv shell -- pw-format
devenv shell -- pw-check
devenv shell -- pw-build
devenv shell -- pw-test-e2e
devenv shell -- pw-audit
```

Тесты браузера используют Chromium из Nix. Не запускайте `playwright install`. Сначала нужна production-сборка. Сборка и dev копируют готовый Pannellum с лицензией из закреплённого npm-пакета в `public/vendor`; установочные скрипты зависимостей выключены.

## Agent workflows

The Agent Workflows Codex plugin is declared in `.agents/plugins/marketplace.json`, pinned to a reviewed Git commit, and enabled in `.codex/config.toml`. Project instructions remain in `AGENTS.md`.

From this trusted project, use Codex's plugin manager:

```sh
codex plugin marketplace add .
codex plugin add agent-workflows@agent-workflows
```

The desktop app can also install it from the Agent Workflows source in the Plugins Directory. Start a new Codex session after installation. Application dependencies, CI, and deployment do not require Codex or the plugin. To update, review a new source commit, change the catalog's `source.sha`, reinstall/refresh through Codex, and commit the catalog change. Keep personal agent state ignored.

## Структура

- `src/app` — серверная карта, страницы `/places/[id]`, обработка ошибок и `/api/places/[id]`.
- `src/data/places.json` — названия, координаты на карте 1440×1080, изображения и необязательная музыка.
- `src/components/panorama.tsx` — клиентский WebGL-просмотр с очисткой ресурсов, ошибками загрузки и управлением звуком.
- `public/assets` — исходная карта, панорамы, игровой шрифт, панель предметов, руна и загрузочные экраны.

Данные страницы читаются на сервере; API доступен для внешних клиентов и возвращает объект места (это новый контракт, не прежний массив имён файлов). Неизвестный ID даёт 404. Произвольные пути с диска и внешний прокси отсутствуют.

Музыкальных файлов в архиве нет; аудиоплеер не отображается. Поле `audio` зарезервировано в каталоге, но воспроизведение не подключено. Чтобы восстановить Лагерь Водопада, добавьте панораму и заполните `images`. Исторические панорамы использовали вертикальный угол 90°.

Интерфейс сохраняет исходный вид: карта на весь экран с игровыми маркерами и названиями при наведении; в панораме — девять ячеек предметов, руна в девятой возвращает на карту. Заголовков, списка мест и постоянных подсказок поверх сцены нет.

Оригинальный анимированный курсор восстановлен из `public/assets/normal.ani`: 12 кадров 32×32, hotspot 0×0, цикл 2 секунды. При dev/build `scripts/game-cursor.mjs` преобразует исходные BGRA-кадры в PNG и генерирует CSS. Новых зависимостей и клиентского декодера нет. Курсор наследуется ссылками, кнопками и слоем перетаскивания Pannellum. На touch-экранах он не включается; при `prefers-reduced-motion` используется первый неподвижный кадр. Нативный указатель остаётся запасным вариантом браузера. Генерируемый `src/app/game-cursor.generated.css` не нужно редактировать или коммитить.

## Vercel

Импортируйте репозиторий с корневой директорией `.` и preset Next.js, Node 24.x. `vercel.json` задаёт frozen install и build. На Vercel Node/pnpm предоставляет платформа; Nix используется локально, версии согласованы с `engines` и `packageManager`. Environment variables для контента не нужны. Не задавайте старый `NX_BACKEND_ADDRESS`.

В layout подключены Web Analytics и Speed Insights; в `src/instrumentation.ts` — Vercel OpenTelemetry (`pw-places`). Включите Analytics и Speed Insights в настройках Vercel-проекта. Фактический приём событий проверяется после публикации; локальная сборка этого не подтверждает. Дополнительный OTel collector не задан: на Vercel используется интеграция платформы.

Перед публичным запуском повторите аудит зависимостей и проверьте доступные обновления безопасности Next.js.
