import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "https://mock.shop/api",
  documents: ['app/**/*.ts'],
  generates: {
    './app/__generated__/': {
      preset: 'client'
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] }
}

export default config