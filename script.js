function updateClock() {
  const now = new Date();
  
  // Update digital clock
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  document.getElementById('hours').textContent = hours % 12 || 12;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  
  // Add class to trigger fade-out
  const secondsElem = document.getElementById('seconds');
  secondsElem.classList.add('fade-out');
  
  // Remove class after animation ends to prepare for the next change
  setTimeout(() => {
    secondsElem.classList.remove('fade-out');
  }, 500); // Matches the duration of the CSS animation

  // Update date
  const date = now.toDateString();
  document.getElementById('date').textContent = date;
  
  // Calculate rotation angles with -90 degree adjustment
  const secondDeg = ((now.getSeconds() / 60) * 360) - 90;
  const minuteDeg = ((now.getMinutes() / 60) * 360) + ((now.getSeconds() / 60) * 6) - 90;
  const hourDeg = ((now.getHours() % 12) / 12) * 360 + ((now.getMinutes() / 60) * 30) - 90;
  
  // Update analog clock hands
  document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
  document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
  document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to set the clock immediately
updateClock();
