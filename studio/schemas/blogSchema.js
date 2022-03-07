export default {
	title: "Blog",
	name: "blog",
	type: "document",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Slug",
			name: "slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			}
		},
		{
			title: "Author",
			name: "author",
			type: "reference",
			to: [{ type: "user" }]
		},
		{
			title: "Published at",
			name: "publishedAt",
			type: "datetime",
			default: Date.now()
		},
		{
			title: "Categories",
			name: "categories",
			type: "array",
			of: [{ type: "reference", to: [{ type: "category" }] }]
		},
		{
			title: "Main image",
			name: "mainImage",
			type: "image",
			options: {
				hotspot: true,
			}
		},
		{
			title: "Gallery",
			name: "gallery",
			type: "array",
			of: [{ type: "image" }]
		},
		{
			title: "Body",
			name: "body",
			type: "text",
		},
		{
			title: "Excerpt",
			name: "excerpt",
			type: "text"
		},
		{
			title: "Keywords",
			name: "keywords",
			type: "array",
			of: [{ type: "string" }]
		}
	]
}