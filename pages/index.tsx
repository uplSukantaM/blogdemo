import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import client from "../lib/sanity"
import Link from 'next/link'
import { useRouter } from 'next/router'
import PencilIcon from "@heroicons/react/solid/PencilIcon"
import CloseIcon from "@heroicons/react/solid/XCircleIcon"

const Home: NextPage = () => {
  const router = useRouter()
  const [popUp, setPopUp] = useState<boolean>(false)
  const [userList, setUserList] = useState<any[]>([])
  useEffect(() => {
    users()
  }, [])

  const users = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `*[_type == "user"]`
        let users = await client.fetch(query)
        resolve(users)
        setUserList(users)
      } catch (error) {
        console.log(error, "<<-- error")
        reject(error)
      }
    })

  }

  const deleteAllUser = async () => {
    await client.delete({ query: '*[_type == "user"]' })
      .then(async (res) => {
        console.log("All users deleted successfully")
        await users()
      }).catch(err => {
        console.log(err, "<<-- err")
      })

  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${popUp && "bg-[#1e1c1c] justify-center items-center "}`}>
        <div className={styles.createUser}>
          <Link href={"/create-user"} passHref>
            <h1 className={`${styles.create__user__btn}`}>Create User</h1>
          </Link>
          <div>
            <h1 className={styles.delete__btn} onClick={() => { deleteAllUser() }}>Delete All User</h1>
          </div>
        </div>
        {userList && userList.length > 0 && userList?.map((user: any) => (
          <div className={styles.user} key={user._id}>
            <div className={styles.name}>
              <span>
                <span>Name: </span>
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </span>
              <span className={styles.edit__user__btn} onClick={() => {
                setPopUp(true)
              }} >Edit</span>
            </div>
            <div className="email">
              <span>Email: </span>
              <span>{user.email}</span>
            </div>
          </div>
        ))}
      </main>

      {popUp &&
        <div className={styles.popUp}>
          <div className='flex justify-end w-11/12'><CloseIcon className='h-5 w-5 text-blue-600 cursor-pointer' onClick={() => {
            setPopUp(false)
          }} /></div>
          <div>
            <input type="text" className='input__field' name="fname" id="fname" placeholder='Enter FirstName' onChange={(e) => { userDetails(e) }} />
          </div>
          <div>
            <input type="text" className='input__field' name="lname" id="lname" placeholder='Enter LastName' onChange={(e) => { userDetails(e) }} />
          </div>
          <div>
            <input type="email" className='input__field' name="email" id="email" placeholder='Enter Email' onChange={(e) => { userDetails(e) }} />
          </div>
          <div>
            <input type="text" className='input__field' name="password" id="password" placeholder='Enter Password' onChange={(e) => { userDetails(e) }} />
          </div>
          <button className={styles.create__user__btn} onClick={() => { createUser() }}>Create User</button>
        </div>
      }

    </div>
  )
}

export default Home
