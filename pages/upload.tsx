import ContentBox from '../components/utils/ContentBox';
import Cloud from '../components/svg/cloud';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Alert from '../components/utils/Alert';

// noinspection JSUnusedGlobalSymbols
export default function Upload() {
  const router = useRouter();
  const [video, setVideo] = useState<File>();
  const [thumbnail, setThumbnail] = useState<File>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== undefined && video !== undefined && thumbnail !== undefined) {
      const form = new FormData();

      form.append('title', title);
      form.append('description', description);
      form.append('video', video, video.name);
      form.append('thumbnail', thumbnail, thumbnail.name);

      setUploading(true);
      axios
        .post('/backend/restricted/video/create', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          setUploading(false);
          router.push('/watch?id=' + resp.data.id);
        })
        .catch((err) => {
          setUploading(false);
          setErrorMessage(err.response.data.message);
        });
    }
  };

  return (
    <ContentBox>
      <form
        autoComplete="off"
        className="relative p-5 space-y-3 max-w-3xl"
        onSubmit={submitForm}
      >
        {errorMessage && (
          <Alert
            text={errorMessage}
            onClose={() => setErrorMessage(undefined)}
          />
        )}
        <h1 className="settings-title">Upload Video</h1>
        <label className="settings-component-title">
          Select your video here:
        </label>
        <label className="upload-button">
          <Cloud />
          <span className="mt-2 text-base leading-normal">Select a file</span>
          {video && (
            <span className="mt-2 text-base leading-normal">{video.name} </span>
          )}
          <input
            accept=".mp4"
            className="hidden"
            required
            type="file"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </label>
        <label className="settings-component-title">
          Select your thumbnail here:
        </label>
        <label className="upload-button">
          <Cloud />
          <span className="mt-2 text-base leading-normal">Select a file</span>
          {thumbnail && (
            <span className="mt-2 text-base leading-normal">
              {thumbnail.name}{' '}
            </span>
          )}
          <input
            accept=".png"
            className="hidden"
            required
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </label>
        <label className="settings-component-title" htmlFor="title">
          {' '}
          Title{' '}
        </label>
        <input
          id="title"
          className="settings-text-input"
          placeholder="Watching toasters toast Ep. 2"
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="settings-component-title" htmlFor="description">
          {' '}
          Description{' '}
        </label>
        <textarea
          id="description"
          className="settings-text-input"
          placeholder="Toast makes me happy. owo"
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        {uploading ? (
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
        ) : (
          <input
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit"
            value="Upload"
          />
        )}
      </form>
    </ContentBox>
  );
}
