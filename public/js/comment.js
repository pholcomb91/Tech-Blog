const newCommHandler = async (event) => {
    event.preventDefault();
    var commentInputEl = document.getElementById('comment-input');
    var body = commentInputEl.value;
    var blog_id = commentInputEl.getAttribute("blog-id");
    console.log("Comment.js is working")
    if (body && blog_id) {
      const response = await fetch(`/api/comm`, {
        method: 'POST',
        body: JSON.stringify({ body, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create project');
      }
    }
  };

const element = document.getElementById('submit');
element.addEventListener('click', newCommHandler);