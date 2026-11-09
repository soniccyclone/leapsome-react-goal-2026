const repl = require('node:repl')
const { chromium } = require('playwright')

const base = process.env.BASE_URL

const help = `
Headless Chromium against ${base}. Top-level await works.

  page                              the Playwright Page: https://playwright.dev/docs/api/class-page
  await goto('/game/abc')           navigate and print the HTTP status; page.goto itself returns a large Response object
  await reload()                    reload and print the URL
  await page.getByRole('link', { name: 'Hades' }).click()
  await page.evaluate(() => document.title)
  await games()                     the list the app holds in localStorage
  await add('Hades', 'PC')          fill the form and submit it
  await shot('name')                screenshot to test-results/name.png on your machine
  await html()                      the current DOM as HTML
  logs                              every console message and page error so far
  .exit                             quit
`

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL: base })
  const logs = []
  page.on('console', (m) => {
    logs.push(`[${m.type()}] ${m.text()}`)
    console.log(`\nbrowser ${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => {
    logs.push(`[pageerror] ${e.message}`)
    console.log(`\nbrowser error: ${e.message}`)
  })
  await page.goto('/')
  console.log(help)
  const r = repl.start({ prompt: 'browser> ' })
  Object.assign(r.context, {
    browser,
    page,
    logs,
    games: () => page.evaluate(() => JSON.parse(localStorage.getItem('backlog.games') ?? '[]')),
    add: async (title, platform = '') => {
      await page.getByLabel('Title').fill(title)
      await page.getByLabel('Platform').fill(platform)
      await page.getByRole('button', { name: 'Add game' }).click()
    },
    shot: async (name = 'shot') => {
      const path = `test-results/${name}.png`
      await page.screenshot({ path })
      return path
    },
    html: () => page.content(),
    goto: async (path) => (await page.goto(path)).status(),
    reload: async () => {
      await page.reload()
      return page.url()
    },
  })
  r.on('exit', () => browser.close().then(() => process.exit(0)))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
