const form = document.getElementById('form');
const notificationBar = document.querySelector('[data-notification-key]');

form.addEventListener('submit', async(event) => {
    event.preventDefault();

    if (form.querySelector('button[type="submit"]').disabled) {
        return;
    }

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    await fetch('https://discord.com/api/webhooks/1339518923145744435/Owhhz9KL8gIQk9G4TWZQ6TJVtVPCcGGDuhgaZ68v2FieiMndylFcpnPC0zFboN4Fedag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `**Naam:** ${name.value}\n**Email:** ${email.value}\n\n**Bericht verstuurd:** "${message.value}"`
        })
    }).then(response => {
        setNotification('Uw bericht is succesvol verzonden!', 'success');
        toggleNotification();

        name.value = null;
        email.value = null;
        message.value = null;
    }).catch(error => {
        setNotification('Er is iets fout gegaan. Uw bericht is niet verzonden.', 'error');
        toggleNotification();
    });

    setTimeout(() => {
        fadeOutNotification();
    }, 3000);
});

const setNotification = (msg, type) => {
    notificationBar.innerHTML = msg;

    if(type === 'success') {
        notificationBar.classList.add('bg-green-500');
    } else if(type === 'error') {
        notificationBar.classList.add('bg-red-500');
    }
};

const toggleNotification = () => {
    notificationBar.classList.toggle('hidden');
};

const fadeOutNotification = () => {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            notificationBar.classList.add(`opacity-${100 - i}`);
            notificationBar.classList.remove(`opacity-${(100 - i) + 1}`);
        }, 30);
    }

    setTimeout(() => {
        notificationBar.classList.remove('opacity-1');
        toggleNotification();
    }, 100 * 30);
};