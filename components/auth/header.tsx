import styles from './auth.module.css';

export default function AuthHeader({ title }: { title: string }) {
  return (
    <div>
      <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
        {title}
      </div>
      <div className={styles.divider} />
    </div>
  );
}
