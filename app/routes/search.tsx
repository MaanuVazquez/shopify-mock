import { json, type LoaderArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useCallback, useEffect, useState } from 'react'

import type { ProductItem } from '~/types'

import Product from '~/components/Product'
import SearchBar from '~/components/SearchBar'
import { getProducts } from '~/services/api.server'

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const after = url.searchParams.get('after')
  const before = url.searchParams.get('before')
  const products = await getProducts(q as string, after as string, before as string)

  return json({ products, q })
}

export default function Search() {
  const loaderData = useLoaderData<typeof loader>()
  const [products, setProducts] = useState(loaderData.products.edges)
  const [pageInfo, setPageInfo] = useState(loaderData.products.pageInfo)
  const fetcher = useFetcher()

  useEffect(() => {
    // If the data from the loader changed (i.e. the user searched for something else)
    setProducts(loaderData.products.edges)
    setPageInfo(loaderData.products.pageInfo)
  }, [loaderData])

  useEffect(() => {
    if (!fetcher.data) {
      return
    }

    // If the data from the fetcher chaged (i.e. the user clicked on the next or previous page)
    setProducts(fetcher.data?.products.edges)
    setPageInfo(fetcher.data?.products.pageInfo)
  }, [fetcher.data])

  const previousPageHandler = useCallback(() => {
    if (!pageInfo.hasPreviousPage) {
      return
    }

    const before = products[0].cursor

    const query: Record<string, string> = {
      before
    }

    if (loaderData.q) {
      query.q = loaderData.q
    }

    fetcher.submit(query, {
      action: '/search',
      method: 'get'
    })
  }, [pageInfo.hasPreviousPage, products, loaderData.q, fetcher])

  const nextPageHandler = useCallback(() => {
    if (!pageInfo.hasNextPage) {
      return
    }

    const after = products[products.length - 1].cursor

    const query: Record<string, string> = {
      after
    }

    if (loaderData.q) {
      query.q = loaderData.q
    }

    fetcher.submit(query, {
      action: '/search',
      method: 'get'
    })
  }, [loaderData.q, products, fetcher, pageInfo.hasNextPage])

  return (
    <div>
      <div className='mx-auto p-10 flex align-middle justify-center items-center gap-x-2'>
        <SearchBar />
      </div>
      <main className='w-full h-full'>
        <div className='flex flex-wrap justify-center gap-x-2 gap-y-5'>
          {products.map((product, index) => (
            <Product key={product.node.id} product={product.node as ProductItem} />
          ))}
        </div>
        <div className='join grid grid-cols-2 mx-auto w-80 my-20'>
          <button onClick={previousPageHandler} className='join-item btn btn-outline'>
            Previous page
          </button>
          <button onClick={nextPageHandler} className='join-item btn btn-outline'>
            Next
          </button>
        </div>
      </main>
    </div>
  )
}
