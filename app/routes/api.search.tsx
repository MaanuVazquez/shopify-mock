import { json, type LoaderArgs } from '@remix-run/node'

import { getProducts } from '~/services/api.server'

export async function loader(args: LoaderArgs) {
  const productsResponse = await getProducts('t-shirt')

  return json({ products: productsResponse.edges })
}
