import { DeckSelector } from "@/src/client/module/anki/deck-selector/deck-selector";
import AnkiCardGallery from "@/src/client/module/anki/card-gallery/anki-card-gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Anki Decks</h1>
      <DeckSelector />
      <AnkiCardGallery />
    </div>
  );
}
