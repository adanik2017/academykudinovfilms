import type { NextConfig } from 'next'

const config: NextConfig = {
  transpilePackages: ['@kf/ui', '@kf/db', '@kf/auth'],
}

export default config
