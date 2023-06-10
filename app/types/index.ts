import type { GetProductsQuery } from '~/__generated__/graphql'

export type ProductItem = GetProductsQuery['products']['edges']['0']['node']
