import { auth, signIn, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BadgePlus, LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='px-2 py-1 md:px-5 md:py-3   bg-white md:shadow-sm font-work-sans fixed top-0 md:top-5 left-0 right-0 z-50 md:max-w-7xl md:mx-auto md:rounded-[30px] shadow-sm  flex flex-col '>
      <nav className='flex  justify-between items-center max-md:gap-5'>
        <Link href='/'>
          <Image src='/logo.png' width={144} height={30} alt='logo' />
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <BadgePlus className='size-6 text-primary md:hidden ' />
                <span className='max-md:hidden md:inline'>Create</span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <Button type='submit' variant='ghost' className='text-primary '>
                  <span className='max-sm:hidden'>Logout</span>
                  <LogOut className=' size-4  md:hidden text-red-500' />
                </Button>
              </form>
              <Link href={`/user/${session?.id}`} className='flex items-center'>
                <Avatar>
                  <AvatarImage
                    className='size-6 md:size-10 rounded-full border border-primary p-[0.25px] shadow-sm'
                    alt={session?.user?.name}
                    src={session?.user?.image}
                  />
                  <AvatarFallback>{session?.user?.name}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  'use server';
                  await signIn('github');
                }}
              >
                <Button type='submit' variant='ghost'>
                  <LogIn className='size-4  md:hidden text-primary' />
                  <span className='max-sm:hidden md:inline'>Login</span>
                </Button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
