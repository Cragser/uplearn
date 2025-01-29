import { DeckSelector } from "@/src/client/components/deck-selector";
import {getAnkiNextConnection} from "@/src/server/api/anki/anki-connection";
import AnkiCardGallery from "@/src/client/module/anki/anki-card-gallery";
import {getMoodleNextConnection} from "@/src/server/api/moodle/moodle-connection";

async function getData() {
  const res = await fetch(getAnkiNextConnection('get-decks'));
  return res.json();
}

// todo:
// https://github.com/WebHare/moodle-webservice#readme

async function getMoodleCourses() {
    const res = await fetch(getMoodleNextConnection('get-courses'));
    return res.json();
}

export default async function HomePage() {
  const decks= await getData();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">
        Anki Decks
      </h1>
      <DeckSelector decks={decks} />
        <AnkiCardGallery/>
    </div>
  );
}
