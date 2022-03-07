import SanityClient from "@sanity/client"

export default new SanityClient({
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	dataset: "production",
	useCdn: false,
	apiVersion: "v1",
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})