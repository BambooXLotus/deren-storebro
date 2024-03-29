import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/trpc/server';
import { UserButton } from '@clerk/nextjs';

import { MainNav } from './main-nav';
import { StoreSwitcher } from './store-switcher';

export const Navbar: React.FC = async () => {
  // const { isSignedIn, user } = useUser();
  const stores = await api.store.getAll.query();

  return (
    // <nav className="bg-teal-600 px-4 py-1.5 backdrop-blur-sm md:px-5">
    //   <div className="mx-auto flex items-center justify-between">
    //     <div className="flex flex-row items-center">
    //       <Image src="/favicon-32x32.png" height="32" width="32" alt="logo" />
    //       <Link href="/" className="hidden md:block">
    //         <span
    //           className={cn(
    //             pixel.className,
    //             "mr-4 self-center whitespace-nowrap text-2xl font-extrabold text-orange-500",
    //           )}
    //         >
    //           StoreBro
    //         </span>
    //       </Link>
    //       {/* <NavBarItem target="/products/" label="Products" />
    //       <NavBarItem target="/categories" label="Categories" />
    //       <NavBarItem target="/orders" label="Orders" /> */}
    //       <MainNav />
    //     </div>
    //     <div className="flex flex-row items-center gap-3">
    //       {user?.username && (
    //         <NavBarItem
    //           target={`/gallery/${user.username}`}
    //           label="Your Gallery"
    //         />
    //       )}
    //       {isSignedIn && <NavBarItem target={`/profile/`} label="Profile" />}
    //       <div>
    //         {!isSignedIn && <SignInButton />}
    //         <UserButton />
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <div className="border-b bg-teal-600">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="hidden md:block">
          <Image
            src="/android-chrome-192x192.png"
            height="64"
            width="64"
            alt="StoreBro Logo"
            className="mr-2"
          />
        </Link>
        <StoreSwitcher items={stores} />
        <MainNav className="mx-3" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
