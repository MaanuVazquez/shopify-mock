import request from 'graphql-request'

import { graphql } from '~/__generated__/gql'

const API = 'https://mock.shop/api'

const GetProducts = graphql(`
  query GetProducts($first: Int, $last: Int, $query: String, $after: String, $before: String) {
    products(first: $first, last: $last, query: $query, after: $after, before: $before) {
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          id
          title
          description
          featuredImage {
            id
            url
          }
          totalInventory
          variants(first: 3) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`)

export async function getProducts(query?: string, afterCursor?: string, beforeCursor?: string) {
  const variables: Record<string, unknown> = { query, after: afterCursor, before: beforeCursor }

  if (!beforeCursor) {
    variables.first = 6
  } else {
    variables.last = 6
  }

  const response = await request(API, GetProducts, variables)

  return response.products
}

const GetProduct = graphql(`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      featuredImage {
        id
        url
      }
      totalInventory
      variants(first: 3) {
        edges {
          node {
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`)

export async function getProduct(handle: string) {
  const response = await request(API, GetProduct, { handle })

  return response.product
}
