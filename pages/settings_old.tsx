import Content from '../components/utils/Content';

// noinspection JSUnusedGlobalSymbols
export default function Settings_old() {
  return (
    <Content>
      <div className="relative p-5 space-y-3">
        <h1 className="settings-title">Settings</h1>

        <ul>
          <li>
            <span className="settings-component-title">Select theme:</span>
            <select
              v-model="$colorMode.preference"
              className="text-md font-bold rounded border-2 border-purple-300 text-gray-600 p-2 bg-gray-50 hover:border-gray-400 focus:outline-none appearance-none"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </li>
        </ul>
      </div>
    </Content>
  );
}
