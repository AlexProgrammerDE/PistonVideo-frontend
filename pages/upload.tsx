import { Thumbnail, Video } from '../components/models/upload';
import Content from '../components/utils/Content';
import Cloud from '../components/svg/cloud';

const uploading = false;

function submit() {}

function previewFiles() {}

// noinspection JSUnusedGlobalSymbols
export default function Upload() {
  const video: Video = new Video();
  const thumbnail: Thumbnail = new Thumbnail();

  return (
    <Content>
      <form
        autoComplete="off"
        className="relative p-5 space-y-3 w-4/12"
        onSubmit={submit}
      >
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
            onChange={previewFiles}
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
            onChange={previewFiles}
          />
        </label>
        <label className="settings-component-title" htmlFor="title">
          {' '}
          Title{' '}
        </label>
        <input
          id="title"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-100 focus:border-gray-500"
          placeholder="Watching toasters toast Ep. 2"
          required
          type="text"
        />
        <label className="settings-component-title" htmlFor="description">
          {' '}
          Description{' '}
        </label>
        <textarea
          id="description"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-100 focus:border-gray-500"
          placeholder="Toast makes me happy. owo"
          rows={4}
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
    </Content>
  );
}
