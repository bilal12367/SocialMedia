/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    PORT: 3000,
    SECRET_KEY: 'MIICXQIBAAKBgQCP54SyxMgwYb3f33oX1rQnP/0PxkjMXTUxSmM2ucVdwvVFc2KE',
    REFRESH_KEY: '7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUj',
    SECRET_LIFETIME: 300,
    REFRESH_LIFETIME: '90d',
    MONGO_TEST: 'mongodb://localhost:27017'
  }
}

module.exports = nextConfig
