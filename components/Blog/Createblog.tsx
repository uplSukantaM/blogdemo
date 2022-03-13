import React, { useCallback, useEffect, useState } from 'react'
import PersonList from '../common/PersonList'
import slugify from 'slugify'
import { useDispatch, useSelector } from 'react-redux'
import client from "../../lib/sanity"

const Createblog = () => {
  const dispatch = useDispatch()
  const [usersList, setUsersList] = useState([])
  const users = useSelector((state: any) => state.userReducer.userDetails)
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
  const [slug, setSlug] = useState("")
  const [blog, setBlog] = useState({
    title: '',
    slug: '',
    body: '',
    author: '',
    tags: [],
    image: ''
  })

  const formatSlug = useCallback(() => {
    const slug = slugify(blog.title, { lower: true });
    setSlug(slug)
  }, [blog])

  useEffect(() => {
    formatSlug()
  }, [formatSlug])

  const handleChange = (e: any) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='flex flex-col h-full w-full px-10'>
        <div className='my-5'>
          <p>Blog Name</p>
          <input type="text" name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' onChange={(e: any) => { handleChange(e) }} value={blog.title ? blog.title : ""} />
        </div>
        <div className='my-5'>
          <p>Slug</p>
          <input type="text" readOnly={true} name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' value={slug} />
        </div>
        <div className='my-5'>
          <p>Author</p>
          <PersonList extracls={"mt-2"} author={users} />
        </div>
        <div className='my-5'>
          <p>Blog Name</p>
          <input type="text" name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' />
        </div>
        <div className='my-5'>
          <p>Blog Name</p>
          <input type="text" name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' />
        </div>
        <div className='my-5'>
          <p>Blog Name</p>
          <input type="text" name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' />
        </div>
      </div>
    </>
  )
}

export default Createblog