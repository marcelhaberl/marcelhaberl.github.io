const Experience = {
    NONE: "none",
    JOB: "job",
    QUALIFICATION: "qualification"
}

let focused = Experience.NONE;

function focusExperience(experience) {
    const LIST_PARENT = document.querySelector("#experiences_list");

    if (experience === focused) {
        experience = Experience.NONE;
    }
    focused = experience;

    for (const ELEMENT of LIST_PARENT.children) {
        if (experience === Experience.NONE) {
            ELEMENT.style.display = "block";
        } else {
            if (ELEMENT.classList.contains(experience)) {
                ELEMENT.style.display = "block";
            } else {
                ELEMENT.style.display = "none";
            }
        }
    }
}