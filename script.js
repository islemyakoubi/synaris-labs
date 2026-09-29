// Language toggle
let currentLang = 'en';

const langToggle = document.getElementById('langToggle');
const elementsWithLang = document.querySelectorAll('[data-en]');

function switchLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    
    elementsWithLang.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            element.textContent = text;
        }
    });

    const langCurrent = document.querySelector('.lang-current');
    const langOther = document.querySelector('.lang-other');
    
    if (currentLang === 'fr') {
        langCurrent.textContent = 'FR';
        langOther.textContent = 'EN';
        document.documentElement.lang = 'fr';
    } else {
        langCurrent.textContent = 'EN';
        langOther.textContent = 'FR';
        document.documentElement.lang = 'en';
    }
}

langToggle.addEventListener('click', switchLanguage);

// Demo simulation
const startDemoBtn = document.getElementById('startDemo');
const resetDemoBtn = document.getElementById('resetDemo');
const enquiryList = document.getElementById('enquiryList');
const processingView = document.getElementById('processingView');
const responseList = document.getElementById('responseList');
const demoStatus = document.getElementById('demoStatus');

let demoRunning = false;
let demoTimeout;

const demoScenarios = {
    en: [
        {
            enquiry: {
                source: 'WhatsApp',
                text: "Hi, I'm looking for a 2-bedroom apartment in Dubai Marina. Budget around 120k AED per year. When can I view?",
                time: '09:23'
            },
            qualification: {
                'Type': 'Rental',
                'Bedrooms': '2',
                'Location': 'Dubai Marina',
                'Budget': '120,000 AED/year',
                'Urgency': 'High'
            },
            response: {
                text: "Hi! Thank you for your interest. I've found several 2-bedroom apartments in Dubai Marina within your budget. I can arrange viewings for tomorrow afternoon or Thursday morning. Which works better for you?",
                time: '09:25'
            },
            followUp: {
                text: "Hi again! Just following up on the Dubai Marina apartments. I have three excellent options ready to show you. Are you still interested in viewing them this week?",
                time: '24h later'
            }
        },
        {
            enquiry: {
                source: 'Email',
                text: "Bonjour, je voudrais des informations sur votre cours d'anglais intensif. Quels sont les horaires et les tarifs?",
                time: '14:47'
            },
            qualification: {
                'Type': 'Course Enquiry',
                'Course': 'Intensive English',
                'Language': 'French',
                'Info Needed': 'Schedule & Pricing',
                'Urgency': 'Medium'
            },
            response: {
                text: "Bonjour! Notre cours d'anglais intensif a lieu du lundi au vendredi, de 9h à 12h. Le tarif est de 450€ par mois. La prochaine session commence le 15 octobre. Souhaitez-vous réserver une place?",
                time: '14:49'
            },
            followUp: {
                text: "Bonjour! Je voulais m'assurer que vous avez reçu les informations sur notre cours d'anglais intensif. Avez-vous des questions supplémentaires? Il ne reste que quelques places pour la session d'octobre.",
                time: '24h later'
            }
        }
    ],
    fr: [
        {
            enquiry: {
                source: 'WhatsApp',
                text: "Bonjour, je cherche un appartement de 2 chambres à Dubai Marina. Budget environ 120k AED par an. Quand puis-je visiter ?",
                time: '09:23'
            },
            qualification: {
                'Type': 'Location',
                'Chambres': '2',
                'Localisation': 'Dubai Marina',
                'Budget': '120 000 AED/an',
                'Urgence': 'Élevée'
            },
            response: {
                text: "Bonjour ! Merci pour votre intérêt. J'ai trouvé plusieurs appartements de 2 chambres à Dubai Marina dans votre budget. Je peux organiser des visites demain après-midi ou jeudi matin. Qu'est-ce qui vous convient le mieux ?",
                time: '09:25'
            },
            followUp: {
                text: "Rebonjour ! Je fais un suivi concernant les appartements à Dubai Marina. J'ai trois excellentes options prêtes à vous montrer. Êtes-vous toujours intéressé(e) pour les visiter cette semaine ?",
                time: '24h plus tard'
            }
        },
        {
            enquiry: {
                source: 'Email',
                text: "Hello, I would like information about your intensive English course. What are the schedules and prices?",
                time: '14:47'
            },
            qualification: {
                'Type': 'Demande de cours',
                'Cours': 'Anglais intensif',
                'Langue': 'Anglais',
                'Info demandée': 'Horaires et prix',
                'Urgence': 'Moyenne'
            },
            response: {
                text: "Hello! Our intensive English course runs Monday to Friday, 9 AM to 12 PM. The fee is €450 per month. The next session starts October 15th. Would you like to reserve a spot?",
                time: '14:49'
            },
            followUp: {
                text: "Hello! I wanted to make sure you received the information about our intensive English course. Do you have any additional questions? Only a few spots remain for the October session.",
                time: '24h plus tard'
            }
        }
    ]
};

function createEnquiryElement(enquiry) {
    const div = document.createElement('div');
    div.className = 'enquiry-item';
    div.innerHTML = `
        <div class="enquiry-header">
            <span class="enquiry-source">${enquiry.source}</span>
            <span class="enquiry-time">${enquiry.time}</span>
        </div>
        <div class="enquiry-text">${enquiry.text}</div>
    `;
    return div;
}

function createProcessingElement(qualification) {
    const div = document.createElement('div');
    div.className = 'processing-item';
    
    const fields = Object.entries(qualification).map(([label, value]) => `
        <div class="qualification-field">
            <span class="field-label">${label}:</span>
            <span class="field-value">${value}</span>
        </div>
    `).join('');
    
    div.innerHTML = `
        <div class="processing-label">${currentLang === 'en' ? 'Qualification complete' : 'Qualification terminée'}</div>
        <div class="qualification-fields">${fields}</div>
    `;
    return div;
}

function createResponseElement(response, isFollowUp = false) {
    const div = document.createElement('div');
    div.className = 'response-item';
    div.innerHTML = `
        <div class="response-header">
            <span class="response-status">${isFollowUp ? (currentLang === 'en' ? 'Follow-up' : 'Suivi') : (currentLang === 'en' ? 'Sent' : 'Envoyé')}</span>
            <span class="response-time">${response.time}</span>
        </div>
        <div class="response-text">${response.text}</div>
    `;
    return div;
}

function clearDemo() {
    enquiryList.innerHTML = '';
    responseList.innerHTML = '';
    processingView.innerHTML = `<div class="processing-placeholder" data-en="Waiting for enquiries..." data-fr="En attente de demandes...">${currentLang === 'en' ? 'Waiting for enquiries...' : 'En attente de demandes...'}</div>`;
    demoStatus.textContent = '';
    demoStatus.className = 'demo-status';
}

async function runDemo() {
    if (demoRunning) return;
    
    demoRunning = true;
    startDemoBtn.disabled = true;
    clearDemo();
    
    const scenarios = demoScenarios[currentLang];
    
    demoStatus.textContent = currentLang === 'en' ? 'Demo running...' : 'Démo en cours...';
    demoStatus.className = 'demo-status active';
    
    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 1000 : 2000));
        
        enquiryList.appendChild(createEnquiryElement(scenario.enquiry));
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        processingView.innerHTML = '';
        processingView.appendChild(createProcessingElement(scenario.qualification));
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        responseList.appendChild(createResponseElement(scenario.response));
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        responseList.appendChild(createResponseElement(scenario.followUp, true));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    demoStatus.textContent = currentLang === 'en' ? 'Demo complete! Click "Start Demo" to run again.' : 'Démo terminée ! Cliquez sur "Démarrer la démo" pour relancer.';
    demoStatus.className = 'demo-status';
    
    demoRunning = false;
    startDemoBtn.disabled = false;
}

startDemoBtn.addEventListener('click', runDemo);
resetDemoBtn.addEventListener('click', () => {
    if (demoRunning) {
        demoRunning = false;
        startDemoBtn.disabled = false;
    }
    clearDemo();
    demoStatus.textContent = currentLang === 'en' ? 'Demo reset. Ready to start.' : 'Démo réinitialisée. Prêt à démarrer.';
});

// Auto-play support via URL parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('autoplay') === '1') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const demoSection = document.getElementById('demo');
            demoSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(runDemo, 1000);
        }, 1000);
    });
}
