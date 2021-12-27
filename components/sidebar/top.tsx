import Image from 'next/image';
import iconPic from '../../public/icon.png';
import styles from './SideBar.module.css';

export default function SideBarTop() {
  return (
    <div className={styles.sidebarTitle}>
      <Image width={32} height={32} src={iconPic} alt="PistonVideo Logo" />
      <div className="ml-1">PistonVideo</div>
    </div>
  );
}
