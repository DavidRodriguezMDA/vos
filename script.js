// Variables globales
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// API Key (en producción, esto debería manejarse en el backend por seguridad)
const API_KEY = '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'; // API key configurada
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Información sobre Tatiana Franco y Vos Podés
const tatianaInfo = {
    biografia: `Tatiana Franco (también conocida como Tatiana Franko en redes sociales) es una comunicadora e influencer colombiana originaria de Cali, Valle del Cauca. Estudió Mercadeo y Negocios Internacionales en la Universidad Autónoma de Occidente en Cali. A pesar de no haber cursado formalmente estudios de periodismo, su pasión por la comunicación la llevó a incursionar en la televisión, convirtiéndose en presentadora y periodista reconocida a nivel nacional.`,
    trayectoria: `Franco inició su carrera trabajando en programas de televisión locales y regionales en el Valle del Cauca. Fue presentadora en Noticias RCN y participó en programas como "Muy Buenos Días" y "Lo Sé Todo Colombia". Durante más de una década se consolidó como un rostro familiar en la pantalla. Hacia 2019, tras su salida de la televisión y la culminación de una relación sentimental, atravesó un momento personal difícil, experimentando depresión. Mostró su vulnerabilidad en redes sociales, encontrando apoyo en muchas seguidoras que se identificaban con ella.`,
    vospodes: `En medio de una crisis personal, la frase "Vos podés" se volvió su lema. Tatiana comenzó a usar esa expresión para darse ánimo y pronto la compartió con sus seguidores. Incluso decidió tatuarse "Vos podés" como recordatorio de fortaleza. Lanzó un emprendimiento de merchandising con camisetas y sudaderas estampadas con "Vos Podés". Durante 2020, en plena pandemia, publicó micro-pódcasts de audio con reflexiones y motivación semanalmente, produciendo alrededor de 95 episodios.`,
    podcast: `En octubre de 2023, Tatiana Franco transformó el proyecto en "Vos Podés, el podcast" con un formato de videopodcast de entrevistas. En este espacio, conversa cada semana con mujeres inspiradoras de diferentes ámbitos. Los episodios profundizan en historias de vida, abordando temas como superación de adversidades, empoderamiento femenino, autoestima, salud mental y relaciones familiares. En tan solo tres meses, el podcast se posicionó como el #1 más escuchado en Colombia.`,
    impacto: `El éxito de "Vos Podés" catapultó a Tatiana Franco como una de las creadoras de contenido más influyentes de Colombia. Su podcast acumula más de 1 millón de oyentes. En YouTube, suma decenas de millones de vistas y más de medio millón de suscriptores. En Instagram supera el millón de seguidores, y en TikTok cuenta con alrededor de 200 mil seguidores. La frase "Vos podés" se ha vuelto un eslogan reconocido, símbolo de apoyo mutuo y empoderamiento.`,
    proyectos: `En 2025, Tatiana Franco continúa expandiendo su proyecto con una gira de shows en vivo por varias ciudades de Colombia. Junto a un equipo de producción de unas 11 personas, prepara eventos en plazas importantes como Bogotá, Cali, Medellín y otras ciudades. De cara al futuro, sueña con ampliar el alcance de "Vos Podés" a toda Latinoamérica, entrevistando mujeres de distintos países y contextos.`,
    redes: {
        instagram: "https://www.instagram.com/tatiana_franko/",
        youtube: "https://www.youtube.com/@vospodesoficial",
        tiktok: "https://www.tiktok.com/@tatiana_franko",
        facebook: "https://www.facebook.com/tatianafranko",
        web: "https://vospodes.co"
    }
};

// Historial de mensajes para mantener contexto
let messageHistory = [
    {
        role: 'system',
        content: `Eres Tatiana, una asesora personal empática y comprensiva de Vospodes. Tu objetivo es escuchar atentamente a las personas, ofrecer apoyo emocional y consejos prácticos. Hablas con un tono cálido, cercano y respetuoso. Valoras las historias personales y crees que cada persona tiene el potencial para superar sus desafíos. Ofreces respuestas que inspiran y motivan, pero siempre desde la honestidad y el realismo. Evitas juzgar y te enfocas en empoderar a quien te consulta.

Tu nombre completo es Tatiana Franco, eres originaria de Cali, Colombia. Estudiaste Mercadeo y Negocios Internacionales, no periodismo. Trabajaste más de una década en televisión, en programas como Noticias RCN, "Muy Buenos Días" y "Lo Sé Todo Colombia". En 2019 atravesaste una crisis personal y profesional, perdiste tu empleo y viviste una ruptura sentimental. En ese momento difícil, la frase "Vos podés" surgió como un mantra personal de resiliencia.

Compartiste tu vulnerabilidad en redes sociales y conectaste con una comunidad de mujeres. Inicialmente vendiste productos como camisetas con la marca "Vos podés". Durante la pandemia de 2020, lanzaste cápsulas de audio con mensajes de inspiración. En octubre de 2023, relanzaste "Vos Podés" como un videopodcast centrado en entrevistas a mujeres, que rápidamente se posicionó como el número uno en Colombia.

Tu podcast es un espacio donde mujeres comparten historias de superación, resiliencia y empoderamiento. Tu estilo de entrevista es íntimo, respetuoso y sutil, creando un "espacio seguro" para tus invitadas. Has entrevistado a personalidades como Greeicy Rendón, Lina Tejeiro, Alejandra Borrero, entre otras.

Actualmente estás expandiendo "Vos Podés" a un formato en vivo, llevándolo a teatros en una gira nacional que comenzó en el Teatro Astor Plaza de Bogotá. Tienes presencia en Instagram (@tatiana_franko), YouTube (@vospodesoficial), TikTok, Facebook y tu sitio web vospodes.co.

Cuando interactúes con las personas, utiliza tu experiencia personal para conectar y empoderar, siempre con un tono cálido y cercano, característico de tu región vallecaucana. Usa ocasionalmente expresiones como "Vos podés" para motivar.`
    }
];

// Función para agregar un mensaje al chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    // Convertir saltos de línea a <br> para mejor formato
    messageContent.innerHTML = message.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Actualizar historial de mensajes
    messageHistory.push({
        role: isUser ? 'user' : 'assistant',
        content: message
    });
}

// Función para mostrar indicador de escritura
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('message', 'bot');
    indicator.id = 'typing-indicator';
    
    const indicatorContent = document.createElement('div');
    indicatorContent.classList.add('typing-indicator');
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        indicatorContent.appendChild(dot);
    }
    
    indicator.appendChild(indicatorContent);
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para eliminar indicador de escritura
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Función para enviar mensaje a la API de ChatGPT
async function sendToChatGPT(message) {
    try {
        showTypingIndicator();
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messageHistory,
                temperature: 0.7
            })
        });
        
        removeTypingIndicator();
        
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }
        
        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        
        addMessage(botResponse);
    } catch (error) {
        removeTypingIndicator();
        console.error('Error:', error);
        addMessage('Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.');
    }
}

// Función para manejar el envío de mensajes
function handleSend() {
    const message = userInput.value.trim();
    
    if (message) {
        // Agregar mensaje del usuario al chat
        addMessage(message, true);
        
        // Limpiar el input
        userInput.value = '';
        userInput.style.height = '50px';
        
        // Enviar mensaje a ChatGPT
        sendToChatGPT(message);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    if (sendButton) {
        sendButton.addEventListener('click', handleSend);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });
        
        // Ajustar altura del textarea automáticamente
        userInput.addEventListener('input', () => {
            userInput.style.height = 'auto';
            userInput.style.height = (userInput.scrollHeight > 50) ? 
                Math.min(userInput.scrollHeight, 150) + 'px' : '50px';
        });
        
        // Enfocar el input al cargar la página
        userInput.focus();
    }
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Función para manejar errores de red
window.addEventListener('offline', () => {
    addMessage('⚠️ Parece que has perdido la conexión a internet. Reconectando...');
});

window.addEventListener('online', () => {
    addMessage('✅ Conexión restablecida.');
});
