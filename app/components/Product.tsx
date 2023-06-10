import { Link } from '@remix-run/react'

import type { ProductItem } from '~/types'

type Props = {
  product: ProductItem
}

export default function Product({ product }: Props) {
  const image = product.featuredImage?.url
  const pricing = product.variants.edges.length ? product.variants.edges[0].node.price : null
  const buyCTA = pricing ? `Buy for ${pricing?.amount} ${pricing?.currencyCode}` : 'Buy now'
  return (
    <div className='card w-80 bg-base-200 shadow-md'>
      {image ? (
        <figure>
          <img src={image} width='50%' height='50%' alt={product.title} />
        </figure>
      ) : null}
      <div className='card-body'>
        <h2 className='card-title'>{product.title}</h2>
        {product.totalInventory != null ? <p>Stock: {product.totalInventory}</p> : null}
        <div className='card-actions justify-end'>
          <Link to={`/products/${product.handle}`}>
            <button className='btn btn-primary'>{buyCTA}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
