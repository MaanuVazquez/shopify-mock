/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetProducts($first: Int, $last: Int, $query: String, $after: String, $before: String) {\n    products(first: $first, last: $last, query: $query, after: $after, before: $before) {\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          handle\n          id\n          title\n          description\n          featuredImage {\n            id\n            url\n          }\n          totalInventory\n          variants(first: 3) {\n            edges {\n              node {\n                price {\n                  amount\n                  currencyCode\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      featuredImage {\n        id\n        url\n      }\n      totalInventory\n      variants(first: 3) {\n        edges {\n          node {\n            price {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.GetProductDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts($first: Int, $last: Int, $query: String, $after: String, $before: String) {\n    products(first: $first, last: $last, query: $query, after: $after, before: $before) {\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          handle\n          id\n          title\n          description\n          featuredImage {\n            id\n            url\n          }\n          totalInventory\n          variants(first: 3) {\n            edges {\n              node {\n                price {\n                  amount\n                  currencyCode\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProducts($first: Int, $last: Int, $query: String, $after: String, $before: String) {\n    products(first: $first, last: $last, query: $query, after: $after, before: $before) {\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          handle\n          id\n          title\n          description\n          featuredImage {\n            id\n            url\n          }\n          totalInventory\n          variants(first: 3) {\n            edges {\n              node {\n                price {\n                  amount\n                  currencyCode\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      featuredImage {\n        id\n        url\n      }\n      totalInventory\n      variants(first: 3) {\n        edges {\n          node {\n            price {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      featuredImage {\n        id\n        url\n      }\n      totalInventory\n      variants(first: 3) {\n        edges {\n          node {\n            price {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
