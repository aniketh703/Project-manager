document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("createTaskForm");
    const assignedTasksList = document.getElementById("assignedTasksList");
    const completedTasksList = document.getElementById("completedTasksList");
    const myTasksList = document.getElementById("myTasksList");
    const allowedNames = ["Aniketh", "Teja", "Akasha", "Kushi", "Pavan"];
    const writerNameInput = document.getElementById("writerName");
    const chatMessageInput = document.getElementById("chatMessage");
    const sendButton = document.getElementById("sendButton");
    const chatMessages = document.querySelector(".chat-messages");
  
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const clearChatButton = document.getElementById("clearChatButton");
  
    clearChatButton.addEventListener("click", function () {
      chatMessages.innerHTML = "";
      localStorage.removeItem("chatMessages");
    });
  
    storedMessages.forEach((message) => {
      const chatMessageElement = document.createElement("div");
      chatMessageElement.className = "chat-message";
      chatMessageElement.textContent = message;
      chatMessages.appendChild(chatMessageElement);
    });
  
    sendButton.addEventListener("click", function () {
      const writerName = writerNameInput.value;
      const chatMessage = chatMessageInput.value;
  
      if (writerName && chatMessage) {
        const chatMessageElement = document.createElement("div");
        chatMessageElement.className = "chat-message";
        chatMessageElement.textContent = `${writerName}: ${chatMessage}`;
        chatMessages.appendChild(chatMessageElement);
  
        const storedMessages =
          JSON.parse(localStorage.getItem("chatMessages")) || [];
        storedMessages.push(`${writerName}: ${chatMessage}`);
        localStorage.setItem("chatMessages", JSON.stringify(storedMessages));
  
        chatMessageInput.value = "";
      } else {
        alert("Please select your name and type a message.");
      }
    });
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const taskName = form.querySelector("#taskName").value;
      const assignedBy = form.querySelector("#assignedTo").value;
      const dueDate = form.querySelector("#dueDate").value;
  
      const newTask = document.createElement("li");
      newTask.className = "task";
      newTask.innerHTML = `
          <div class="task-info">
      <h4>${taskName}</h4>
      <p class="task-due-date">Due on: ${dueDate}</p>
      <p class="task-assigne">Assigned by: ${assignedBy}</p>
  </div>
  <div class="task-actions">
      <button class="button-28 btn-start">Start Task</button>
      <button class="button-28 btn-complete">Task Completed</button>
  </div>
  <div class="comment-section">
  <br>
  <textarea class="comment-input" placeholder="Add a comment" style="border-radius: 10px; font-size: 16px;" rows="4" cols="50"></textarea>
  
      <button class="comment-submit button-28">Add Comment</button>
      <select class="commenter-names" style="border-radius: 10px; margin-top: 10px; padding: 8px; font-size: 16px; width: 100%;">
      <option value="Aniketh">Aniketh</option>
      <option value="Teja">Aravind</option>
      <option value="Akasha">Akasha</option>
      <option value="Kushi">Kushi</option>
      <option value="Pavan">Pavan</option>
  </select>
  </div><br>
  <div class="github-link">
      <label for="githubLink">GitHub Link:</label><br>
      <input type="text" name="githubLink" class="github-link-input" style="border-radius: 10px;margin-top: 10px; padding: 8px; font-size: 16px; width: 80%;"><br>
  </div>
  <div class="comment-list">
  </div>
          `;
  
      assignedTasksList.appendChild(newTask);
  
      form.reset();
  
      const commentSubmit = newTask.querySelector(".comment-submit");
      const commentInput = newTask.querySelector(".comment-input");
      const commenterNames = newTask.querySelector(".commenter-names");
      const commentList = newTask.querySelector(".comment-list");
      const githubLinkInput = newTask.querySelector(".github-link-input");
  
      commentSubmit.addEventListener("click", function () {
        const comment = commentInput.value;
        const selectedName = commenterNames.value;
  
        if (comment && selectedName) {
          const commentElement = document.createElement("p");
          commentElement.className = "comment";
          commentElement.textContent = `${selectedName}: ${comment}`;
          commentList.appendChild(commentElement);
  
          commentInput.value = "";
        } else {
          alert("Please provide both a comment and select a commenter.");
        }
      });
  
      const startTaskButton = newTask.querySelector(".btn-start");
      const completeTaskButton = newTask.querySelector(".btn-complete");
      startTaskButton.addEventListener("click", function () {
        const assignedTo = prompt(
          "Enter your name (" +
            allowedNames.filter((name) => name !== assignedBy).join(", ") +
            "):"
        );
        if (assignedTo && allowedNames.includes(assignedTo)) {
          newTask.querySelector(
            ".task-assigne"
          ).textContent = `Assigned by: ${assignedBy} | Assigned to: ${assignedTo}`;
          newTask.querySelector(".btn-start").remove();
          myTasksList.appendChild(newTask);
        } else {
          alert("Invalid name. Please provide a valid name.");
        }
      });
    });
  });
  