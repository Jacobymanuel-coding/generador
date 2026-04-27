const API_KEY = "TU_API_KEY_AQUI"; // Pega aquí la llave que obtuviste

async function generarPlanificación() {
    const materia = document.getElementById('materia').value;
    const tecnologia = document.getElementById('nivel-tech').value;
    const resultadoDiv = document.getElementById('resultado-plan');

    resultadoDiv.innerHTML = "<p>⏳ Generando secuencia didáctica adaptada...</p>";

    // Instrucción para la IA (El Prompt Pedagógico)
    const promptMaestro = `
        Actúa como un experto en pedagogía panameña. 
        Materia: ${materia}. 
        Nivel tecnológico del aula: ${tecnologia}.
        
        Usa mi formato oficial de secuencia didáctica. 
        Si el nivel tecnológico es 'ninguno', propón actividades con materiales concretos (tablero, papel, dibujos). 
        Si es 'alto', usa herramientas digitales.
        
        Estructura la respuesta con:
        1. Inicio (Actividades de motivación)
        2. Desarrollo (Construcción del conocimiento)
        3. Cierre (Evaluación y reflexión)
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptMaestro }] }]
            })
        });

        const data = await response.json();
        const textoGenerado = data.candidates[0].content.parts[0].text;
        
        // Mostrar el resultado en la web
        resultadoDiv.innerHTML = `<h3>Secuencia Generada:</h3><div>${textoGenerado}</div>`;
        
    } catch (error) {
        resultadoDiv.innerHTML = "<p>❌ Error al conectar con la IA. Revisa tu API Key.</p>";
        console.error(error);
    }
}
