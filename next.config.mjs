/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            // Apply these headers to all routes
            source: '/(.*)',
            headers: [
              {
                key: 'Content-Security-Policy',
                value: "upgrade-insecure-requests",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
