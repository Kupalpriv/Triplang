async function humanizeText() {
    const inputText = document.getElementById('inputText').value;
    const messageElement = document.getElementById('message');
    const loader = document.querySelector('.loader');
    
    loader.classList.remove('hidden');
    messageElement.textContent = "Processing...";

    try {
        const response = await fetch(`https://kaiz-apis.gleeze.com/api/humanizer?q=${encodeURIComponent(inputText)}`);
        const data = await response.json();
        messageElement.textContent = data.response;
    } catch (error) {
        messageElement.textContent = "An error occurred. Please try again.";
    } finally {
        loader.classList.add('hidden');
    }
}
