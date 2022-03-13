import { useRouter } from 'next/router'
import React from 'react'
import ArrowLeft from "@heroicons/react/solid/ArrowLeftIcon"
import PlusIcon from "@heroicons/react/solid/PlusIcon"
import Image from 'next/image'
import Link from 'next/link'


const BlogHeader = () => {
	const router = useRouter()

	return (
		<>
			<div className='flex w-full h-12 px-10 justify-between items-center shadow sticky z-10 top-0 bg-white'>
				<Link href={'/blogs'} passHref>
					<div className='flex justify-between items-center w-20'>
						<div>
							<ArrowLeft height={20} width={20} color="#000" className='cursor-pointer text-blue-600' onClick={() => {
								router.back()
							}} />
						</div>
						<p className='text-justify cursor-pointer text-lg'>Blogs</p>
					</div>
				</Link>
				<Link href={`/blogs/add-new-blog`} passHref>
					<div className='flex justify-between items-center w-32 cursor-pointer'>
						<PlusIcon height={20} width={20} color="#000" className='cursor-pointer text-blue-600' />
						<p className='text-justify text-lg' >Create Blog</p>
					</div>
				</Link>
			</div>
		</>
	)
}

export default BlogHeader