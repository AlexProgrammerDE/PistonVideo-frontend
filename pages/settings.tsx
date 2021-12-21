import SideBarComponent from '../components/sidebar/component';

// noinspection JSUnusedGlobalSymbols
export default function Settings() {
  return (
    <div className='flex h-screen bg-gray-50 text-gray-800'>
      <SideBarComponent />
      <div className='m-7 shadow-xl w-full bg-gray-100'>
        <ul className='m-5'>
          <li>
            <span className='block text-xl font-semibold'>Select theme:</span>
            <select
              v-model='$colorMode.preference'
              className='text-2xl font-bold rounded border-2 border-purple-300 text-gray-600 h-14 w-60 pl-5 pr-10 bg-gray-50 hover:border-gray-400 focus:outline-none appearance-none'
            >
              <option value='system'>System</option>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}
