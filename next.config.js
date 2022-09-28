/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    PORT: 3000,
    SECRET_KEY: 'MIICXQIBAAKBgQCP54SyxMgwYb3f33oX1rQnP/0PxkjMXTUxSmM2ucVdwvVFc2KE',
    MONGO_URI: 'mongodb+srv://bilal-1236:m4cabrine@cluster0.pz7cw.mongodb.net/socialmedia?retryWrites=true&w=majority'
  }
}

module.exports = nextConfig
