import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@kf/ui', '@kf/db'],
}

export default config
