const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: "picsum.photos",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**"
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**'
      }
    ],
  },
}
export default nextConfig;
