import SideBarComponent from '../sidebar/component';

export default function Content({ children }) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      <div className="m-7 shadow-xl w-full bg-gray-100 flex flex-col">
        {children}
      </div>
    </div>
  );
}
