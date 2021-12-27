import SideBarComponent from '../sidebar/component';

export default function Layout({ children }) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      {children}
    </div>
  );
}
