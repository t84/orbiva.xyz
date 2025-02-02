const discordUserId = '442142462857707520';

async function fetchDiscordStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
        const data = await response.json();

        if (data.success) {
            const status = data.data.discord_status;
            updateStatusIndicator(status);
        } else {
            console.error('Failed to fetch Discord status:', data.error);
        }
    } catch (error) {
        console.error('Error fetching Discord status:', error);
    }
}

function updateStatusIndicator(status) {
    const statusElement = document.getElementById('status');

    statusElement.classList.remove('online', 'idle', 'dnd', 'offline');

    if (status === 'online' || status === 'idle' || status === 'dnd') {
        statusElement.classList.add('online');
        statusElement.textContent = 'I am currently online on Discord.';
    } else {
        statusElement.classList.add('offline');
        statusElement.textContent = 'I am currently offline on Discord.';
    }
}

setInterval(fetchDiscordStatus, 5000);

fetchDiscordStatus();

const textElement = document.getElementById('typing-text');
const textWidth = textElement.scrollWidth + 5; 

textElement.style.setProperty('--text-width', `${textWidth}px`);