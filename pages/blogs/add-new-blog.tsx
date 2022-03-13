import React, { useCallback, useEffect, useState } from 'react'
import BlogHeader from '../../components/Blog/BlogHeader'
import MenuList from '../../components/common/MenuList'
import PersonList from '../../components/common/PersonList'
import slugify from 'slugify'
import client from "../../lib/sanity"

export async function getServerSideProps(context: any) {
  let users = await client.fetch('*[_type == "user"]{firstName, lastName, password, email, _id}')
  return {
    props: {
      users
    }
  }
}

const AddNewBlog = (props: any) => {
  const { users } = props
  const [slug, setSlug] = useState("")
  const [blog, setBlog] = React.useState({
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
    <div>
      <BlogHeader />

      {/* Blog create form */}

      <div className='flex flex-col h-full w-full px-10'>
        <div className='my-5'>
          <p>Blog Name</p>
          <input type="text" name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' onChange={(e: any) => { handleChange(e) }} value={blog.title ? blog.title : ""} />
        </div>
        <div className='my-5'>
          <p>Blog Name</p>
          <input type="text" readOnly={true} name="title" id="title" className='border border-amber-400 outline-none h-9 w-96 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' value={slug} />
        </div>
        <div className='my-5'>
          <p>Author</p>
          <PersonList extracls={"mt-2"} />
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

    </div>
  )
}

export default AddNewBlog