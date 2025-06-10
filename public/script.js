async function submitLove() {
  const yourName = document.getElementById('yourName').value.trim();
  const crushName = document.getElementById('crushName').value.trim();

  if (!yourName || !crushName) {
    alert("Please enter both names!");
    return;
  }

  const score = (yourName + crushName)
    .split('')
    .reduce((sum, c) => sum + c.charCodeAt(0), 0) % 101;

  document.getElementById('result').innerText = 
    `${yourName} ❤️ ${crushName} = ${score}% love`;

  try {
    await fetch('https://frank-love-calculator-2.onrender.com/api/love', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ yourName, crushName, score })
    });
  } catch (err) {
    console.error('Failed to submit love match:', err);
    alert("Something went wrong. Please try again later.");
  }
}
