const KEY = "finovo_progress_v1";
const MAX_XP = 300;

const defaultProgress = {
    xp: 0,
    badges: [],
    completedModules: [],
    xpOnceKeys: {},
    quizHistory: [] // untuk kompatibilitas pushQuizHistory
};

function load() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return {...defaultProgress };
        const parsed = JSON.parse(raw);

        return {
            xp: Number(parsed.xp || 0),
            badges: Array.isArray(parsed.badges) ? parsed.badges : [],
            completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
            xpOnceKeys: parsed.xpOnceKeys && typeof parsed.xpOnceKeys === "object" ? parsed.xpOnceKeys : {},
            quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : []
        };
    } catch (e) {
        return {...defaultProgress };
    }
}

function save(p) {
    localStorage.setItem(KEY, JSON.stringify(p));
}

export function getProgress() {
    return load();
}

export function getMaxXP() {
    return MAX_XP;
}

export function resetProgress() {
    save({...defaultProgress });
}

/* ===== API BARU (sekali saja) ===== */
export function addXPOnce(key, amount, reason = "") {
    const p = load();

    if (!key) return { added: false, xp: p.xp, reason: "invalid_key" };
    if (p.xpOnceKeys[key]) return { added: false, xp: p.xp, reason: "already_added" };

    const safeAmount = Number(amount || 0);
    const add = safeAmount > 0 ? safeAmount : 0;

    const next = Number(p.xp || 0) + add;
    p.xp = next > MAX_XP ? MAX_XP : next;

    p.xpOnceKeys[key] = true;
    save(p);

    return { added: true, xp: p.xp, reason: reason || "added" };
}

export function awardBadgeOnce(badgeId) {
    const p = load();
    if (!badgeId) return { added: false };

    if (!p.badges.includes(badgeId)) {
        p.badges.push(badgeId);
        save(p);
        return { added: true };
    }
    return { added: false };
}

export function completeModuleOnce(moduleSlug) {
    const p = load();
    if (!moduleSlug) return { added: false };

    if (!p.completedModules.includes(moduleSlug)) {
        p.completedModules.push(moduleSlug);
        save(p);
        return { added: true };
    }
    return { added: false };
}

/* ===== KOMPATIBILITAS: fungsi lama supaya file lain tidak error =====
   Catatan: fungsi lama tetap mengikuti aturan "sekali per kegiatan"
*/
export function addXP(amount, reason = "generic") {
    const key = `legacy_addxp:${String(reason).trim().toLowerCase() || "generic"}`;
    return addXPOnce(key, amount, reason);
}

export function awardBadge(badgeId) {
    return awardBadgeOnce(badgeId);
}

export function completeModule(moduleSlug) {
    return completeModuleOnce(moduleSlug);
}

export function pushQuizHistory(entry) {
    const p = load();
    const safeEntry = entry && typeof entry === "object" ? entry : { note: String(entry || "") };
    p.quizHistory = Array.isArray(p.quizHistory) ? p.quizHistory : [];
    p.quizHistory.unshift({...safeEntry, ts: Date.now() });
    p.quizHistory = p.quizHistory.slice(0, 50);
    save(p);
    return { added: true };
}