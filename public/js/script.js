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

    const container = document.getElementById('posts-container');

    // Fetch the posts from the server
    fetch('/api/user/posts')
      .then(response => response.json())
      .then(posts => {
        // Iterate over the posts and create HTML elements to display them
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Author: ${post.username}</p>
          `;
          container.appendChild(postElement);
        });
      })
      .catch(error => console.error(error));
  }
});

// // create new post from dashboard
// fetch('/api/dashboard/posts', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ title: 'New Post', content: 'Post content' })
// })
//   .then(response => response.json())
//   .then(data => {
//     // message comes from routes, the res.json line
//     console.log(data.message);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // update a post from dashboard
// fetch(`/api/dashboard/posts/${post_id}`, {
//   method: 'PUT',
//   headers: { 'content-type': 'application/json' },
//   body: JSON.stringify({ title: 'Updated Post', content: 'Updated Content' })
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.message);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// // delete a post from dashboard
// fetch(`/api/dashboard/posts/${post_id}`, {
//   method: 'DELETE',
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.message);
//   })
//   .catch(error => {
//     console.error(error);
//   });

  fetch('/api/dashboard/posts')
  .then(response => response.json())
  .then(posts => {
    // Iterate over the posts and create HTML elements to display them
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p>Author: ${post.username}</p>
        <button class="edit-post" data-post-id="${post.id}">Edit</button>
        <button class="delete-post" data-post-id="${post.id}">Delete</button>
      `;
      container.appendChild(postElement);
    });

    // Attach event listeners to the edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-post');
    editButtons.forEach(button => {
      const postId = button.dataset.postId;
      button.addEventListener('click', () => {
        // Handle edit operation for the post with postId
        // You can use the postId to make the corresponding fetch request
        console.log(`Edit post with ID: ${postId}`);
      });
    });

    const deleteButtons = document.querySelectorAll('.delete-post');
    deleteButtons.forEach(button => {
      const postId = button.dataset.postId;
      button.addEventListener('click', () => {
        // Handle delete operation for the post with postId
        // You can use the postId to make the corresponding fetch request
        console.log(`Delete post with ID: ${postId}`);
      });
    });
  })
  .catch(error => console.error(error));