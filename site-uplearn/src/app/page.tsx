import { DeckSelector } from "@/src/client/module/anki/deck-selector/deck-selector";
import AnkiCardGallery from "@/src/client/module/anki/card-gallery/anki-card-gallery";
import { CourseSelector } from "@/src/client/module/moodle/course-selector/course-selector";
import SelectedCard from "@/src/client/components/anki/card/selected-card";

export default async function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Anki Decks</h1>
      <section className="flex justify-between gap-16">
        <section className="flex flex-col gap-4 justify-start min-w-[20rem]">
          <DeckSelector />
          <CourseSelector />
        </section>
        <SelectedCard />
      </section>
      <AnkiCardGallery />
    </div>
  );
}
