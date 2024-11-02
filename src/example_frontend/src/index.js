import { ICP_token_wallet_backend } from 'declarations/ICP_token_wallet_backend';

const balanceDisplay = document.getElementById("balance");
const messageDisplay = document.getElementById("message");

// Fetch and display balance
async function fetchBalance() {
  const balance = await ICP_token_wallet_backend.get_balance();
  balanceDisplay.textContent = `Balance: ${balance} tokens`;
}

// Send tokens
async function sendTokens(event) {
  event.preventDefault();
  const recipient = document.getElementById("recipient").value;
  const amount = parseInt(document.getElementById("amount").value);

  try {
    const result = await ICP_token_wallet_backend.send_tokens(recipient, amount);
    messageDisplay.textContent = result === "Ok" ? "Tokens sent successfully!" : result;
    fetchBalance(); // Update balance after sending
  } catch (error) {
    messageDisplay.textContent = `Error: ${error}`;
  }
}

// Receive tokens
async function receiveTokens(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById("receiveAmount").value);
  await ICP_token_wallet_backend.receive_tokens(amount);
  messageDisplay.textContent = `Received ${amount} tokens successfully!`;
  fetchBalance();
}

// Initialize balance on page load
window.addEventListener("load", fetchBalance);

document.getElementById("sendForm").addEventListener("submit", sendTokens);
document.getElementById("receiveForm").addEventListener("submit", receiveTokens);
