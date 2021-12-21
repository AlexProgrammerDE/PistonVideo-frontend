import SideBarTop from './top';
import SideBarList from './list';

export default function SideBarComponent() {
  return (
    <div
      className='flex-none fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in shadow-2xl bg-gray-100'>
      <SideBarTop />
      <SideBarList />
    </div>
  );
}
