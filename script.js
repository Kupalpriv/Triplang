async function humanizeText() {
    const inputText = document.getElementById('inputText').value;
    const message1Element = document.getElementById('message1');
    const message2Element = document.getElementById('message2');
    
    if (!inputText) {
        alert('Please enter some text to humanize');
        return;
    }

    try {
        const response = await fetch(`https://betadash-api-swordslush-production.up.railway.app/humanize?text=${encodeURIComponent(inputText)}`);
        const data = await response.json();
        
        if (data.error === "No") {
            message1Element.textContent = data.message;
            message2Element.textContent = data.message2;
        } else {
            alert('Error in humanizing text');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the API');
    }
}
