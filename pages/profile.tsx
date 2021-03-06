// noinspection JSUnusedGlobalSymbols
import { FormEventHandler, useEffect, useState } from 'react';
import ContentBox from '../components/utils/ContentBox';
import Cloud from '../components/svg/cloud';
import Send from '../components/svg/send';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import ory from '../pkg/sdk';
import { Session } from '@ory/kratos-client';

// noinspection JSUnusedGlobalSymbols
export default function Profile() {
  const router = useRouter();
  const [bioBig, setBioBig] = useState('');
  const [bioSmall, setBioSmall] = useState('');
  const [avatar, setAvatar] = useState<File>();
  const [uploading, setUploading] = useState(false);
  // Contains the current session or undefined.
  const [session, setSession] = useState<Session>();

  // The error message or undefined.
  const [error, setError] = useState<any>();

  useEffect(() => {
    // If the session or error have been loaded, do nothing.
    if (session || error) {
      return;
    }

    // Try to load the session.
    ory
      .toSession()
      .then(({ data: session }) => {
        // Session loaded successfully! Let's set it.
        setSession(session);
      })
      .catch((err: AxiosError) => {
        // An error occurred while loading the session or fetching
        // the logout URL. Let's show that!
        setError({
          error: err.toString(),
          data: err.response?.data
        });
      });
  }, [session, error]);

  const updateData: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData();

    if (avatar !== undefined) {
      form.append('avatar', avatar, avatar.name);
    }
    if (bioSmall !== undefined) {
      form.append('bioSmall', bioSmall);
    }
    if (bioBig !== undefined) {
      form.append('bioBig', bioBig);
    }

    let i = 0;
    form.forEach(() => i++);
    if (i <= 0) {
      return;
    }

    setUploading(true);
    try {
      axios
        .post('/backend/user/updatedata', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((resp) => {
          router.push('/user?id=' + resp.data.id);
        });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
    setUploading(false);
  };

  return (
    <ContentBox>
      <form className='m-5 mb-0 max-w-3xl' onSubmit={updateData}>
        <h1 className='settings-title'>Profile</h1>
        <div className='flex flex-col gap-3 px-0 py-2'>
          <h2 className='settings-subheading'>Update bio:</h2>
          <label className='settings-component-title'>Avatar:</label>
          <label className='upload-button'>
            <Cloud />
            <span className='mt-2 text-base leading-normal'>Select a file</span>
            {avatar && (
              <span className='mt-2 text-base leading-normal'>
                {avatar.name}
              </span>
            )}

            <input
              accept='.png'
              className='hidden'
              required
              type='file'
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </label>
          <div>
            <label className='settings-component-title'>Small bio</label>
            <input
              value={bioSmall}
              onChange={(e) => setBioSmall(e.target.value)}
              className='py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
              placeholder='Full time toast enjoyer'
              type='text'
            />
          </div>
          <div>
            <label className='settings-component-title'>Big bio</label>
            <textarea
              value={bioBig}
              onChange={(e) => setBioBig(e.target.value)}
              className='py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
              placeholder='I enjoy eating toast and I also love rick astleys songs they are so good!!!'
            />
          </div>
          <div className='w-full flex flex-row gap-2'>
            {uploading ?
              <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded inline-flex items-center'
                value='Uploading'
              >
                <svg
                  className='animate-spin fill-current w-5 h-5 mr-3'
                  fill='none'
                  height='44'
                  stroke='#FFFFFF'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.5'
                  viewBox='0 0 24 24'
                  width='44'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 0h24v24H0z' fill='none' stroke='none' />
                  <path d='M8.56 3.69a9 9 0 0 0 -2.92 1.95' />
                  <path d='M3.69 8.56a9 9 0 0 0 -.69 3.44' />
                  <path d='M3.69 15.44a9 9 0 0 0 1.95 2.92' />
                  <path d='M8.56 20.31a9 9 0 0 0 3.44 .69' />
                  <path d='M15.44 20.31a9 9 0 0 0 2.92 -1.95' />
                  <path d='M20.31 15.44a9 9 0 0 0 .69 -3.44' />
                  <path d='M20.31 8.56a9 9 0 0 0 -1.95 -2.92' />
                  <path d='M15.44 3.69a9 9 0 0 0 -3.44 -.69' />
                </svg>
                <span>Uploading...</span>
              </button>
              :
              <button className='settings-submit-button' type='submit'>
                <Send />
                Send
              </button>
            }
          </div>
        </div>
      </form>
    </ContentBox>
  );
}
