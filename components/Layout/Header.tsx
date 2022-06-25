/* eslint-disable unused-imports/no-unused-vars */
import { useUser } from '@auth0/nextjs-auth0';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { Fragment } from 'react';

import ThemeSwitcher from '../ThemeSwitcher';

function Header() {
  const { user } = useUser();
  const navigation = [
    { name: 'my bookmarks', href: '/bookmarks' },
    { name: 'add post', href: '/post' },
  ];

  return (
    <div className=" relative p-3 mx-auto rounded-sm  border-b-2 sm:p-5  border-neutral-content bg-base-300">
      {user ? (
        <>
          <div className="relative">
            <Popover>
              <div className="items-center px-4 mx-auto max-w-7xl sm:px-6">
                <nav
                  className="flex relative justify-between items-center sm:h-10 md:justify-center"
                  aria-label="Global"
                >
                  <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
                    <div className="flex justify-between items-center w-full md:w-auto">
                      <Link href="/">
                        <a className="font-Lobster text-3xl hover:cursor-secondary text-accent-focus">
                          Level Up Fashion
                        </a>
                      </Link>
                      <div className="md:hidden">
                        <ThemeSwitcher />
                      </div>
                      <div className="flex items-center -mr-2 md:hidden">
                        <Popover.Button className="inline-flex justify-center items-center p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-info-focus text-primary-focus ring-secondary hover:text-primary">
                          <span className="sr-only">Open main menu</span>{' '}
                          <MenuIcon className="w-8 h-8" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex md:relative md:space-x-10">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name} passHref>
                        <a className="flex font-Flower text-2xl hover:underline hover:underline-offset-2 text-info">
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>

                  <div className="hidden md:flex md:absolute md:inset-y-0 md:right-0 md:justify-end md:items-center">
                    <span className="hidden items-center mt-2 mr-6 md:inline-flex">
                      <ThemeSwitcher />
                    </span>
                    <span className="inline-flex rounded-md shadow">
                      <Link href="/api/auth/logout" passHref>
                        <a className="inline-flex items-center py-2 px-4 text-base font-medium text-white rounded-md border border-transparent bg-primary-focus hover:bg-primary">
                          Log Out
                        </a>
                      </Link>
                    </span>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right md:hidden"
                >
                  <div className="overflow-hidden rounded-lg ring-1 ring-black/10 shadow-md">
                    <div className="flex justify-between items-center px-5 pt-4">
                      <Link href="/" passHref>
                        <a className="font-Lobster text-3xl hover:cursor-secondary text-accent-focus">
                          Level Up Fashion
                        </a>
                      </Link>
                      <div className="-mr-2">
                        {' '}
                        <Popover.Button className="inline-flex justify-center  items-center p-2 rounded-md outline-none focus:outline-none text-secondary-focus hover:text-secondary">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="w-6 h-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className=" px-2 pt-2 pb-3 ">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name} passHref>
                          <a className="font-Pacifico text-xl text-neutral-focus">
                            <span className="flex justify-center items-center mx-auto hover:underline hover:underline-offset-2">
                              {item.name}
                            </span>
                          </a>
                        </Link>
                      ))}
                    </div>
                    <Link href="/api/auth/logout" passHref>
                      <a className="block py-3 px-5 w-full font-medium text-center text-white bg-secondary-focus hover:bg-secondary">
                        Log Out
                      </a>
                    </Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mx-auto space-x-6">
          <div className="flex justify-center items-center">
            <Link href="/" passHref>
              <a className="font-Lobster text-3xl hover:cursor-secondary text-accent-focus">
                Level Up Fashion
              </a>
            </Link>
          </div>
          <span className="">
            <ThemeSwitcher />
          </span>
        </div>
      )}
    </div>
  );
}
export default Header;
