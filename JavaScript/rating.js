document.addEventListener("DOMContentLoaded", function () {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
    updateVisitorCount();
    updateTopCountries();
    updateVisitorTimeZones();
    updateOwnerTimeZone();
});

// Live time update
function updateLiveTime() {
    const now = new Date();
    document.getElementById("liveTime").textContent = now.toLocaleTimeString();
}

// Simulate visitor stats (Replace with real API later)
function updateVisitorCount() {
    document.getElementById("visitorCount").textContent = Math.floor(Math.random() * 10000);
}

function updateTopCountries() {
    document.getElementById("topCountries").textContent = "USA, India, UK, Canada, Germany";
}

function updateVisitorTimeZones() {
    document.getElementById("visitorTimeZones").textContent = "UTC, GMT, PST, EST, IST";
}

function updateOwnerTimeZone() {
    document.getElementById("ownerTimeZone").textContent = "Africa/Dar_es_Salaam (TZ)";
}

// Rating system
let totalRatings = 0;

function rate(stars) {
    totalRatings++;
    document.getElementById("totalRatings").textContent = totalRatings;
    document.getElementById("ratingMessage").textContent = `You rated ${stars} stars! Thank you!`;

    sendEmailNotification(stars);
}

// Send rating notification email
function sendEmailNotification(stars) {
    const email = "frediezra360@gmail.com";
    const subject = "New Rating for FredieTech Website";
    const body = `A user rated your website ${stars} stars. Total ratings: ${totalRatings}.`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Emoji reaction system
let totalReactions = 0;
document.getElementById("emojiList").addEventListener("click", function (event) {
    if (event.target.innerText.trim()) {
        totalReactions++;
        document.getElementById("totalReactions").textContent = totalReactions;
    }
});
