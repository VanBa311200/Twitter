/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
      'graph.facebook.com',
      'firebasestorage.googleapis.com',
      'res.cloudinary.com',
    ],
  },
  env: {
    SERVER_URL: 'http://localhost:5000',
    CLIENT_URL: 'http://localhost:3000',
  },
};
