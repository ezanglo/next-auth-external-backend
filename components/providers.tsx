"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

type ProvidersProps = {
	children: React.ReactNode,
}

export function Providers({
	children
}: ProvidersProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
			{children}
			<TailwindIndicator/>
			<Toaster
				toastOptions={{
					unstyled: true,
					classNames: {
						toast: "border rounded-lg w-full p-4 bg-black text-foreground flex flex-row items-center gap-2",
						error: "border-destructive text-red-200",
						success: "border-green-500 text-green-200",
						info: "border-blue-500 text-blue-200",
					}
				}}
			/>
			<div className="fixed bottom-0 right-0 p-5 flex items-center gap-2">
				<ModeToggle/>
			</div>
		</ThemeProvider>
	)
}