
console.log('Script loaded');
// js code waits for html to load before running
document.addEventListener('DOMContentLoaded', () => {

  // login function
  const loginForm = document.querySelector('.login-form');
  const logoutButton = document.querySelector('#logout-button')

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.querySelector('#email-login').value;
      const password = document.querySelector('#password-login').value;

      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          window.location.href = '/';
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (err) {
        console.error('Error', err);
      }
    });
  }
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/user/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          window.location.href = '/';
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (err) {
        console.error('Error', err);
      }
    });
  }


  //sign up function
  const signupForm = document.querySelector('.signup-form');

  if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Signup successful, redirect to homepage or display a success message
        window.location.href = '/';
      } else {
        // Signup failed, display an error message
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
}
});



// // Sign up function
// const signUpForm = async (event) => {
//   event.preventDefault();

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const emailSignUp = $("#signup-email").val();
//   const passwordSignUp = $("#signup-password").val();

//   // make sure that all fields are filled out correctly
//   if (!emailRegex.test(emailSignUp)) {
//     $("#signup-email-error")
//       .text("Please enter a valid email address!")
//       .addClass("text-red-700 italic text-sm");
//   }

//   if (passwordSignUp === "" || passwordSignUp < 6) {
//     $("#password-error")
//       .text("Please enter a password with at least 6 characters!")
//       .addClass("text-red-700 italic text-sm");
//   }

//   // create an object to send to the database
//   const userData = {
//     email: emailSignUp,
//     password: passwordSignUp,
//   };

//   // send the object to the database
//   const response = await fetch("/api/signup", {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     console.log("account created");
//     // Redirect to the homepage with a query parameter after successful signup
//     window.location.replace("/?signupSuccess=true");
//   } else {
//     console.log("account not created");
//   }
// };

// $("#sign-up-form").submit(signUpForm);

// // Login function
// const loginForm = async (event) => {
//   event.preventDefault();

//   const emailLogin = $("#login-email").val();
//   const passwordLogin = $("#login-password").val();

//   if (emailLogin === "") {
//     $("#login-email-error")
//       .text("Ooos, Please fill enter your email!")
//       .addClass("text-red-700 italic text-sm");
//   }

//   if (passwordLogin === "") {
//     $("#login-password-error")
//       .text("Ooos, Please enter your password!")
//       .addClass("text-red-700 italic text-sm");
//   }

//   // create an object to send to the database
//   const loginData = {
//     email: emailLogin,
//     password: passwordLogin,
//   };

//   // send the object to the database
//   const response = await fetch("/api/login", {
//     method: "POST",
//     body: JSON.stringify(loginData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     console.log("logged in");
//     location.reload(); // Refresh the page
//   } else {
//     console.log("login error");
//     // Redirect back to the login page with a query parameter after failing to login
//     window.location.replace("/login?loginFailed=true");
//   }
// };

// $("#login-form").submit(loginForm);
