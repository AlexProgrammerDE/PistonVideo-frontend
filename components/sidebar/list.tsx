import Link from 'next/link';
import React from 'react';
import SideBarHead from './head';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './SideBar.module.css';
import { Cog, Home, Profile, SignIn, SignOut, Upload } from '../svg/sidebar';

function userLogout() {}

export default function SideBarList() {
  const { data: session } = useSession();

  return (
    <div className="overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="flex flex-col py-2 space-y-1">
        <SideBarHead title="Menu" />
        <li>
          <Link href="/">
            <a className={styles.sidebarLink}>
              <span className="inline-flex justify-center items-center ml-4">
                <Home />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Home</span>
            </a>
          </Link>
        </li>
        {session && (
          <>
            <SideBarHead title="Content" />
            <li>
              <Link href="/upload">
                <a className={styles.sidebarLink}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <Upload />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Upload
                  </span>
                </a>
              </Link>
            </li>
          </>
        )}
        <SideBarHead title="User" />
        {session ? (
          <>
            <li>
              <Link href="/profile">
                <a className={styles.sidebarLink}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <Profile />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Profile
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <a className={styles.sidebarLink}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <Cog />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Settings
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()} className={styles.sidebarLink}>
                <span className="inline-flex justify-center items-center ml-4">
                  <SignOut />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Logout
                </span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => signIn()} className={styles.sidebarLink}>
                <span className="inline-flex justify-center items-center ml-4">
                  <SignIn />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Login
                </span>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
