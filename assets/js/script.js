// ---------- 1. Årtalet i footern uppdateras automatiskt ----------
const copyright = document.querySelector("footer p:last-child");
copyright.textContent = `© ${new Date().getFullYear()} Edwin Lund`;


// ---------- 2. Hälsning beroende på tid på dygnet ----------
const timme = new Date().getHours();
let halsning;
let emoji;

if (timme >= 5 && timme < 10) {
    halsning = "God morgon";
    emoji = "☀️";
} else if (timme >= 10 && timme < 12) {
    halsning = "God förmiddag";
    emoji = "☀️";
} else if (timme >= 12 && timme < 18) {
    halsning = "God eftermiddag";
    emoji = "☀️";
} else if (timme >= 18 && timme < 23) {
    halsning = "God kväll";
    emoji = "🌙";
} else {
    halsning = "Hej";
    emoji = "🌙";
}

// Kolla om besökaren har valt "minska rörelse" i sina inställningar
const mindreRorelse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


// ---------- 3. Skrivmaskinseffekt på rubriken ----------
const rubrik = document.querySelector("#intro h1");
const rubrikText = `${halsning}, jag heter Edwin`;

// Skärmläsare får hela texten direkt
rubrik.setAttribute("aria-label", `${rubrikText} ${emoji}`);

if (mindreRorelse) {
    rubrik.textContent = `${rubrikText} ${emoji}`;
} else {
    rubrik.textContent = "";
    let bokstav = 0;

    const skrivNasta = () => {
        if (bokstav < rubrikText.length) {
            rubrik.textContent += rubrikText[bokstav];
            bokstav++;
            setTimeout(skrivNasta, 35);
        } else {
            // Emojin läggs till sist, hel
            rubrik.textContent += ` ${emoji}`;
        }
    };

    setTimeout(skrivNasta, 300);
}


// ---------- 4. Intoning när man scrollar ----------
if (!mindreRorelse) {
    const delar = document.querySelectorAll("main section:not(#intro), footer");

    const observer = new IntersectionObserver((poster) => {
        poster.forEach((post) => {
            if (post.isIntersecting) {
                post.target.classList.add("synlig");
                observer.unobserve(post.target); // Tona bara in en gång
            }
        });
    }, { threshold: 0.15 });

    delar.forEach((del) => {
        del.classList.add("tona-in");
        observer.observe(del);
    });
}


// ---------- 5. Knapp som kopierar mailadressen ----------
const mailLank = document.querySelector('footer a[href^="mailto:"]');
const mail = mailLank.textContent;

const kopieraKnapp = document.createElement("button");
kopieraKnapp.textContent = "Kopiera";
kopieraKnapp.className = "kopiera-knapp";
kopieraKnapp.type = "button";
mailLank.after(kopieraKnapp);

kopieraKnapp.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(mail);
        kopieraKnapp.textContent = "Kopierat!";
    } catch {
        kopieraKnapp.textContent = "Gick inte att kopiera";
    }

    // Byt tillbaka texten efter 2 sekunder
    setTimeout(() => {
        kopieraKnapp.textContent = "Kopiera";
    }, 2000);
});
