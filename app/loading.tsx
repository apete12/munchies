import Link from 'next/link';

export default function Loading() {
  return (
    <div className={'flex flex-col'}>
      <h2 className={'text-center mb-4 text-2xl text-black'}>
        {'Loading your restaurants!'}
      </h2>
      <Link href={'/'} className={'hover:underline text-green-900 font-bold'}>
        Head back home!
      </Link>
    </div>
  );
}
