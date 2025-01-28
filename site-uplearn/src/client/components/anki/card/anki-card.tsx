import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {AnkiCard} from "@/src/shared/@types/anki.types";


const notifications = [
	{
		title: "Your call has been confirmed.",
		description: "1 hour ago",
	},
	{
		title: "You have a new message!",
		description: "1 hour ago",
	},
	{
		title: "Your subscription is expiring soon!",
		description: "2 hours ago",
	},
]



export function CardDemo({
							 answer,
							 question,
							 lastReviewed
						 }: Readonly<AnkiCard>) {
	return (
		<Card className={cn("w-[380px]")}>
			<CardHeader>
				<CardTitle>{question}</CardTitle>
				<CardDescription>Last revision {lastReviewed}.</CardDescription>
			</CardHeader>
			<div>
				<div
					className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
				>
					<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							{"Solution"}
						</p>
						<p className="text-sm text-muted-foreground">
							{answer}
						</p>
					</div>
				</div>
			</div>
			<CardContent className="grid gap-4 mt-4">
				<div className=" flex items-center space-x-4 rounded-md border p-4">
					<BellRing/>
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium leading-none">
							Get task from this card.
						</p>
						<p className="text-sm text-muted-foreground">
							It will create a task in your course
						</p>
					</div>
					<Switch/>
				</div>

			</CardContent>
			{/*<CardFooter>*/}
			{/*	<Button className="w-full">*/}
			{/*		<Check /> Mark all as read*/}
			{/*	</Button>*/}
			{/*</CardFooter>*/}
		</Card>
	)
}
