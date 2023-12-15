// Base URL
const base_url = 'https://edc-iitd-backend.vercel.app/';

// Contact Form
const contactForm = document.getElementById('myForm');
const contactLoader = document.getElementById('submitLoader');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    contactLoader.classList.add("display");
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('body').value;
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url}api/message`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status == 201) {
                    swal({
                        title: "Message sent successfully",
                        icon: "success",
                    });
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('subject').value = '';
                    document.getElementById('body').value = '';
                    contactLoader.classList.remove("display");
                }
                else {
                    swal({
                        title: "Something went wrong, please try again",
                        icon: "info",
                    });
                    contactLoader.classList.remove("display");
                }
            })
    }
    catch (error) {
        console.log('Error:' + error);
        swal({
            title: "Some Error occured",
            icon: "error",
        });
        contactLoader.classList.remove("display");
    }
})