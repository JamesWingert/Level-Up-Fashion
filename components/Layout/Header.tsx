/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable unused-imports/no-unused-vars */
import { useUser } from '@auth0/nextjs-auth0';
import { Popover, Transition } from '@headlessui/react';
import { BookmarkIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { Fragment } from 'react';

import ThemeSwitcher from '../ThemeSwitcher';

function Header() {
  const { user } = useUser();
  const navigation = [{ name: 'view my bookmarks', href: '/bookmarks' }];

  return (
    <div className="relative border-b-2 border-base-300  bg-base-200">
      {user ? (
        <>
          <div className="relative p-3 sm:p-5 ">
            <Popover>
              <div className="mx-auto max-w-7xl items-center px-4 sm:px-6">
                <nav
                  className="relative flex items-center justify-between sm:h-10 md:justify-center"
                  aria-label="Global"
                >
                  <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                      <Link href="/">
                        <a className="hover:cursor-secondary font-Lobster text-3xl text-accent-focus">
                          Level Up Fashion
                        </a>
                      </Link>
                      <div className="md:hidden">
                        <ThemeSwitcher />
                      </div>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="focus:ring-info-focus inline-flex items-center justify-center  rounded-md p-2 text-primary-focus ring-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset">
                          <span className="sr-only">Open main menu</span>{' '}
                          <MenuIcon className="h-8 w-8" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="right-0 hidden items-center text-center hover:underline hover:underline-offset-2 md:inline-flex">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name} passHref>
                        <a className="items-center  text-center text-2xl text-info">
                          <span className="flex items-center text-center font-Flower">
                            {item.name}
                          </span>
                        </a>
                      </Link>
                    ))}
                  </div>

                  <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
                    <span className="mr-6 mt-2 hidden items-center md:inline-flex">
                      <ThemeSwitcher />
                    </span>
                    <span className="inline-flex rounded-md shadow">
                      <Link href="/api/auth/logout" passHref>
                        <a className="inline-flex items-center rounded-md border border-transparent bg-primary-focus px-4 py-2 text-base font-medium text-white hover:bg-primary">
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
                  className="absolute inset-x-0 top-0 z-10 origin-top-right p-2 transition md:hidden"
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/10 ">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <Link href="/" passHref>
                        <a className="hover:cursor-secondary font-Lobster text-3xl text-accent-focus">
                          Level Up Fashion
                        </a>
                      </Link>
                      <div className="-mr-2">
                        {' '}
                        <Popover.Button className="inline-flex items-center  justify-center rounded-md bg-white p-2 text-secondary-focus outline-none hover:text-secondary focus:outline-none">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className=" px-2 pt-2 pb-3 ">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name} passHref>
                          <a className="font-Pacifico text-xl text-neutral-focus">
                            <span className="mx-auto flex items-center justify-center hover:underline hover:underline-offset-2">
                              <BookmarkIcon className="h-6 text-neutral" />
                              {item.name}
                            </span>
                          </a>
                        </Link>
                      ))}
                    </div>
                    <Link href="/api/auth/logout" passHref>
                      <a className="block w-full bg-secondary-focus px-5 py-3 text-center font-medium text-white hover:bg-secondary">
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
        <div className="mx-auto flex items-center justify-between bg-base-100 p-5">
          <div className="  flex items-center justify-center">
            <Link href="/" passHref>
              <a className="hover:cursor-secondary font-Lobster text-3xl text-accent-focus">
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
