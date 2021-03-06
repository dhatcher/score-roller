(() => {
    const DEMO_ROOT = "demos";
    const ASSETS_PATH = "demos/_assets";
    const parseTemplate = (text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        return doc.head.querySelector("template");
    };
    let components = null;
    const excludedComponents = ["calcite-button"];
    const toggleAction = (action) => {
        const property = action.dataset.jsId;
        action.active = !action.active;
        if (property === "loading" || property === "disabled") {
            components = components || Array.from(document.body.querySelectorAll("[calcite-hydrated]:not([data-excluded])"));
            components.forEach((component) => {
                if (!excludedComponents.includes(component.tagName.toLowerCase())) {
                    component.toggleAttribute(property);
                }
            });
        }
        else if (property === "dir") {
            document.dir = document.dir === "rtl" ? "ltr" : "rtl";
        }
        else if (property === "theme") {
            document.body.classList.toggle("calcite-theme-dark");
        }
    };
    const attachHandlers = () => {
        const actions = document.querySelectorAll(".toggles calcite-action");
        actions.forEach((action) => action.addEventListener("click", (event) => toggleAction(event.target)));
    };
    const loadToggles = async () => {
        const root = window.location.pathname.split(DEMO_ROOT).shift();
        const response = await window.fetch(`${root}${ASSETS_PATH}/toggles.template`);
        const text = await response.text();
        const template = parseTemplate(text);
        const firstChild = document.body.firstChild;
        firstChild && document.body.insertBefore(template.content, firstChild);
        attachHandlers();
    };
    if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", loadToggles);
    }
    else {
        // `DOMContentLoaded` has already fired
        loadToggles();
    }
})();
