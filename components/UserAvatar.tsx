"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  User,
  Settings,
  UserPlus,
  Mail,
  Bell,
  MessageSquare,
  LogOut,
  LifeBuoy,
  PlusCircle,
} from "lucide-react";

const UserAvatar = () => {
  const router = useRouter();
  const session = useSession();

  const handleAuthentication = () => {
    router.push("/auth/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='bg-transparent outline-none focus:bg-transparent relative'>
        <Button
          type='button'
          aria-pressed='false'
          size='icon'
          className='outline-none bg-transparent focus-visible:ring-0 cursor-pointer'
          title='user'>
          <Avatar>
            <AvatarImage
              src='https://github.com/shadcn.png'
              className='cursor-pointer'
              alt='user-avatar'
            />
            <AvatarFallback>BL</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px] md:w-[230px] md:mr-4 mt-[13px]'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className='mr-2 h-4 w-4' />
            <span>Notifications</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className='mr-2 h-4 w-4' />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className='mr-2 h-4 w-4' />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className='mr-2 h-4 w-4' />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LifeBuoy className='mr-2 h-4 w-4' />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {session.status === "authenticated" ? (
            <Button
              className='bg-inherit w-full text-black hover:bg-inherit'
              onClick={() => signOut()}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Sign Out</span>
            </Button>
          ) : (
            <Button
              className='bg-inherit w-full text-black hover:bg-inherit'
              onClick={handleAuthentication}>
              <span>Sign In</span>
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
