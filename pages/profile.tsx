// noinspection JSUnusedGlobalSymbols
import { FormEventHandler, useState } from 'react';
import crypto from 'crypto';
import Content from '../components/utils/Content';
import Cloud from '../components/svg/cloud';
import Send from '../components/svg/send';

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
    <Content>
      <form className="m-5 mb-0 w-4/12" onSubmit={updateData}>
        <h1 className="settings-title">Profile</h1>
        <div className="flex flex-col gap-3 px-0 py-2">
          <h2 className="settings-subheading">Update bio:</h2>
          <label className="settings-component-title">Avatar:</label>
          <label className="upload-button">
            <Cloud />
            <span className="mt-2 text-base leading-normal">Select a file</span>
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
              <button className="settings-submit-button" type="submit">
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
    </Content>
  );
}
