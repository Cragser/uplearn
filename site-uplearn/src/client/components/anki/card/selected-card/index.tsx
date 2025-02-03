"use client";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMoodleStore } from "@/src/client/store/anki/moodle.store";
import { Progress } from "@/components/ui/progress";
import { useCreateSection } from "./hooks/use-create-section";

export default function SelectedCard() {
  const { cardSelected } = useAnkiStore((state) => state);
  const { courseIdSelected } = useMoodleStore((state) => state);
  const { progress, createSection, isLoading } = useCreateSection(
    courseIdSelected,
    cardSelected,
  );

  return (
    <section className="flex flex-col w-full">
      <div className="mb-4 flex flex-row items-center gap-8 w-full">
        <Button
          disabled={cardSelected.length === 0 || isLoading}
          onClick={() => createSection()}
        >
          <PlusIcon />
          {cardSelected.length === 0
            ? "Add some cards"
            : `Create content for ${cardSelected.length} cards`}
        </Button>
        {isLoading && (
          <div className="flex-1 flex items-center">
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </div>

      <section className="flex flex-row gap-2 flex-wrap">
        {cardSelected.map((card) => (
          <Badge variant="secondary" key={card} className="w-fit h-fit p-2">
            {card}
          </Badge>
        ))}
      </section>
    </section>
  );
}
