# Generador de Frases PNL

API para generar frases persuasivas basadas en técnicas de Programación Neurolingüística.

## Características

- Genera frases con estructura Command Tonality
- Crea secuencias encadenadas de afirmaciones
- Proporciona frases multisensoriales
- Produce frases que activan el poder mental profundo

## Instalación

1. Clona el repositorio
2. Ejecuta `npm install`
3. Configura la variable de entorno OPENAI_API_KEY
4. Ejecuta `npm start`

## API

### POST /generate-phrases

Endpoint para generar frases personalizadas.

**Parámetros:**
```json
{
  "userInput": "Tu intención o deseo"
}
