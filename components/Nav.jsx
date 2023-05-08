'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getProvidersData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    getProvidersData();
  }, []);

  return (
    <nav
      className="flex
     justify-between items-center
    w-full mb-16 pt-3"
    >
      <div>
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            width={40}
            height={40}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div
            className="
           flex justify-between gap-4 
          "
          >
            <Link
              href="/create-pompt"
              className="
             bg-black text-white px-4 py-2 rounded-md cursor-pointer
            "
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="
             rounded-md cursor-pointer px-4 py-2 border border-black
            "
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image || '/assets/images/logo.svg'}
                width={40}
                height={40}
                alt="User"
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className=" rounded-md cursor-pointer px-4 py-2 border border-black"
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || '/assets/images/logo.svg'}
              width={40}
              height={40}
              alt="User"
              className="rounded-full cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}
            />
            {toggle && (
              <div
                className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end 
               shadow-lg z-10
              ;"
              >
                <Link
                  href="/profile"
                  className="flex gap-2 flex-center"
                  onClick={() => setToggle(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="flex gap-2 flex-center"
                  onClick={() => setToggle(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggle(false);
                  }}
                  className="
                   bg-black 
                     text-white
                    px-4 py-2
                         rounded-md
                  "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className=" rounded-md cursor-pointer px-4 py-2 border border-black"
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
