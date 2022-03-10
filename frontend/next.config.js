/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/statistiques/:filiere",
				destination: "/statistiques/:filiere/generale",
				permanent: true,
			},
			{
				source: "/statistiques",
				destination: "/statistiques/mp/generale",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
