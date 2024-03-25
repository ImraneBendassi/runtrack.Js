function jourPasques(annee) {
    const a = annee % 19;
    const b = Math.floor(annee / 100);
    const c = annee % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = h + l - 7 * m + 114;
    const mois = Math.floor(n / 31);
    const jour = n % 31 + 1;
    return new Date(annee, mois - 1, jour);
}

function joursFeries2024() {
    const joursFeries = [
        new Date(2024, 0, 1), // 1er janvier
        new Date(2024, 4, 1), // 1er mai
        new Date(2024, 7, 14), // 14 juillet
        new Date(2024, 11, 25), // 25 décembre
    ];

    const pasques = jourPasques(2024);
    const ascension = new Date(pasques.getTime() + (39 - pasques.getDay()) * 24 * 60 * 60 * 1000); // 39 jours après Pâques
    const pentecote = new Date(ascension.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 jours après l'Ascension

    joursFeries.push(ascension, pentecote);

    return joursFeries;
}

function jourTravaille(date) {
    const jourDeLaSemaine = date.getDay();
    if (jourDeLaSemaine === 0 || jourDeLaSemaine === 6) {
        console.log(`Non, ${date.getDate()} ${date.toLocaleString('fr-FR', { month: 'long' })} ${date.getFullYear()} est un week-end`);
        return;
    }

    const dateString = date.toISOString().slice(0, 10); 
    const estJourFerie = joursFeries2024().some(jourFerie => jourFerie.toISOString().slice(0, 10) === dateString);
    if (estJourFerie) {
        console.log(`Le ${date.getDate()} ${date.toLocaleString('fr-FR', { month: 'long' })} ${date.getFullYear()} est un jour férié`);
        return;
    }

    console.log(`Oui, ${date.getDate()} ${date.toLocaleString('fr-FR', { month: 'long' })} ${date.getFullYear()} est un jour travaillé`);
}

const dateTest = new Date(2024, 0, 1); // 1er janvier 2024
jourTravaille(dateTest)