"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
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
  PlusCircle,
  UserRound,
} from "lucide-react";
import { logout } from "@/actions/logout";

const UserAvatar = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const initials = user?.name.charAt(0).toUpperCase();

  const handleAuthentication = () => {
    router.push("/auth/login");
  };

  const handleSignOut = () => {
    logout();
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
              src={user?.image || ""}
              className='cursor-pointer'
              alt='user-avatar'
            />
            <AvatarFallback className='text-black font-bold text-lg'>
              {user ? (
                <>{initials}</>
              ) : (
                <UserRound className='text-black h-4 w-4' />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px] md:w-[230px] md:mr-4 mt-[13px]'>
        {!user ? (
          <div className='px-2 space-y-6 pt-4'>
            <p className='text-sm'>
              You are not signed in. Please sign in to continue{" "}
            </p>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                className='bg-inherit w-full text-black hover:bg-inherit'
                onClick={handleAuthentication}>
                <span>Sign In</span>
              </Button>
            </DropdownMenuItem>
          </div>
        ) : (
          <>
            <DropdownMenuLabel>
              {user && (
                <p> {user?.name[0].toUpperCase() + user?.name.substring(1)}</p>
              )}
            </DropdownMenuLabel>
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
              <Button
                className='bg-inherit w-full text-black hover:bg-inherit'
                onClick={handleSignOut}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Sign Out</span>
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
