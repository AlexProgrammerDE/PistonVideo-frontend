export default function SideBarNotification({ text }: { text: string }) {
  return (
    <span
      className='px-2 py-0.5 ml-auto text-xs font-medium tracking-wide rounded-full'
    >{text}
  </span>
  );
}
