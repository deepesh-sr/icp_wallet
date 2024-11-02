import { ICP_token_wallet_backend } from "../../declarations/ICP_token_wallet_backend";

// Display balance
async function getBalance() {
  try {
    const balance = await ICP_token_wallet_backend.get_balance();
    document.getElementById("balance").innerText = `Balance: ${balance}`;
  } catch (error) {
    console.error("Error fetching balance:", error);
    document.getElementById("balance").innerText = "Balance: Error";
  }
}

// Send tokens
async function sendTokens(event) {
  event.preventDefault();
  const recipient = document.getElementById("recipient").value;
  const amount = parseInt(document.getElementById("amountToSend").value);

  try {
    const result = await ICP_token_wallet_backend.send_tokens(recipient, amount);
    document.getElementById("sendStatus").innerText = result ? "Tokens sent successfully!" : "Failed to send tokens.";
    getBalance();
  } catch (error) {
    console.error("Error sending tokens:", error);
    document.getElementById("sendStatus").innerText = "Error: Could not send tokens.";
  }
}

// Receive tokens
async function receiveTokens(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById("amountToReceive").value);

  try {
    await ICP_token_wallet_backend.receive_tokens(amount);
    document.getElementById("receiveStatus").innerText = "Tokens received successfully!";
    getBalance();
  } catch (error) {
    console.error("Error receiving tokens:", error);
    document.getElementById("receiveStatus").innerText = "Error: Could not receive tokens.";
  }
}

// Event listeners
document.getElementById("getBalanceButton").addEventListener("click", getBalance);
document.getElementById("sendForm").addEventListener("submit", sendTokens);
document.getElementById("receiveForm").addEventListener("submit", receiveTokens);

// Initial fetch
getBalance();
