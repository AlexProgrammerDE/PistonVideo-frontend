// noinspection JSUnusedGlobalSymbols
import SideBarComponent from '../components/sidebar/component';
import { FormEventHandler, useState } from 'react';
import crypto from 'crypto';

const hash = crypto.createHash('sha256');

// noinspection JSUnusedGlobalSymbols
export default function Profile() {
  const [bioBig, setBioBig] = useState('');
  const [bioSmall, setBioSmall] = useState('');
  const [avatar, setAvatar] = useState<File>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');

  const updateData: FormEventHandler<HTMLFormElement> = async (event) => {
    const bodyFormData = new FormData();

    if (this.bio.avatar !== undefined) {
      bodyFormData.append('avatar', this.bio.avatar, this.bio.avatar.name);
    }
    if (this.bio.bioSmall !== undefined) {
      bodyFormData.append('bioSmall', this.bio.bioSmall);
    }
    if (this.bio.bioBig !== undefined) {
      bodyFormData.append('bioBig', this.bio.bioBig);
    }

    let i = 0;
    bodyFormData.forEach(() => i++);
    if (i <= 0) {
      return;
    }

    console.log(this.bio);

    this.uploading = true;
    try {
      const resp = await fetch('/api/user/updatedata', {
        body: bodyFormData,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await this.$router.push({
        path: '/user',
        query: {
          id: (await resp.json()).id
        }
      });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
    this.uploading = false;
  };

  const updateInfo: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      let response = await fetch('/api/user/updateinfo', {
        body: JSON.stringify({
          username: username,
          email: email,
          oldPassword: passwordOld ? hash.update(passwordOld).digest('hex') : undefined,
          newPassword: passwordOld ? hash.update(this.info.passwordNew).digest('hex') : undefined
        }),
        method: 'POST'
      }).then(response => response.json());

      if (response.data.success) {
        await this.$router.push('/');
      } else {
        this.message = response.data.errorMessage;
        this.invalid = true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  let uploading = false;
  let message2 = undefined;
  let invalid2 = false;

  return (<div className='flex flex-row min-h-screen bg-gray-50 text-gray-800'>
    <SideBarComponent />
    <div className='m-7 shadow-xl w-full bg-gray-100 flex flex-col'>
      <form className='m-5 w-4/12' onSubmit={updateData}>
        <div className='flex flex-col gap-4 px-0 py-2'>
          <h2 className='font-bold text-2xl text-gray-600'>Update bio:</h2>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Avatar:</label>
          <label
            className='w-64 flex flex-col items-center px-4 py-6 bg-gray-100 rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150'
          >
            <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z'
              />
              <path d='M9 13h2v5a1 1 0 11-2 0v-5z' />
            </svg>
            <span className='mt-2 text-base leading-normal'>Select a file</span>
            {
              avatar && <span className='mt-2 text-base leading-normal'>{avatar.name} </span>
            }

            <input accept='.png' className='hidden' required type='file'
                   onChange={(e) => setAvatar(e.target.files[0])} />
          </label>
          <div>
            <label className='text-gray-700'>Small bio</label>
            <input value={bioSmall}
                   onChange={(e) => setBioSmall(e.target.value)}
                   className='py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
                   placeholder='Full time toast enjoyer' type='text' />
          </div>
          <div>
            <label className='text-gray-700'>Big bio</label>
            <textarea
              value={bioBig}
              onChange={(e) => setBioBig(e.target.value)}
              className='py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
              placeholder='I enjoy eating toast and I also love rick astleys songs they are so good!!!'
            />
          </div>

          <div className='w-full flex flex-row gap-2'>
            {
              !uploading && <button
                className='p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 flex flex-row justify-center items-center gap-1'
                type='submit'
              >
                <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'
                     xmlns='http://www.w3.org/2000/svg'>
                  <path d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                        strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
                </svg>
                Send
              </button>
            }
            {
              uploading && <div>
                <button
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded inline-flex items-center'
                  value='Uploading'>
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
              </div>
            }
          </div>
        </div>
      </form>
      <form className='m-5 w-4/12' onSubmit={updateInfo}>
        <div className='flex flex-col gap-4 px-0 py-2'>
          <h2 className='font-bold text-2xl text-gray-600'>Update info:</h2>
          {
            invalid2 &&
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                 role='alert'>
              <strong className='font-bold'>{message2}</strong>
              <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
              <svg className='fill-current h-6 w-6 text-red-500' role='button' viewBox='0 0 20 20'
                   xmlns='http://www.w3.org/2000/svg'
                   onClick={() => invalid2 = false}>
                <title>Close</title>
                <path
                  d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z'
                />
              </svg>
      </span>
            </div>
          }
          <div>
            <label className='text-gray-700'>Username</label>
            <svg className='font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11' fill='none'
                 stroke='currentColor'
                 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' strokeLinecap='round'
                    strokeLinejoin='round' strokeWidth='2' />
            </svg>
            <input onChange={(e) => setUsername(e.target.value)}
                   className='py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
                   placeholder='Username' type='text' />
          </div>
          <div>
            <label className='text-gray-700'>Email address</label>
            <svg className='font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11' fill='none'
                 stroke='currentColor'
                 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            </svg>
            <input onChange={(e) => setEmail(e.target.value)}
                   className='py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
                   placeholder='Email address' type='email' />
          </div>
          <div>
            <label className='text-gray-700'>Old Password</label>
            <svg className='font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11' fill='none'
                 stroke='currentColor'
                 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            </svg>
            <input onChange={(e) => setPasswordOld(e.target.value)}
                   className='py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
                   placeholder='Password' type='password' />
          </div>
          <div>
            <label className='text-gray-700'>New Password</label>
            <svg className='font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11' fill='none'
                 stroke='currentColor'
                 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            </svg>
            <input onChange={(e) => setPasswordNew(e.target.value)}
                   className='py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100'
                   placeholder='Password' type='password' />
          </div>
          <div className='w-full flex flex-row gap-2'>
            <button
              className='p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 flex flex-row justify-center items-center gap-1'
              type='submit'
            >
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'
                   xmlns='http://www.w3.org/2000/svg'>
                <path d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
              </svg>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>)
    ;
}
