import Image from 'next/image';
import Link from 'next/link';
import iconPic from '../../public/icon.png';
import styles from './SideBar.module.css';

export default function SideBarTop() {
  return (
    <div className={styles.sidebarTitle}>
      <div className="flex flex-col justify-center h-full">
        <Image width={32} height={32} src={iconPic} alt="PistonVideo Logo" />
      </div>
      <Link href="/">
        <a>
          <div className="ml-1">PistonVideo</div>
        </a>
      </Link>
    </div>
  );
}
