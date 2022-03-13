import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const MenuList = () => {
	return (
		<div>
			<div className="w-96 h-full">
				<Menu as="div" className="relative inline-block text-left w-96">
					<div className='w-full h-full'>
						<Menu.Button className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-black border border-amber-400 outline-none h-10  hover:border-blue-700 focus:border-red-700  bg-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							Author
							<ChevronDownIcon
								className="w-5 h-5 ml-2 -mr-1 text-amber-400 hover:text-blue-700"
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 w-96 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
												} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
										>
											Edit
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
												} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
										>
											Duplicate
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	)
}

export default MenuList