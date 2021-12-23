// noinspection JSUnusedGlobalSymbols
import { FormEventHandler, useState } from 'react';
import crypto from 'crypto';
import Content from '../components/utils/Content';
import Cloud from '../components/svg/cloud';
import Send from '../components/svg/send';
import { Email, Lock, Username } from '../components/svg/profile-form-svgs';
import AuthGuard from '../components/auth-guard';

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
          'Content-Type': 'multipart/form-data',
        },
      });
      await this.$router.push({
        path: '/user',
        query: {
          id: (await resp.json()).id,
        },
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
          oldPassword: passwordOld
            ? hash.update(passwordOld).digest('hex')
            : undefined,
          newPassword: passwordOld
            ? hash.update(this.info.passwordNew).digest('hex')
            : undefined,
        }),
        method: 'POST',
      }).then((response) => response.json());

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

  return (
    <AuthGuard>
      <Content>
        <form className="m-5 mb-0 w-4/12" onSubmit={updateData}>
          <h1 className="settings-title">Profile</h1>
          <div className="flex flex-col gap-3 px-0 py-2">
            <h2 className="settings-subheading">Update bio:</h2>
            <label className="settings-component-title">Avatar:</label>
            <label className="upload-button">
              <Cloud />
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              {avatar && (
                <span className="mt-2 text-base leading-normal">
                  {avatar.name}
                </span>
              )}

              <input
                accept=".png"
                className="hidden"
                required
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </label>
            <div>
              <label className="settings-component-title">Small bio</label>
              <input
                value={bioSmall}
                onChange={(e) => setBioSmall(e.target.value)}
                className="py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                placeholder="Full time toast enjoyer"
                type="text"
              />
            </div>
            <div>
              <label className="settings-component-title">Big bio</label>
              <textarea
                value={bioBig}
                onChange={(e) => setBioBig(e.target.value)}
                className="py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                placeholder="I enjoy eating toast and I also love rick astleys songs they are so good!!!"
              />
            </div>

            <div className="w-full flex flex-row gap-2">
              {!uploading && (
                <button
                  className="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 flex flex-row justify-center items-center gap-1"
                  type="submit"
                >
                  <Send />
                  Send
                </button>
              )}
              {uploading && (
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded inline-flex items-center"
                    value="Uploading"
                  >
                    <svg
                      className="animate-spin fill-current w-5 h-5 mr-3"
                      fill="none"
                      height="44"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      width="44"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                      <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                      <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                      <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                      <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                      <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                      <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                      <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                      <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                    </svg>
                    <span>Uploading...</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
        <form className="m-5 mt-2 w-4/12" onSubmit={updateInfo}>
          <div className="flex flex-col gap-4 px-0 py-2">
            <h2 className="settings-subheading">Update info:</h2>
            {invalid2 && (
              <div
                className="flex flex-row bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold flex-grow">{message2}</strong>
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => (invalid2 = false)}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </div>
            )}
            <div>
              <label className="settings-component-title">Username</label>
              <Username />
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                placeholder="Username"
                type="text"
              />
            </div>
            <div>
              <label className="settings-component-title">Email address</label>
              <Email />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                placeholder="Email address"
                type="email"
              />
            </div>
            <div>
              <label className="settings-component-title">Old Password</label>
              <Lock />
              <input
                onChange={(e) => setPasswordOld(e.target.value)}
                className="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                placeholder="Password"
                type="password"
              />
            </div>
            <div>
              <label className="settings-component-title">New Password</label>
              <Lock />
              <input
                onChange={(e) => setPasswordNew(e.target.value)}
                className="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="w-full flex flex-row gap-2">
              <button
                className="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 flex flex-row justify-center items-center gap-1"
                type="submit"
              >
                <Send />
                Send
              </button>
            </div>
          </div>
        </form>
      </Content>
    </AuthGuard>
  );
}
