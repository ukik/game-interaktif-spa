export default function confetti() {
    for (let i = 0; i < 30; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.top = (Math.random() * 100 + (-Math.random() * 200)) + "px";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = `hsl(${Math.random() * 360},90%,60%)`;
        c.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2); // ✅ 0.4 – 1.0
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 1300);
    }
    for (let i = 0; i < 30; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.top = (Math.random() * 100 + (-Math.random() * 200)) + "px";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = `hsl(${Math.random() * 360},90%,60%)`;
        c.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2); // ✅ 0.4 – 1.0
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2300);
    }
}
