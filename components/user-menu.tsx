"use client";

import { logout } from "@/actions/auth";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";
import { Session } from "next-auth";

type UserMenuProps = {
	user: Session['user'],
}

export function UserMenu({
	user
}: UserMenuProps) {
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					<Avatar className="size-10 md:size-6">
						<AvatarImage src={user.image || ''} alt={user.userId || ''}/>
						<AvatarFallback>{user.firstName?.substring(2, 0)?.toUpperCase()}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-52">
				<DropdownMenuLabel className="flex flex-row gap-2 items-center">
					<div className="flex flex-col space-y-1">
						<p className="text-base font-medium leading-none">{user.firstName}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator/>
				<DropdownMenuItem>
					<InfoCircledIcon className="size-4 mr-2"/>
					Support
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<ConfirmDialog
					title="Sign Out"
					description="Are you sure you want to sign out?"
					onConfirm={() => logout()}
					variant="destructive"
				>
					<DropdownMenuItem preventSelect>
						<LogOutIcon className="h-4 w-4 mr-2"/> Sign out
					</DropdownMenuItem>
				</ConfirmDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}