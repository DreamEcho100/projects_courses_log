document.addEventListener("DOMContentLoaded", () => {
    const script = document.createElement("script")
    script.src = `js/${Math.random() >= 0.5 ? "script.js" : "script2.js"}`;
    document.body.appendChild(script);
});