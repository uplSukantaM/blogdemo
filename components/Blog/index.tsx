import React, { useEffect } from 'react'
import BlogHeader from './BlogHeader'
import client from "../../lib/sanity"

const Blog = () => {

	useEffect(() => {
		getBlogs()
	}, [])

	const getBlogs = async () => {
		let blogs = await client.fetch(`*[_type == "blog"]{title, slug,title, body, _id, "author": author->{firstName, lastName, email, _id}}`)
		console.log(blogs, "<<-- blogs")
	}
	return (
		<div>
			{/* Blog list */}
			<div className='flex flex-col h-full w-full'>
				<div className='my-5'>
					<p>Blog Name</p>
					<p>author</p>
					<p>Tags</p>
					<p>Description</p>
				</div>
				<div className='my-5'>
					<p>Blog Name</p>
					<p>author</p>
					<p>Tags</p>
					<p>Description</p>
				</div>
				<div className='my-5'>
					<p>Blog Name</p>
					<p>author</p>
					<p>Tags</p>
					<p>Description</p>
				</div>
				<div className='my-5'>
					<p>Blog Name</p>
					<p>author</p>
					<p>Tags</p>
					<p>Description</p>
				</div>
			</div>
		</div>
	)
}

export default Blog