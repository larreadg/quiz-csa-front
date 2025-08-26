export interface PreguntaOriginal {
  pregunta: string;
  r1: any; // respuesta correcta
  r2: any;
  r3: any;
  r4: any;
}

export interface PreguntaFormateada {
  pregunta: string;
  respuestas: any[];
  correcta: number;
}

export function formatearPreguntasAleatorias(
  preguntas: PreguntaOriginal[]
): PreguntaFormateada[] {
  // Mezclar y tomar 10 al azar
  const seleccionadas = [...preguntas]
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  return seleccionadas.map((p) => {
    const opciones = [p.r1, p.r2, p.r3, p.r4];
    const respuestas = [...opciones].sort(() => 0.5 - Math.random());
    const correcta = respuestas.indexOf(p.r1);

    return {
      pregunta: p.pregunta,
      respuestas,
      correcta,
    };
  });
}


const mensajesVictoria = [
  "¡Muy bien! ¡Ganaste! ¡Eres todo un genio! 🧠🏆",
  "¡Lo lograste! Tu esfuerzo brilló como una estrella ✨",
  "¡Victoria épica! ¡Qué crack eres! 🎮🌟",
  "¡Imparable! Nadie te detiene cuando te concentras 🚀",
  "¡Excelente! Tu cerebro estuvo on fire 🔥🧠",
  "¡Campeón, campeona! ¡Punto para ti! 🥇😄",
  "¡Qué nivel! Resolviste todo como un pro 🎯",
  "¡Bravo! La práctica te hace maestro 👏📚",
  "¡Guaaaau! ¡Eso fue genial! 🤩💫",
  "¡Misión cumplida! Agente secreto del éxito 🕵️‍♂️✅",
  "¡Recontra bien! Tu paciencia ganó la partida 🧩🏆",
  "¡Superestrella! Brillas con tu talento 🌟⭐",
  "¡Fantástico! Tu estrategia fue perfecta 🗺️💡",
  "¡Gran trabajo! ¡Lo hiciste con todo tu corazón! ❤️💪",
  "¡Aplausos! ¡Qué jugada inteligente! 👏🧠",
  "¡Sos una máquina! ¡Nivel completado! 🤖✅",
  "¡Yujuu! ¡Ganar se te da muy bien! 🎉🥳",
  "¡Vamosss! ¡Tu esfuerzo valió la pena! 💪🏁",
  "¡Qué orgullo! ¡Te salió espectacular! 🥰🌈",
  "¡Triunfo total! ¡Nada te detiene! 🛡️🚀",
  "¡Qué capo/capa! ¡Sumaste otra victoria! ➕🏆",
  "¡Brillaste! ¡Tu mente es poderosa! ✨🧠",
  "¡Grandioso! ¡De 10 puntos! 🔟⭐",
  "¡Excelente actitud! ¡Así se gana! 😎✌️",
  "¡Woohoo! ¡Eres puro talento! 🎉🎸",
  "¡Crack total! ¡Te luciste! 🌟🙌",
  "¡Re bien! ¡Te salió de primera! 🥇🎯",
  "¡Qué genialidad! ¡Sigamos jugando! 🎮😁",
  "¡Perfecto! ¡Tu plan funcionó! 📋✅",
  "¡Victoria desbloqueada! 🗝️🏆",
  "¡Superpoderes activados! 🦸‍♀️🦸‍♂️✨",
  "¡Qué mente brillante! 💡🤓",
  "¡Lo conseguiste con paciencia y calma! 🧘‍♂️🌟",
  "¡Top! ¡Sos increíble! 🧡🔥",
  "¡Te pasó la pelota la suerte y vos goleaste! ⚽🥳",
  "¡A todo ritmo! ¡Ganaste como un rockstar! 🎵🏆",
  "¡Bingo! ¡Todo salió genial! 🎯🎉",
  "¡Qué aventura! ¡Final feliz gracias a ti! 🗺️🌈",
  "¡Subiste de nivel! ¡Qué emoción! ⬆️🎮",
  "¡Reyes y reinas del juego saludan tu victoria! 👑✨"
];

// Ejemplo de uso:
export const mensajeAleatorio = () => mensajesVictoria[Math.floor(Math.random() * mensajesVictoria.length)];
