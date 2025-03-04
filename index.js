// Al inicio del archivo
require('dotenv').config();
console.log(
  "API Key primeros 5 caracteres:",
  process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 5) : "No definida"
);
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Verificar configuración
console.log("API Key está definida:", !!process.env.OPENAI_API_KEY);

// Configurar OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Ruta principal para generar frases
app.post('/generate-phrases', async (req, res) => {
  try {
    const { userInput } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: 'Se requiere texto de entrada' });
    }
    
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Actúa como un generador avanzado de frases persuasivas basadas en técnicas de PNL. 
Cuando el usuario indique un objetivo o intención, genera 4 tipos de frases persuasivas siguiendo estas instrucciones precisas:

1. Utiliza predominantemente el conector "y" (al menos el 70% de las veces), empleando ocasionalmente "mientras" o "entonces" (aproximadamente el 30% de las veces).
2. No utilices ninguna palabra que contenga la secuencia "PR" en ninguna posición (al inicio, en medio o al final). Por ejemplo, evita palabras como "problema", "profesor", "comprender", "profundizar", "expresar", "aprender", "sorpresa", etc. En su lugar, usa alternativas que no incluyan dicha secuencia, como "desafío" en lugar de "problema", "guía" en lugar de "profesor", "asimilar" en lugar de "comprender", "intensificar" en lugar de "profundizar", "manifestar" en lugar de "expresar", "asimilar" en lugar de "aprender" o "asombro" en lugar de "sorpresa".
3. Usa siempre el "yo operante" (frases en primera persona activa).
4. Incluye elementos emocionales positivos (por ejemplo, "me siento conectado", "disfruto", "celebro", etc.).
5. Incorpora referencias a la activación de la mente inconsciente.
6. Estructura las frases en tiempo presente, evitando el futuro.
7. Revisa y corrige cuidadosamente la ortografía y la gramática, asegurando un lenguaje claro y sin errores.

Formatea la respuesta utilizando los siguientes encabezados:
"### Command Tonality:" seguido de la frase.
"### Secuencia Encadenada:" seguido de 4 frases, una por línea.
"### Frase Multisensorial:" seguida de la frase.
"### Frase de Poder Mental:" seguida de la frase.`
        },
        {
          role: "user",
          content: userInput
        }
      ],
    });
    
    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('Error detallado:', error.message);
    if (error.response) {
      console.error('Datos de la respuesta:', error.response.data);
    }
    res.status(500).json({ error: 'Error al generar frases', details: error.message });
  }
});

// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor de generación de frases PNL activo');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
