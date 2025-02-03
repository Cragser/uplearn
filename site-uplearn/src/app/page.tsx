import { DeckSelector } from "@/src/client/module/anki/deck-selector/deck-selector";
import AnkiCardGallery from "@/src/client/module/anki/card-gallery/anki-card-gallery";
import { CourseSelector } from "@/src/client/module/moodle/course-selector/course-selector";
import SelectedCard from "@/src/client/components/anki/card/selected-card";
import { Header } from "../client/components/header/header";

export default async function HomePage() {
  return (
    <div className="container mx-auto gap 8">
      <Header />
      <section className="flex justify-between gap-16 mt-8">
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
