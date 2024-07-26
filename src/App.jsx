import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, Outlet } from 'react-router-dom'

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Calendar', href: 'calendar', icon: CalendarIcon, current: false },
  { name: 'Gallery', href: 'gallery', icon: ChartPieIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [plants, setPlants] = useState([]);
  useEffect(() => {
      const callServer = async () => {
          let response = await (await fetch("http://localhost:3000/")).json();
          setPlants(response)
      }
      callServer();
  }, []);
  

  return (
<MantineProvider>

      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="./src/images/logo.jpeg"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((p) => (
                              <li key={p.name}>
                                <Link
                                  to={p.href}
                                  className={classNames(
                                    p.current
                                      ? 'bg-gray-50 text-lime-600'
                                      : 'text-gray-700 hover:text-lime-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-body'
                                  )}
                                >
                                  <p.icon
                                    className={classNames(
                                      p.current ? 'text-lime-600' : 'text-gray-400 group-hover:text-lime-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {p.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-body leading-6 text-gray-400">Your Plants</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {plants.map((p) => (
                              <li key={p._id}>
                                <a
                                  href={p._id}
                                  className={classNames(
                                    plants.current
                                      ? 'bg-gray-50 text-lime-600'
                                      : 'text-gray-700 hover:text-lime-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-body'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      p.current
                                        ? 'text-lime-600 border-lime-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-lime-600 group-hover:text-lime-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {p.firstLetter}
                                  </span>
                                  <span className="truncate">{p.type}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center font-decorative text-lime-800 text-xl">
              {/* <img 
                className="h-8 w-auto"
                src="./src/images/logo.jpeg"
                alt="Your Company"
              /> */}
              Green Space
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((p) => (
                      <li key={p.name}>
                        <Link
                          to={p.href}
                          className={classNames(
                            p.current
                              ? 'bg-gray-50 text-lime-600'
                              : 'text-gray-700 hover:text-lime-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-body'
                          )}
                        >
                          <p.icon
                            className={classNames(
                              p.current 
                              ? 'text-lime-600' : 'text-gray-400 group-hover:text-lime-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-body leading-6 text-lime-800">Your Plants</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {plants.map((p) => (
                      <li key={p._id}>
                        <a
                          href={`/plant/${p._id}`}
                          className={classNames(
                            p.type
                              ? 'bg-gray-50 text-lime-600'
                              : 'text-gray-700 hover:text-lime-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-body'
                          )}
                        >
                          <span
                            className={classNames(
                              p.type
                                ? 'text-lime-600 border-lime-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-lime-600 group-hover:text-lime-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {p.firstLetter}
                          </span>
                          <span className="truncate">{p.type}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {/* new plant button */}
                  <div>
                  <Link
                          to='addPlant'
                          className={classNames(
                            'text-gray-700 hover:text-lime-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-body'
                          )}
                        >
                          <ChartPieIcon
                            className={classNames(
                              'text-gray-400 group-hover:text-lime-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          Add Plant
                        </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-body leading-6 text-gray-900">Home</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="lg:pl-72">
          <div>
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 m-9">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </MantineProvider>
  )
}
