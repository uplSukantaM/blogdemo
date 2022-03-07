import React, { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css"
import client from "../lib/sanity"
import { useRouter } from 'next/router'

const Createuser = () => {
	const router = useRouter()
	const [user, setUser] = useState({})
	const userDetails = (e) => {
		// console.log(e.target.name, "<<-- e.target.value")
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	useEffect(() => {
		console.log(user, "<<-- user")
	}, [user])

	const createUser = async () => {
		const doc = {
			_type: "user",
			firstName: user.fname,
			lastName: user.lname,
			email: user.email,
			password: user.password,
			role: "user"
		}
		client.create(doc).then((res) => {
			console.log(res, "<<-- res")
			router.push("/")
		}).catch((err) => {
			console.log(err, "<<-- err")
		})
	}

	return (
		<div className={`${styles.main}`}>
			<div>
				<input type="text" className='input__field px-3 py-1 border m-1 outline-none' name="fname" id="fname" placeholder='Enter FirstName' onChange={(e) => { userDetails(e) }} />
			</div>
			<div>
				<input type="text" className='input__field px-3 py-1 border m-1 outline-none' name="lname" id="lname" placeholder='Enter LastName' onChange={(e) => { userDetails(e) }} />
			</div>
			<div>
				<input type="email" className='input__field px-3 py-1 border m-1 outline-none' name="email" id="email" placeholder='Enter Email' onChange={(e) => { userDetails(e) }} />
			</div>
			<div>
				<input type="text" className='input__field px-3 py-1 border m-1 outline-none' name="password" id="password" placeholder='Enter Password' onChange={(e) => { userDetails(e) }} />
			</div>
			<button className={styles.create__user__btn} onClick={() => { createUser() }}>Create User</button>
		</div>
	)
}

export default Createuser