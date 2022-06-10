/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.dicebear.com", "flagcdn.com", "openweathermap.org"],
  },
};

module.exports = nextConfig;
