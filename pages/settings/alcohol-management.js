// Function for setting time period with two prompts
function setTimePeriod() {
  alert("Please set the start time.");
  alert("Please set the end time.");
}

// Function to toggle between Lottery and Fixed reward type
function toggleRewardType() {
  const lotteryButton = document.getElementById("lottery");
  const fixedButton = document.getElementById("fixed");

  if (lotteryButton.style.display === "none") {
      lotteryButton.style.display = "inline-block";
      fixedButton.style.display = "none";
  } else {
      lotteryButton.style.display = "none";
      fixedButton.style.display = "inline-block";
  }
}

// Function for date picker (you can replace this with actual date picker logic)
function openDatePicker() {
  alert("Date picker would open here.");
}
