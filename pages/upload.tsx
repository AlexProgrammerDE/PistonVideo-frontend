import SideBarComponent from '../components/sidebar/component';
import { Thumbnail, Video } from '../components/models/upload';

const uploading = false;

function submit() {

}

function previewFiles() {

}

const video: Video = new Video();
const thumbnail: Thumbnail = new Thumbnail();

// noinspection JSUnusedGlobalSymbols
export default function Upload() {
  return (
    <div className='flex min-h-screen bg-gray-50 text-gray-800'>
      <SideBarComponent />
      <form autoComplete='off' className='relative p-5' onSubmit={submit}>
        <h1 className='text-3xl'>Upload Video</h1>
        <br />
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Select your video
          here:</label>
        <label
          className='w-64 flex flex-col items-center px-4 py-6 bg-gray-100 rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150'
        >
          <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z' />
            <path d='M9 13h2v5a1 1 0 11-2 0v-5z' />
          </svg>
          <span className='mt-2 text-base leading-normal'>Select a file</span>
          {video && <span className='mt-2 text-base leading-normal'>{video.name} </span>}

          <input ref='videoInput' accept='.mp4' className='hidden' required type='file' onChange={previewFiles} />
        </label>
        <br />
        <br />
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Select your thumbnail
          here:</label>
        <label
          className='w-64 flex flex-col items-center px-4 py-6 bg-gray-100 rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150'
        >
          <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z' />
            <path d='M9 13h2v5a1 1 0 11-2 0v-5z' />
          </svg>
          <span className='mt-2 text-base leading-normal'>Select a file</span>
          {thumbnail && <span className='mt-2 text-base leading-normal'>{thumbnail.name} </span>}
          <input ref='thumbnailInput' accept='.png' className='hidden' required type='file' onChange={previewFiles} />
        </label>
        <br />
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
               htmlFor='title'> Title </label>
        <input
          id='title'
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-100 focus:border-gray-500'
          placeholder='Watching toasters toast Ep. 2'
          required
          type='text'
        />
        <br />
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
               htmlFor='description'> Description </label>
        <textarea
          id='description'
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-100 focus:border-gray-500'
          placeholder='Toast makes me happy. owo'
          rows={4}
        />
        <br />
        {uploading ?
          <div>
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
          :
          <input
            className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
            type='submit' value='Upload' />}
      </form>
    </div>
  );
}
