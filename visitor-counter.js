let visitorCount = 0;

function updateVisitorCount() {
    fetch('/visitor-counter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'increment' })
    })
    .then(response => response.json())
    .then(data => {
        visitorCount = data.visitorCount;
        document.getElementById('visitorCount').textContent = visitorCount;
    })
    .catch(error => {
        console.error('Error updating visitor count:', error);
    });
}

window.addEventListener('load', updateVisitorCount);
