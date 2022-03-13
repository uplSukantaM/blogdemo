import React, { useCallback, useEffect, useState } from 'react'
import BlogHeader from './BlogHeader'
import client from "../../lib/sanity"
import { useDispatch, useSelector } from 'react-redux'

const Blog = () => {
	const dispatch = useDispatch()
	const [usersList, setUsersList] = useState([])
	const users = useSelector((state: any) => state.userReducer.userDetails)
	useEffect(() => {
		getBlogs()
	}, [])

	const getUser = useCallback(async () => {
		dispatch({ type: "GET_USER_REQUEST" })
		let users = await client.fetch('*[_type == "user"]{firstName, lastName, password, email, _id}')
		if (users) {
			setUsersList(users)
			dispatch({ type: "GET_USER_SUCCESS", payload: users })
		} else {
			dispatch({ type: "GET_USER_FAILURE" })
		}
	}, [dispatch])

	useEffect(() => {
		if (users.length === 0) {
			getUser()
		}
	}, [getUser, users])

	console.log(users, "<<-- users")

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