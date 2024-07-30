document.addEventListener('DOMContentLoaded', function () {
    const messageForm = document.getElementById('messageForm');
    const postForm = document.getElementById('postForm');
    const messagesDiv = document.getElementById('messages');
    const postsDiv = document.getElementById('posts');

    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const recipient = document.getElementById('recipient').value;
        const message = document.getElementById('message').value;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `<p><strong>받는 사람:</strong> ${recipient}</p><p>${message}</p>`;
        
        messagesDiv.appendChild(messageDiv);
        
        messageForm.reset();
    });

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<h4>${title}</h4><p>${content}</p>`;
        
        postsDiv.appendChild(postDiv);
        
        postForm.reset();
    });
});
