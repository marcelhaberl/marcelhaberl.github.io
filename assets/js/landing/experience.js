let experiences;

function fetchExperiences() {
    fetch("/assets/experiences.json")
        .then(res => res.json())
        .then(json => experiences = json)
        .then(writeExperiences)
}

function writeExperiences() {
    if (experiences === undefined) {
        console.log("No experiences found.")
        return
    }

    const PARENT = document.getElementById("experiences_list");
    for (const EXPERIENCE of experiences[currentLanguage]) {
        const NODE = createBaseNode(EXPERIENCE)
        NODE.appendChild(getName(EXPERIENCE));
        NODE.appendChild(getCompany(EXPERIENCE));
        NODE.appendChild(getDate(EXPERIENCE));
        writeDescription(NODE, EXPERIENCE);
        PARENT.appendChild(NODE);
    }
}

function createBaseNode(experience) {
    const NODE = document.createElement("div");
    NODE.classList.add(experience["class"]);
    return NODE;
}

function getName(experience) {
    const NAME_ELEMENT = document.createElement("h3");
    NAME_ELEMENT.textContent = experience["name"];
    return NAME_ELEMENT;
}

function getDate(experience) {
    const DATES = experience["date"].split(";");
    const ELEMENT = document.createElement("p");

    if (DATES.length === 1) {
        ELEMENT.textContent = DATES[0];
        return ELEMENT;
    }

    const START_DATE = DATES[0];
    const IS_TODAY = DATES[1] === "TODAY";
    const END_DATE= getEndDate(DATES[1], IS_TODAY);

    let years = getYear(END_DATE) - getYear(START_DATE);
    let months = getMonth(END_DATE) + 1 - getMonth(START_DATE);
    if (getMonth(END_DATE) <= getMonth(START_DATE)) {
        years--;
        months--;
    }

    let DATES_COMBINED = START_DATE + " - " + (IS_TODAY ? getMessages()["today"] : END_DATE);
    years = (years === 0 ? "" : years + " " + (years === 1 ? getMessages()["year"] : getMessages()["years"]) + " ");

    if (months < 0) months *= -1;
    if (getMonth(END_DATE) < getMonth(START_DATE)) months--;
    months = (months === 0 && years !== "" ? "" : months + " " + (months === 1 ? getMessages()["month"] : getMessages()["months"]));

    ELEMENT.textContent = DATES_COMBINED + " • " + years + months;
    return ELEMENT;
}

function getYear(date) {
    return parseInt(date.split("/")[1]);
}

function getMonth(date) {
    return parseInt(date.split("/")[0]);
}

function getEndDate(endDate, isToday) {
    if (!isToday) {
        return endDate;
    }

    const DATE = new Date();
    DATE.setMonth(DATE.getMonth()+1);
    const MONTH = DATE.getMonth();
    return (MONTH <= 9 && !MONTH.toString().startsWith("0") ? "0" : "") + MONTH + "/" + DATE.getFullYear();
}

function getCompany(experience) {
    const ELEMENT = document.createElement("a");
    ELEMENT.href = experience["link"];
    ELEMENT.innerText = experience["company"];
    return ELEMENT;
}

function writeDescription(node, experience) {
    const DESCRIPTION = experience["description"];
    if (DESCRIPTION === undefined || DESCRIPTION.length === 0) return;

    const LIST = document.createElement("ul");
    for (let description of DESCRIPTION) {
        const ITEM = document.createElement("li");
        ITEM.textContent = description;
        LIST.appendChild(ITEM);
    }
    node.appendChild(LIST);
}