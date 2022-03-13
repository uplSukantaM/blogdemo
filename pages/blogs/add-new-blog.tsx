import React, { useCallback, useEffect, useState } from 'react'
import BlogHeader from '../../components/Blog/BlogHeader'
import MenuList from '../../components/common/MenuList'
import PersonList from '../../components/common/PersonList'
import slugify from 'slugify'
import client from "../../lib/sanity"
import Createblog from '../../components/Blog/Createblog'

export async function getServerSideProps(context: any) {
  let users = await client.fetch('*[_type == "user"]{firstName, lastName, password, email, _id}')
  return {
    props: {
      users
    }
  }
}

const AddNewBlog = () => {
  return (
    <div>
      <BlogHeader />

      {/* Blog create form */}

      <Createblog />

    </div>
  )
}

export default AddNewBlog