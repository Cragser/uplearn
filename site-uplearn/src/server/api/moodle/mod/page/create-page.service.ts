import axios from "axios";
import {
  getMoodleConnectUrl,
  getMoodleToken,
} from "@/src/server/api/moodle/moodle-connection";

export const createPage = async () => {
  try {
    const response = await axios.post(getMoodleConnectUrl(), null, {
      params: {
        content:
          "<p>Bienvenidos al curso, aquí encontrarás información importante.</p>",
        contentformat: 1,
        course: 4, // ID del curso donde se creará la página
        intro: "Esta es la introducción de la página.",
        introformat: 1, // 1 = HTML
        moodlewsrestformat: "json",
        name: "Página de Bienvenida",
        wsfunction: "mod_page_add_instance",
        wstoken: getMoodleToken(),
      },
    });

    console.log("Curso creado:", response.data);
  } catch (error) {
    console.error("Error creando curso:", error);
  }
};
