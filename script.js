async function humanizeText() {
    const inputText = document.getElementById('inputText').value.trim();
    const btn = document.querySelector('.humanize-btn');
    const loader = document.querySelector('.loader');
    const btnText = document.querySelector('.btn-text');
    
    if (!inputText) {
        showError('Please enter some text to humanize');
        return;
    }
    
    if (inputText.length > 500) {
        showError('Text exceeds 500 character limit');
        return;
    }

    try {
        // Show loading state
        btn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');

        const response = await fetch(`https://ccprojectapis.ddns.net/api/aihuman?text=${encodeURIComponent(inputText)}`);
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        if (data.error && data.error !== "No") {
            throw new Error(data.error);
        }

        // Update results
        document.getElementById('message1').textContent = data.message || 'No casual version available';
        document.getElementById('message2').textContent = data.message2 || 'No professional version available';
        
    } catch (error) {
        showError(`Error: ${error.message}`);
    } finally {
        // Reset button state
        btn.disabled = false;
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text)
        .then(() => alert('Copied to clipboard!'))
        .catch(() => showError('Failed to copy text'));
}

function showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    
    document.body.appendChild(errorEl);
    
    setTimeout(() => {
        errorEl.remove();
    }, 3000);
}
