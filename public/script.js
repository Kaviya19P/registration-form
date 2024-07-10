
document.getElementById ('signupForm').addEventListener ('submit', async function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        let response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        });
        let data = await response.json();
        document.getElementById('message').textContent = data.message;

    }
    catch(error){
        console.error('Error', error);
    }
});