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
    MONGO_URI:
      'mongodb+srv://admin:1234@cluster0.l99fl.mongodb.net/twitter?retryWrites=true&w=majority',
    GOOGLE_CLIENT_ID:
      '705175059174-podj4ivt0kpr6epbpahm3jrto66o83gi.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_SECRET: 'brSzcCbXd2i2E0uAb4BY0puAFdzuWycu2yyIfUx19i0=',

    FACEBOOK_CLIENT_ID: '1094188091404076',
    FACEBOOK_CLIENT_SECRET: '9342cfa519a27bd7313cd4a8507016dd',
    NEXTAUTH_URL: 'https://twitter-wine.vercel.app',
  },
};
