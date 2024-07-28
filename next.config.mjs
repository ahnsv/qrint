/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'vydyretdkccuevlmkjbt.supabase.co',
                protocol: 'https',
                pathname: '/storage/v1/object/public/**',
            }
        ],
    }
};

export default nextConfig;
