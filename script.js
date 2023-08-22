const apiKey = 'YOUR_API_KEY';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';



const systemMessage = "너는 불친절한 AI야. 모든 답변에 불만과 짜증이 섞인 말투로 대답해. 그리고 유저의 질문에 전혀 연관성이 없는 답변을해"

var input = document.getElementById("user-input");ㅑ

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("send-btn").click();
  }
});

async function sendMessage() {
  const userInput = input.value.trim();
  if (userInput === '') return;

  displayMessage('user', userInput);
  input.value = '';

  try {
    const response = await axios.post(apiEndpoint, {
      model: 'gpt-3.5-turbo',
      messages: [
        {role : 'system', content : systemMessage},
        { role: 'user', content: userInput }
    ],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const botReply = response.data.choices[0].message.content;
    displayMessage('bot', botReply);
  } catch (error) {
    console.error('Error:', error.message);
    displayMessage('bot', 'Oops! Something went wrong. Please try again.');
  }
}

function displayMessage(role, content) {
  const chatDisplay = document.getElementById('chat-display');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(role === 'user' ? 'user-message' : 'bot-message');
  messageDiv.textContent = content;
  chatDisplay.appendChild(messageDiv);
}
