/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE',
        project_url: 'https://igscvhkqnkryacanuwqb.supabase.co'
      },
      images: {
        domains: ['lh3.googleusercontent.com','igscvhkqnkryacanuwqb.supabase.co','png.pngtree.com','cdn.vox-cdn.com'],
        unoptimized: true,
      },
 
      reactStrictMode: false,
}

module.exports = nextConfig
