import munchiesLogo from '../../assets/munchies.svg';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex w-full py-3">
      <h1 className="sr-only">Munchies</h1>
      <div className="">
        <Link href={`/`} className="" id="return-home-link">
          <Image className="max-w-72" src={munchiesLogo} alt="munchies logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
