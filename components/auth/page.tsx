import AuthHeader from './header';

export default function AuthPage({ children, title }) {
  return (
    <div className="bg-white sm:bg-gray-50 min-h-screen w-screen flex flex-col justify-center items-center text-gray-800">
      <div className="bg-gray-100 shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
        <AuthHeader title={title} />
        {children}
      </div>
      <div className="p-4">© PistonVideo 2021</div>
    </div>
  );
}
