
let contactForm = document.getElementById("contact-form");
let formMessage = document.getElementById("form-message");

contactForm.onsubmit = function(event){
   event.preventDefault();

   let name = document.getElementById("name").value.trim();
   let email = document.getElementById("email").value.trim();
   let message = document.getElementById("message").value.trim();

   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


   if(name === ""){
    formMessage.textContent = "Please enter your name.";
   }else if(email === ""){
    formMessage.textContent = "Please enter your email.";
   }else if(!emailPattern.test(email)){
      formMessage.textContent = "Please enter a valid email address";

   }else if(message === ""){
    formMessage.textContent = "Please enter your message.";
   }else{

      contactForm.submit();
   }
};

//SUCCESS AND ERROR MESSAGE
let urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("success") === "1"){
   formMessage.textContent = "Your message has been sent successfully!";

   window.history.replaceState(null, "", window.location.pathname + "#contact");
}

if (urlParams.get("error") === "empty") {
   formMessage.textContent = "Please fill in all fields.";
   window.history.replaceState(null, "", window.location.pathname + "#contact");

   if (urlParams.get("error") === "email"){
      formMessage.textContent = "Please enter a valid email address.";
      window.history.replaceState(null, "", window.location.pathname + "#contact");
   }

   if (urlParams.get("error") === "name_length") {
      formMessage.textContent = "Your name is too long.";
   }

   if(urlParams.get("error") === "email_length"){
      formMessage.textContent = "Your email address is too long.";
   }

   if (urlParams.get("error") === "message_length") {
      formMessage.textContent = "Your message is too long. Please keep it under 1,000 characters.";
}
};

//message character counter

let messageInput = document.getElementById("message");

let messageCounter = document.getElementById("message-counter");

messageInput.addEventListener("input", function(){

   let currentLength = messageInput.value.length;

  messageCounter.textContent = currentLength + "/1000 characters";
});

