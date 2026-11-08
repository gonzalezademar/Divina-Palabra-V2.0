import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // El servidor local conserva la exportación. Vercel ejecuta también la API.
  ...(process.env.VERCEL === '1' ? {} : { output: 'export' as const }),
  serverExternalPackages: ['node:sqlite'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
