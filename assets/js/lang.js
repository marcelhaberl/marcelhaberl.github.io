let language = 'de';

const lang = {
    "de": {
        "greeting_morning": "Guten Morgen",
        "greeting_afternoon": "Schönen Tag",
        "greeting_evening": "Schönen Abend",
        "greeting_i_am": "ich bin Marcel Haberl.",
        "description": "Ein gelernter Maschinenbautechniker und derzeit als Spengler bei einem der führenden Unternehmen Europas für Spezialfahrzeuge in der Bergland- und Kommunaltechnik tätig.",
        "leisure": "In meiner Freizeit widme ich mich gerne der Hobby-Java-Softwarentwicklung. Darüber hinaus arbeite ich derzeit daran, meine Fähigkeiten im Bereich der Webentwicklung weiter auszubauen.",
        "imprint": "Impressum & Datenschutz"
    },
    "en": {
        "greeting_morning": "Good morning",
        "greeting_afternoon": "Good afternoon",
        "greeting_evening": "Good evening",
        "greeting_i_am": "I am Marcel Haberl.",
        "description": "A trained mechanical engineering technician, currently working as a tinsmith at one of Europe's leading companies for special vehicles in mountain and municipal technology.",
        "leisure": "In my leisure time, I take pleasure in pursuing hobby Java software development. Additionally, I am currently engaged in enhancing my skills in web development",
        "imprint": "Imprint & Privacy"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    setText();
});

function toggleLanguage() {
    language = (language === 'de') ? 'en' : 'de';
    setText();
}

function setText() {
    const messages = lang[language];

    document.getElementById("greeting").innerText = getGreeting(messages);
    document.getElementById("greeting_i_am").innerText = messages.greeting_i_am;
    document.getElementById("description").innerText = messages.description;
    document.getElementById("leisure").innerText = messages.leisure;
    document.getElementById("imprint").innerText = messages.imprint;
}

function getGreeting(messages) {
    const time = new Date().getHours();
    if (time >= 0 && time < 11) {
        return messages.greeting_morning;
    } else if (time >= 11 && time < 18) {
        return messages.greeting_afternoon;
    } else {
        return messages.greeting_evening;
    }
}