import { Developer, Verified } from './svg/badges';

export default function UserBadge({ badge }: { badge: string }) {
  switch (badge) {
    case 'dev':
      return <Developer className="w-8 h-8" />;
    case 'verified':
      return <Verified className="w-8 h-8" />;
    default:
      return null;
  }
}
