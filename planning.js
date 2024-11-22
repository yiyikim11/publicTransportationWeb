function addPlanBox() {
  const newPlanBox = document.createElement('div');
  newPlanBox.className = 'container';
  newPlanBox.innerHTML = `
    <div class="row childbox1">
      <div class="col-md-2"><h3>Choose your time:</h3></div>
      <div class="col-md-2 ">
        From: <input type="time" class="from-time">
        <div class="alert alert-danger" style="display: none;">Please input this</div>
      </div>
      <div class="col-md-2 ">
        To: <input type="time" class="to-time">
        <div class="alert alert-danger" style="display: none;">Please input this</div>
      </div>
      <div class="col-md-2">
        Bus Arrival Time: <input type="time" class="arrival-time">
        <div class="alert alert-danger" style="display: none;">Please input this</div>
      </div>
      <div class="col-md-3 ">
        <textarea name="message" placeholder="Write your note here." class="message" id="message"></textarea>
        <div class="alert alert-danger" style="display: none;">Please input this</div>
      </div>
      <div class="col-md-1">
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `;
  const buttonContainer = document.getElementById('button-container');
  buttonContainer.parentNode.insertBefore(newPlanBox, buttonContainer);

  // Add delete functionality to the new button
  newPlanBox.querySelector('.delete-btn').addEventListener('click', function() {
    newPlanBox.remove();
  });
}

function submitPlanning() {
  const fromTimes = document.querySelectorAll('.from-time');
  const toTimes = document.querySelectorAll('.to-time');
  const arrivalTimes = document.querySelectorAll('.arrival-time');
  const messages = document.querySelectorAll('.message');
  let valid = true;

  fromTimes.forEach(fromTime => {
    if (!fromTime.value) {
      showAlert(fromTime.nextElementSibling, 'Please input this');
      valid = false;
    } else {
      hideAlert(fromTime.nextElementSibling);
    }
  });

  toTimes.forEach(toTime => {
    if (!toTime.value) {
      showAlert(toTime.nextElementSibling, 'Please input this');
      valid = false;
    } else {
      hideAlert(toTime.nextElementSibling);
    }
  });

  arrivalTimes.forEach(arrivalTime => {
    if (!arrivalTime.value) {
      showAlert(arrivalTime.nextElementSibling, 'Please input this');
      valid = false;
    } else {
      hideAlert(arrivalTime.nextElementSibling);
    }
  });

  messages.forEach(message => {
    if (!message.value.trim()) {
      showAlert(message.nextElementSibling, 'Please input this');
      valid = false;
    } else {
      hideAlert(message.nextElementSibling);
    }
  });

  if (valid) {
    for (let i = 0; i < fromTimes.length; i++) {
      const fromTime = fromTimes[i].value;
      const toTime = toTimes[i].value;
      const arrivalTime = arrivalTimes[i].value;

      if (fromTime && toTime && fromTime >= toTime) {
        alert('From time must be earlier than to time.');
        return;
      }

      if (arrivalTime) {
        scheduleNotification(arrivalTime);
      }
    }

    alert(`Your trip plan have been added succesfully! 
      Please kindly check your email to complete your payment and further conselation. 
      Thank You for choosing us!`);
  }
}

function scheduleNotification(arrivalTime) {
  const [hours, minutes] = arrivalTime.split(':').map(Number);
  const arrivalDate = new Date();
  arrivalDate.setHours(hours, minutes, 0, 0);

  const notificationTime = new Date(arrivalDate.getTime() - 10 * 60 * 1000);

  const currentTime = new Date();
  const timeUntilNotification = notificationTime - currentTime;

  if (timeUntilNotification > 0) {
    setTimeout(() => {
      alert('Your bus will arrive in 10 minutes.');
    }, timeUntilNotification);
  } else {
    alert('The arrival time has already passed.');
  }
}

function showAlert(element, message) {
  element.style.display = 'block';
  element.textContent = message;
}

function hideAlert(element) {
  element.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('add-plan-btn').addEventListener('click', addPlanBox);
  document.getElementById('submit-btn').addEventListener('click', submitPlanning);
});
