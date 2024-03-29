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

    let top = false;
    let last = null;

    for (const PARENT of LIST_PARENT.children) {
        const ELEMENT = PARENT.children.item(0);
        if (experience === Experience.NONE) {
            ELEMENT.style.display = "block";
            removeHideClasses(PARENT);
        } else {
            if (ELEMENT.classList.contains(experience)) {
                ELEMENT.style.display = "block";
                if (!top) {
                    top = true;
                    PARENT.classList.add("hide-top");
                }
                if (experience === Experience.QUALIFICATION) {
                    last = PARENT;
                }
            } else {
                ELEMENT.style.display = "none";
                removeHideClasses(PARENT);
            }
        }
    }

    if (last != null) {
        last.classList.add("hide-bottom");
    }
}

function removeHideClasses(element) {
    element.classList.remove("hide-top");
    element.classList.remove("hide-bottom");
}

document.addEventListener("experiencesWritten", function() {
    console.log("HI")
    setHeight();
    document.addEventListener("resize", setHeight);
});

function setHeight() {
    const NODE = document.querySelector("#experiences_list");
    NODE.style.minHeight = NODE.clientHeight.toString() + "px";
    console.log(NODE.clientHeight.toString() + "px")
    console.log(NODE.style.minHeight)
}