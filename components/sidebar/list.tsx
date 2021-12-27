import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SideBarHead from './head';
import styles from './SideBar.module.css';
import { Cog, Home, Profile, SignIn, SignOut, Upload } from '../svg/sidebar';
import { AxiosError } from 'axios';
import { createLogoutHandler } from '../../pkg';
import { useRouter } from 'next/router';
import ory from '../../pkg/sdk';

export default function SideBarList() {
  const [session, setSession] = useState<string>(
    'No valid Ory Session was found.\nPlease sign in to receive one.'
  );
  const [hasSession, setHasSession] = useState<boolean>(false);
  const router = useRouter();
  const onLogout = createLogoutHandler();

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(JSON.stringify(data, null, 2));
        setHasSession(true);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 403:
          // This is a legacy error code thrown. See code 422 for
          // more details.
          case 422:
            // This status code is returned when we are trying to
            // validate a session which has not yet completed
            // it's second factor
            return router.push('/login?aal=aal2');
          case 401:
            // do nothing, the user is not logged in
            return;
        }

        // Something else happened!
        return Promise.reject(err);
      });
  });

  return (
    <div className="overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="flex flex-col py-2 pt-0 md:pt-2 space-y-1">
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
        {hasSession && (
          <>
            <SideBarHead title="ContentBox" />
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
        {hasSession ? (
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
              <button onClick={onLogout} className={styles.sidebarLink}>
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
              <Link href="/login">
                <a className={styles.sidebarLink}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <SignIn />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Login
                  </span>
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
