import Image from 'next/image'
import iconPic from '../../public/icon.png'

export default function SideBarTop() {
  return (
    <div>
      <div
        className='flex flex-row items-center justify-center my-1 p-2 h-14 border-b border-gray-400 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-400 content-center'
      >
        <Image width={32} height={32} src={iconPic} alt="PistonVideo Logo"/>
        <div className="ml-1">PistonVideo</div>
      </div>
    </div>
  );
}
