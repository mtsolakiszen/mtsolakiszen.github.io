const chatInputId = 'chat-input';
const chatMessagesId = 'chat-messages';

const initializeBroadcastChannel = () => {
  window.bc = new BroadcastChannel('chat_channel');
  window.bc.onmessage = (message) => receiveMessage(message)
};

const receiveMessage = (message) => {
  renderMessage('Them', message.data);
}

const sendMessage = (message) => {
  window.bc.postMessage(message);
};

const submitMessage = () => {
  const message = getMessageText();
  clearMessageText();
  sendMessage(message);
  renderMessage('You', message);
}

const getMessageText = () => (
  document.getElementById(chatInputId).value
)

const clearMessageText = () => {
  document.getElementById(chatInputId).value = '';
}

const renderMessage = (author, message) => {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(`${author}: ${message}`));
  document.getElementById(chatMessagesId).appendChild(li);
}
