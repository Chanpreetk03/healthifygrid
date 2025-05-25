/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['img.clerk.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'au6r55axt30njf9e1.lite.vusercontent.net',
			},
		],
	},
}

export default nextConfig
