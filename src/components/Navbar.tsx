import {
  House,
  MagnifyingGlass,
  Bell,
  EnvelopeSimple,
  XLogo,
  DotsThreeCircle,
  Users,
  User,
  DotsThree,
  Feather,
} from '@phosphor-icons/react';
import React from 'react';
import { user } from '../utils/user-data';

type NavItemProps = {
  text: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItemProps[] = [
  { text: 'Página Inicial', href: '#', icon: House },
  { text: 'Explorar', href: '#', icon: MagnifyingGlass },
  { text: 'Notificações', href: '#', icon: Bell },
  { text: 'Mensagens', href: '#', icon: EnvelopeSimple },
  { text: 'Comunidade', href: '#', icon: Users },
  { text: 'Premium', href: '#', icon: XLogo },
  { text: 'Perfil', href: '#', icon: User },
  { text: 'Mais', href: '#', icon: DotsThreeCircle },
];

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, text }) => (
  <div className='flex items-center gap-4 cursor-pointer p-2 lg:p-2.5 hover:bg-gray-200/10 rounded-full w-full'>
    <Icon
      className='size-6 lg:size-7'
      weight={Icon == House ? 'fill' : 'regular'}
    />
    <a href={href} className='hidden lg:block font-medium text-xl text-white'>
      {text}
    </a>
  </div>
);

// Navbar component
const Navbar: React.FC = () => {
  return (
    <nav className='w-20 lg:w-[240px] sticky top-0 p-3 h-screen flex flex-col space-y-3'>
      <a className='pl-1.5 lg:pl-3' href='#'>
        <XLogo size={32} />
      </a>

      <div className='space-y-1.5'>
        {navItems.map(({ text, href, icon }) => (
          <NavItem key={href + text} href={href} icon={icon} text={text} />
        ))}
        <button className='hidden lg:flex items-center justify-center w-full bg-white text-black text-base font-bold p-3 rounded-full mt-2'>
          <span className='hidden lg:inline'>Postar</span>
        </button>
        <button className='lg:hidden flex items-center justify-center w-full bg-white text-black text-base font-bold py-2.5 rounded-full mt-1'>
          <Feather className='size-6' weight='fill' />
        </button>
      </div>

      <div className='mt-auto flex items-center justify-between cursor-pointer lg:p-2 hover:bg-gray-200/10 rounded-full w-full'>
        <div className='flex gap-3'>
          <img
            src={user.avatar}
            alt={user.name}
            className='size-10 rounded-full'
          />
          <div className='hidden lg:flex flex-col space-y-0'>
            <span className=' text-white font-semibold text-base'>
              {user.name}
            </span>
            <span className='text-gray-100 text-sm'>@{user.username}</span>
          </div>
        </div>

        <DotsThree className='size-5 hidden lg:flex' />
      </div>
    </nav>
  );
};

export default Navbar;
