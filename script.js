const WeeklySchedule = {
  monday: { isActive: false, timeSlots: [] },
  tuesday: { isActive: false, timeSlots: [] },
  wednesday: { isActive: false, timeSlots: [] },
  thursday: { isActive: false, timeSlots: [] },
  friday: { isActive: false, timeSlots: [] },
};
const theme = localStorage.getItem("localTheme");
if (theme === "dark"){
  document.body.classList.add("dark--mode");
document.getElementById("1").classList.add("fill");
document.getElementById("2").classList.add("stroke");
}
let idCardCounter = 0;
document.getElementById("main").addEventListener("click", (event) => {
  const action = event.target.getAttribute("data-action");
  if (action === "addCard") {
    const container = event.target.closest(".time__card");
    const day = container.id; 
    // initialise the
    const newCard = {
      id: `${day}-${idCardCounter}`,
    };
    WeeklySchedule[day].timeSlots.push(newCard);
    // creating dom elements
    const timeSlotContainer = container.querySelector(".time__card_timers");
    const mydiv = document.createElement("div");
    const timeSLotText = document.createElement("span");
    const timeSLotText1 = document.createElement("span");
    const timeSlotInput = document.createElement("input");
    const timeSlotInput1 = document.createElement("input");
    timeSlotInput.type = "time";
    timeSlotInput1.type = "time";
    mydiv.classList.add("row");
    mydiv.id = `${day}-${idCardCounter}`;
    const closeBtn = document.createElement("button");
    // adding classes
    ////
    timeSLotText.classList.add("from__to");
    timeSLotText.textContent = "From";
    ////
    timeSLotText1.classList.add("from__to");
    timeSLotText1.textContent = "To";
    ////
    timeSlotInput.classList.add("timer");
    ////
    timeSlotInput1.classList.add("timer");
    ////
    closeBtn.classList.add("button__close");
    closeBtn.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
            >
              <path
                fill="#000"
                fill-rule="evenodd"
                d="M12.854 2.854a.5.5 0 0 0-.708-.708L7.5 6.793L2.854 2.146a.5.5 0 1 0-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 0 0 .708.708L7.5 8.207l4.646 4.647a.5.5 0 0 0 .708-.708L8.207 7.5z"
                clip-rule="evenodd"
              />
            </svg>`;

    //Adding the created element to its container
    timeSlotContainer.appendChild(mydiv);
    mydiv.appendChild(timeSLotText);
    mydiv.appendChild(timeSlotInput);
    mydiv.appendChild(timeSLotText1);
    mydiv.appendChild(timeSlotInput1);
    mydiv.appendChild(closeBtn);
    //closure for the delete button (each button remembers its id and day)
    closeBtn.onclick = () => deleteCard(newCard.id, day);
    idCardCounter++;
  }
});

// toggle
document.getElementById("main").addEventListener("click", (event) => {
  const action = event.target.getAttribute("data-action");
  if (action === "toggle") {
    const container = event.target.closest(".time__card");
    const day = container.id;
    const timersContainer = container.querySelector(".time__card_timers");
    WeeklySchedule[day].isActive = !WeeklySchedule[day].isActive;
    if (WeeklySchedule[day].isActive) {
      container
        .querySelector(".toggle__button")
        .classList.add("button__active");
      container.querySelector(".circle").classList.add("circle__active");
      container.querySelector(".time__card_button").classList.remove("hidden");
      timersContainer.classList.remove("hidden");
      container.classList.add("timeSlotstyle");
    } else {
      container
        .querySelector(".toggle__button")
        .classList.remove("button__active");
      container.querySelector(".circle").classList.remove("circle__active");
      container.querySelector(".time__card_button").classList.add("hidden");
      timersContainer.classList.add("hidden");
      container.classList.remove("timeSlotstyle");
    }
  }
});
function deleteCard(cardId, day) {
  const containerr = document.getElementById(`${day}`);
  const timerSlots = containerr.querySelector(".time__card_timers");
  const row = timerSlots.querySelector(`#${cardId}`);
  timerSlots.removeChild(row);
  //removing it from the data
  WeeklySchedule[day].timeSlots = WeeklySchedule[day].timeSlots.filter(
    (x) => x.id !== cardId
  );
}

document.getElementById("theme-button").addEventListener("click", () => {
document.body.classList.toggle("dark--mode");
document.getElementById("1").classList.toggle("fill");
document.getElementById("2").classList.toggle("stroke");
if(document.body.classList.contains("dark--mode")){
  localStorage.setItem("localTheme", "dark");
} else {
  localStorage.setItem("localTheme", "dark");
}
});