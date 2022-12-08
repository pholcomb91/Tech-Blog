const newCommHandler = async (event) => {
    event.preventDefault();

    var body = document.getElementById('comment-input').value;
    var conversation_id = event.target.getAttribute("blog-id");
    
    if (body && conversation_id) {
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
element.addEventListener('submit', newCommHandler);