import { Form, Link, useFetcher } from '@remix-run/react'
import { useCallback, useMemo, useRef } from 'react'

import type { ChangeEvent } from 'react'
import type { ProductEdge } from '~/__generated__/graphql'

export default function SearchBar() {
  const fetcher = useFetcher()
  const throttleTimeout = useRef<NodeJS.Timeout>()

  const onInputHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(throttleTimeout.current)
      throttleTimeout.current = setTimeout(() => {
        fetcher.submit(
          { q: event.target.value },
          {
            method: 'get',
            action: '/api/search'
          }
        )
      }, 500)
    },
    [fetcher]
  )

  const productsByTitle: { title: string; handle: string }[] | undefined = fetcher.data?.products.map(
    (product: ProductEdge) => ({ title: product.node.title, handle: product.node.handle })
  )

  const autocompleteProducts = useMemo(() => {
    if (!productsByTitle) {
      return <li>Search something</li>
    }

    return productsByTitle.map(product => (
      <Link
        key={product.handle}
        className='my-2 py-2 hover:bg-primary hover:text-primary-content hover:rounded-md'
        to={`/products/${product.handle}`}
      >
        {product.title}
      </Link>
    ))
  }, [productsByTitle])

  return (
    <Form method='get' action='/search' className='flex items-center gap-x-4' replace>
      <h1 className='text-xl'>Search</h1>
      <div className={`dropdown z-10 ${(productsByTitle?.length && 'dropdown-open') || ''}`}>
        <input autoComplete='off' onInput={onInputHandler} name='q' className='input input-bordered !w-[400px]' />
        <ul tabIndex={0} className='dropdown-content menu p-2 mt-2 shadow bg-base-100 w-full'>
          {autocompleteProducts}
        </ul>
      </div>
      <button className='btn btn-primary'>Find out</button>
    </Form>
  )
}
