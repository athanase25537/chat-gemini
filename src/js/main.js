async function generateContent() {
    // prompt message
    const prompt = document.getElementById('prompt').value; 
    
    // message container
    const sms_content = document.getElementById('sms-content')

    // received message
    const new_received_sms = document.createElement('div')
    new_received_sms.classList.add('sms', 'sms-received')

    // sent message
    const new_sent_sms = document.createElement('div')
    new_sent_sms.classList.add('sms', 'sms-sent')
    new_sent_sms.innerText = prompt

    // add sent message on message container
    sms_content.appendChild(new_sent_sms)


    // Effectuer un appel au backend Python
    const response = await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    new_received_sms.innerText =data.response || "Erreur lors de la génération."
    sms_content.appendChild(new_received_sms)
    
    // document.getElementById('response').innerText = data.response || "Erreur lors de la génération.";
}