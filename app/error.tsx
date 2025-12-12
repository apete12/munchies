'use client';
import Link from 'next/link';

export default function Error() {
  return (
    <div className={'flex flex-col'}>
      <h2 className={'text-center mb-4 text-2xl text-black'}>
        {'Something went wrong, head home!'}
      </h2>
      <Link href={'/'} className={'hover:underline text-green-900 font-bold'}>
        Head back home!
      </Link>
    </div>
  );
}
