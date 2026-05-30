import { OfflinePlaceholder } from '../components/OfflinePlaceholder';

export default function Offline() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="px-4 py-16">
        <OfflinePlaceholder />
      </div>
    </div>
  );
}
