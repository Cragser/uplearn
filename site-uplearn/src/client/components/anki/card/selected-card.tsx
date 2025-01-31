"use client";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createSection } from "@/src/server/api/moodle/section/create-section.service";
import { createSectionMutation } from "@/src/client/module/moodle/course-selector/section.options";

export default function SelectedCard() {
  const { cardSelected } = useAnkiStore((state) => state);
  const createSectionMutationLocal = useMutation({
    mutationFn: () =>
      createSectionMutation({
        courseId: 1,
        name: "test",
        description: "description",
      }),
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
