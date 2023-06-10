import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import type { LoaderArgs } from '@remix-run/node'

import { getProduct } from '~/services/api.server'

export async function loader({ params }: LoaderArgs) {
  const productHandle = params.productHandle

  if (!productHandle) {
    throw new Error('No product ID provided')
  }

  const product = await getProduct(productHandle)
  return json({ product })
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>()

  if (!product) {
    throw new Error('404')
  }

  const price = product.variants.edges[0].node.price ? product.variants.edges[0].node.price.amount : null

  return (
    <div className='mx-auto w-full'>
      <h1 className='text-4xl align-center text-center'>{product.title}</h1>
      <div className='flex gap-x-4 mt-20'>
        <img className='max-w-[40%]' src={product.featuredImage?.url as unknown as string} alt={product.title} />
        <div className='flex-col'>
          <p className='text-2xl'>{product.description}</p>
          <button className='btn btn-primary mt-4'>Buy for ${price as unknown as string}</button>
        </div>
      </div>
    </div>
  )
}
