/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/Cruizzer/blog-ssg/main/images/**",
            },
        ],
    }
};

module.exports = nextConfig;
