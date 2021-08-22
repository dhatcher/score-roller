// example for adding and removing loading state from button
function loadingButton(el, duration) {
    el.setAttribute("loading", "");
    setTimeout(() => el.removeAttribute("loading"), duration);
}
