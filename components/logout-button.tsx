'use client'

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export function LogoutButton() {
	return (
		<Button
			className="flex gap-3 items-center"
			onClick={() => logout()}
		>
			Logout
		</Button>
	)
}