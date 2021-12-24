import SideBarComponent from '../components/sidebar/component';
import VideoUserList from '../components/video/user-list';
import { User } from '../components/models/video';

// noinspection JSUnusedGlobalSymbols
export default function UserPage() {
  const user: User = undefined;
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />

      <div className="m-5 w-full">
        <div className="flex flex-col">
          <div className="bg-blue-100 shadow-lg rounded-2xl">
            <div className="flex flex-row items-center mt-40 mb-10 mx-10 bg-gray-100 rounded-1xl shadow-lg w-42 h-40">
              <img
                alt={'Avatar of ' + user.username}
                src={user.avatarUrl}
                className="w-40 h-40 mr-5 flex-none bg-cover
              rounded-t lg:rounded-t-none lg:rounded-l rounded-1xl text-center overflow-hidden"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {user.username}
                </h2>
                <p className="text-gray-700">{user.bioSmall}</p>
              </div>
            </div>
          </div>
          <VideoUserList videos={[]} />
        </div>
      </div>
    </div>
  );
}