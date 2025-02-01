"use client";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createSectionMutation } from "@/src/client/module/moodle/course-selector/section.options";
import { useMoodleStore } from "@/src/client/store/anki/moodle.store";

export default function SelectedCard() {
  const { cardSelected } = useAnkiStore((state) => state);
  const { courseIdSelected } = useMoodleStore((state) => state);
  const createSectionMutationLocal = useMutation({
    mutationFn: () => {
      if (!courseIdSelected) {
        return new Promise((resolve) => resolve(null));
      }
      return createSectionMutation({
        courseId: courseIdSelected,
        cardSelected: cardSelected,
      });
    },
  });
  return (
    <section className="flex flex-col  w-full ">
      <div className="mb-4 flex row  ">
        <Button
          disabled={cardSelected.length === 0}
          onClick={() => createSectionMutationLocal.mutate({}, null)}
        >
          <PlusIcon />
          {cardSelected.length === 0
            ? "Add some cards"
            : `Create content for ${cardSelected.length} cards`}
        </Button>
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
