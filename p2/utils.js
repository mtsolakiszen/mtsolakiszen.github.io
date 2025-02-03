const chatInputId = 'chat-input';
const chatMessagesId = 'chat-messages';
const apiCoffeeMessage = 'api:coffee';

const initializeBroadcastChannels = () => {
  window.bc = new BroadcastChannel('chat_channel');
  window.api_bc = new BroadcastChannel('api_channel');
  window.bc.onmessage = (message) => receiveMessage(message)
  window.api_bc.onmessage = (message) => receiveApiMessage(message)
};

const receiveMessage = (message) => {
  renderMessage('Them', message.data);
}

const sendMessage = (message) => {
  window.bc.postMessage(message);
  renderMessage('You', message);
};

const submitMessage = () => {
  const message = getMessageText();
  clearMessageText();
  sendMessage(message);
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

const receiveApiMessage = (message) => {
  if(message.data === apiCoffeeMessage) {
    getRandomCoffeeResponse();
  }
}

const getCoffee = () => {
  window.api_bc.postMessage(apiCoffeeMessage);
}

const getRandomCoffeeResponse = async () => {
  const resp = await fetch("https://dummy-json.mock.beeceptor.com/todos");
  const data = await resp.json();
  sendCoffeeResponse(data[Math.floor(Math.random() * data.length)].title.toLowerCase());
};

const sendCoffeeResponse = (coffee) => {
  sendMessage(`You should ${coffee}!`);
};
