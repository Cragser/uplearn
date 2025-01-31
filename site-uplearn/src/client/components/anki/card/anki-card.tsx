import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AnkiCard } from "@/src/shared/@types/anki.types";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";

export function CardDemo({
  answer,
  errorRate,
  failed,
  lastReviewed,
  nextReview,
  question,
  remainingWork,
  repeat,
  tried,
}: Readonly<AnkiCard>) {
  const {
    cardSelected: cardSelected,
    addCardToSelected,
    removeCardFromSelected,
  } = useAnkiStore();
  const isSelected = cardSelected.some(
    (questionSelected) => questionSelected === question,
  );

  const handleToggle = (isChecked: boolean) => {
    if (isChecked) {
      addCardToSelected(question);
    } else {
      removeCardFromSelected(question);
    }
  };

  return (
    <Card className={cn("w-auto", isSelected ? "border-primary" : "")}>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
        <CardDescription>{answer}</CardDescription>
      </CardHeader>
      <div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {`Error rate: ${errorRate}%`}
            </p>
            <div>
              <p className="text-sm text-muted-foreground">
                Last revision {lastReviewed}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {`Remaining work: ${remainingWork}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="grid gap-4 mt-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Get task from this card.
            </p>
            <p className="text-sm text-muted-foreground">
              It will create a task in your course
            </p>
          </div>
          <Switch checked={isSelected} onCheckedChange={handleToggle} />
        </div>
      </CardContent>
      <CardFooter>
        {/*Stats here*/}

        {/*<Button className="w-full">*/}
        {/*	<Check /> Mark all as read*/}
        {/*</Button>*/}
      </CardFooter>
    </Card>
  );
}
