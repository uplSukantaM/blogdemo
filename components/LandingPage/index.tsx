import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import client from "../../lib/sanity"
import Link from 'next/link'
import { useRouter } from 'next/router'
import PencilIcon from "@heroicons/react/solid/PencilIcon"
import DeleteIcon from "@heroicons/react/solid/TrashIcon"
import CloseIcon from "@heroicons/react/solid/XCircleIcon"
import { useDispatch } from 'react-redux'

const Landing = (props: any) => {
	const router = useRouter()
	const dispatch = useDispatch()
	// const { users } = props
	const [usersList, setUsersList] = useState([])
	const [popUp, setPopUp] = useState<boolean>(false)
	const [user, setUser] = useState({
		id: "",
		fname: "",
		lname: "",
		email: "",
		password: ""
	})

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
		getUser()
	}, [getUser])

	const deleteAllUser = async () => {
		setUsersList([])
		await client.delete({ query: '*[_type == "user"]' })
			.then(async (res) => {
				console.log("All users deleted successfully")
				await getUser()
			}).catch(err => {
				console.log(err, "<<-- err")
			})
	}

	const userDetails = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const updateUser = async () => {
		let res = await client
			.patch(user.id)
			.set({
				firstName: user.fname,
				lastName: user.lname,
				email: user.email,
				password: user.password
			})
			.commit()
		console.log(res, "<<-- res")
		if (res) {
			await getUser()
			setPopUp(false)
		}
	}

	const deleteUser = async (id: string) => {
		setUsersList(usersList.filter((user: any) => user._id !== id))
		let res = await client.delete(id)
		console.log(res, "<<-- res")
	}

	return (
		<div>
			<main className={`${styles.main} ${popUp && "bg-[#1e1c1c] justify-center items-center "}`}>
				<div className={styles.createUser}>
					<Link href={"/create-user"} passHref>
						<h1 className={`${styles.create__user__btn}`}>Create User</h1>
					</Link>
					<Link href={"/blogs"} passHref>
						<h1 className={`${styles.create__user__btn} bg-yellow-400`}>Blogs</h1>
					</Link>
					<div>
						<h1 className={styles.delete__btn} onClick={() => { deleteAllUser() }}>Delete All User</h1>
					</div>
				</div>
				<div className='flex flex-wrap mt-8'>
					<table className='table-auto w-2/4'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{usersList && usersList.length > 0 && usersList?.map((user: any) => (
								<tr key={user._id} className="h-11">
									<td className='text-center'>{`${user.firstName} ${user.lastName}`}</td>
									<td className='text-center'>{user.email}</td>
									<td className='text-center flex justify-center items-center h-11'>
										<div className='flex'>
											<PencilIcon
												className='cursor-pointer mr-4 h-5 w-5 text-blue-600 text-center'
												onClick={() => {
													setPopUp(true)
													setUser({
														id: user._id,
														fname: user.firstName,
														lname: user.lastName,
														email: user.email,
														password: user.password
													})
												}} />
											<DeleteIcon
												className='cursor-pointer h-5 w-5 text-red-600 text-center'
												onClick={() => { deleteUser(user._id) }}
											/>
										</div>

									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

			</main >

			{popUp &&
				<div className={styles.popUp}>
					<div className='flex justify-end w-11/12 mt-3'><CloseIcon className='h-5 w-5 text-blue-600 cursor-pointer' onClick={() => {
						setPopUp(false)
					}} /></div>
					<div>
						<input type="text" className='border border-amber-400 outline-none h-9 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' name="fname" id="fname" value={user && user.fname} placeholder='Enter FirstName' onChange={(e) => { userDetails(e) }} />
					</div>
					<div>
						<input type="text" className='border border-amber-400 outline-none h-9 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' name="lname" value={user && user.lname} id="lname" placeholder='Enter LastName' onChange={(e) => { userDetails(e) }} />
					</div>
					<div>
						<input type="email" className='border border-amber-400 outline-none h-9 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' name="email" id="email" value={user && user.email} placeholder='Enter Email' onChange={(e) => { userDetails(e) }} />
					</div>
					<div>
						<input type="password" className='border border-amber-400 outline-none h-9 mt-2 rounded px-2 hover:border-blue-700 focus:border-red-700 ' name="password" id="password" value={user && user.password} placeholder='Enter Password' onChange={(e) => { userDetails(e) }} />
					</div>
					<button className={`${styles.create__user__btn} m-2 `} onClick={() => { updateUser() }}>Update</button>
				</div>
			}

		</div >
	)
}

export default Landing
