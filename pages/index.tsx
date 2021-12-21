import SideBarComponent from '../components/sidebar/component';
import VideoList from '../components/video/list';

// noinspection JSUnusedGlobalSymbols
export default function Home() {
    return (
      <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
          <SideBarComponent />
          <VideoList />
      </div>
    )
}
