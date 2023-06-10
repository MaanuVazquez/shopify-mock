import { cssBundleHref } from '@remix-run/css-bundle'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import type { LinksFunction, V2_MetaFunction } from '@remix-run/node'

import Navbar from './components/Navbar'
import tailwind from './styles/tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
]

export const meta: V2_MetaFunction = () => [
  { title: 'Bloo Shopping' },
  { name: 'description', content: 'Welcome to Bloo!' }
]

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <div className='w-full px-4'>
          <Navbar />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
