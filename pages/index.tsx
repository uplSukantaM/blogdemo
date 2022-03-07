import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import client from "../lib/sanity"
import Link from 'next/link'
import { useRouter } from 'next/router'
import PencilIcon from "@heroicons/react/solid/PencilIcon"
import DeleteIcon from "@heroicons/react/solid/TrashIcon"
import CloseIcon from "@heroicons/react/solid/XCircleIcon"

const Home: NextPage = () => {
  const router = useRouter()
  const [popUp, setPopUp] = useState<boolean>(false)
  const [user, setUser] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    password: ""
  })
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
      await users()
      setPopUp(false)
    }
  }

  const deleteUser = async (id) => {
    setUserList(userList.filter(user => user._id !== id))
    let res = await client.delete(id)
    console.log(res, "<<-- res")
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
              {userList && userList.length > 0 && userList?.map((user: any) => (
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
          {/* {userList && userList.length > 0 && userList?.map((user: any) => (
            // <div className={`${styles.user} mr-9`} key={user._id}>
            //   <div className={styles.name}>
            //     <span>
            //       <span>Name: </span>
            //       <span>{`${user.firstName} ${user.lastName}`}</span>
            //     </span>
              //   <span className={styles.edit__user__btn} onClick={() => {
              //     setPopUp(true)
              //     setUser({
              //       id: user._id,
              //       fname: user.firstName,
              //       lname: user.lastName,
              //       email: user.email,
              //       password: user.password
              //     })
              //   }}>
              //     Edit
              //   </span>
              // </div>
            //   <div className="email">
            //     <span>Email: </span>
            //     <span>{user.email}</span>
            //   </div>
            // </div>
            <table className="table-auto" key={user._id}>
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          ))} */}
        </div>

      </main >

      {popUp &&
        <div className={styles.popUp}>
          <div className='flex justify-end w-11/12 mt-3'><CloseIcon className='h-5 w-5 text-blue-600 cursor-pointer' onClick={() => {
            setPopUp(false)
          }} /></div>
          <div>
            <input type="text" className='input__field px-3 py-1 border m-1 outline-none' name="fname" id="fname" value={user && user.fname} placeholder='Enter FirstName' onChange={(e) => { userDetails(e) }} />
          </div>
          <div>
            <input type="text" className='input__field  px-3 py-1 border m-1 outline-none' name="lname" value={user && user.lname} id="lname" placeholder='Enter LastName' onChange={(e) => { userDetails(e) }} />
          </div>
          <div>
            <input type="email" className='input__field  px-3 py-1 border m-1 outline-none' name="email" id="email" value={user && user.email} placeholder='Enter Email' onChange={(e) => { userDetails(e) }} />
          </div>
          <div>
            <input type="text" className='input__field  px-3 py-1 border m-1 outline-none' name="password" id="password" value={user && user.password} placeholder='Enter Password' onChange={(e) => { userDetails(e) }} />
          </div>
          <button className={`${styles.create__user__btn} m-2 `} onClick={() => { updateUser() }}>Update</button>
        </div>
      }

    </div >
  )
}

export default Home
