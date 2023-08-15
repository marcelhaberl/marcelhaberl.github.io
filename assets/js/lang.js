let language = getSystemLang();

const LANG = {
    "de": {
        "greeting_morning": "Guten Morgen",
        "greeting_afternoon": "Schönen Tag",
        "greeting_evening": "Schönen Abend",
        "greeting_i_am": "ich bin Marcel Haberl.",
        "description": "Ein gelernter Maschinenbautechniker und derzeit als Spengler bei einem der führenden Unternehmen Europas für Spezialfahrzeuge in der Bergland- und Kommunaltechnik tätig.",
        "leisure": "In meiner Freizeit widme ich mich gerne der Hobby-Java-Softwarentwicklung. Darüber hinaus arbeite ich derzeit daran, meine Fähigkeiten im Bereich der Webentwicklung weiter auszubauen.",
        "imprint": "Impressum & Datenschutz",
        "cookie": "Diese Website verwendet Cookies, um Ihr Nutzererlebnis zu verbessern. Durch die Nutzung der Website stimmen Sie der Verwendung von Cookies gemäß der Datenschutzerklärung zu. ",
        "cookie_btn": "Zustimmen und fortfahren"
    },
    "en": {
        "greeting_morning": "Good morning",
        "greeting_afternoon": "Good afternoon",
        "greeting_evening": "Good evening",
        "greeting_i_am": "I am Marcel Haberl.",
        "description": "A trained mechanical engineering technician, currently working as a tinsmith at one of Europe's leading companies for special vehicles in mountain and municipal technology.",
        "leisure": "In my leisure time, I take pleasure in pursuing hobby Java software development. Additionally, I am currently engaged in enhancing my skills in web development",
        "imprint": "Imprint & Privacy",
        "cookie": "This website uses cookies to enhance your user experience. By using the website, you consent to the use of cookies in accordance with the Privacy Policy.",
        "cookie_btn": "Agree and Continue"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (hasAcceptedCookies()) {
        language = getCookie("lang");
    }
    setMessages();
});

function toggleLanguage() {
    language = (language === 'de') ? 'en' : 'de';
    setMessages();
    if (hasAcceptedCookies()) {
        setCookie("lang", language);
    }
}

function setMessages() {
    const MESSAGES = LANG[language];

    writeMessage("greeting", getGreeting(MESSAGES));
    writeMessage("greeting_i_am", MESSAGES.greeting_i_am);
    writeMessage("description", MESSAGES.description);
    writeMessage("leisure", MESSAGES.leisure);
    writeMessage("imprint", MESSAGES.imprint);
    writeMessage("cookie", MESSAGES.cookie);
    writeMessage("cookie_btn", MESSAGES.cookie_btn);
}


function writeMessage(id, message) {
    const ELEMENT = document.getElementById(id);
    if (ELEMENT) {
        ELEMENT.innerText = message;
    }
}

function getGreeting(messages) {
    const TIME = new Date().getHours();
    if (TIME >= 0 && TIME < 11) {
        return messages.greeting_morning;
    } else if (TIME >= 11 && TIME < 18) {
        return messages.greeting_afternoon;
    } else {
        return messages.greeting_evening;
    }
}

function getSystemLang() {
    for (const lang of navigator.languages) {
        if (lang.includes("en"))
            return "en";
        else if (lang.includes("de")) {
            return "de";
        }
    }
    return "en";
}