"use client";

import { login } from "@/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().min(1),
	password: z.string().min(1)
})

export type LoginFormSchema = z.infer<typeof formSchema>

export default function LoginForm() {
	
	const [error, setError] = useState<string|undefined>();
	
	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "test@example.com",
			password: "P@ssw0rd123"
		}
	})
	
	const onSubmit = async (formData: LoginFormSchema) => {
		const response = await login(formData);
		if(response && !response.success){
			return setError(response.message);
		}
	}
	
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="email@example.com" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({field}) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>Password</FormLabel>
								<Link
									href={"/forgot-password"}
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<FormControl>
								<Input type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<SubmitButton type="submit" className="w-full">Submit</SubmitButton>
				{error && (
					<Alert variant="destructive">
						<ExclamationTriangleIcon className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							{error}
						</AlertDescription>
					</Alert>
				)}
			</form>
		</Form>
	)
} 