async function generateContent() {
    // message container
    const sms_content = document.getElementById('sms-content')

    // prompt message
    const prompt = document.getElementById('prompt').value;

    // received message
    const new_received_sms = document.createElement('div')
    new_received_sms.classList.add('sms', 'sms-received')

    // sent message
    const new_sent_sms = document.createElement('div')
    new_sent_sms.classList.add('sms', 'sms-sent')
    new_sent_sms.innerText = prompt

    // add sent message on message container
    sms_content.appendChild(new_sent_sms)
    
    scrollToBottom()

    // create loader
    const div_loader = document.createElement('div')
    div_loader.classList.add('sms', 'sms-received', 'load')
    let span = document.createElement('span')
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    div_loader.appendChild(span)
    div_loader.appendChild(span1)
    div_loader.appendChild(span2)

    sms_content.appendChild(div_loader)
    const loader = document.querySelectorAll('.load span')
    let i = 0
    setInterval(() => {
        loader[i].classList.add('active')
        setTimeout(() => {
            loader[i].classList.remove('active')
            i++
            if(i>(loader.length-1)) i = 0
        }, 300)
    }, 500)

    scrollToBottom()


    p = document.getElementById('prompt');
    p.value = ''

    // Effectuer un appel au backend Python
    const response = await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });
    
    const data = await response.json();
    div_loader.remove()    
    new_received_sms.innerText =data.response || "Erreur lors de la génération."
    sms_content.appendChild(new_received_sms)
    
    scrollToBottom()
}

// Function to scroll to the bottom of a container
function scrollToBottom() {
    var container = document.getElementById('sms-content');
    container.scrollTop = container.scrollHeight;
}


const prompt = document.getElementById('prompt')
prompt.addEventListener('keydown', (e) => {
    if(prompt.value.trim() != '' && e.key == 'Enter') {
        generateContent()
        prompt.value = ''
    }
})

const btn = document.querySelector('.chat-form button')
btn.addEventListener('click', () => {
    if(prompt.value.trim() != '') generateContent()
})
