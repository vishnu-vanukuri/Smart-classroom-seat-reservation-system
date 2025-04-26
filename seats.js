let selectedSeat = null;
let bookedSeats = {};
let selectedClass = null;

function loginStudent() {
    const regNumber = document.getElementById('reg-number').value.trim();
    const password = document.getElementById('password').value.trim();
    selectedClass = document.getElementById('class-select').value;

    if (!regNumber || !password || !selectedClass) {
        alert("Please enter valid credentials and select your class.");
        return;
    }

    if (bookedSeats[regNumber]) {
        alert("This registration number has already booked a seat.");
        return;
    }

    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('seat-booking').classList.remove('hidden');
    document.getElementById('seat-booking').classList.add('show');

    document.getElementById('selected-class').innerText = `Class ${selectedClass}`;
    generateSeatMap();
}

function generateSeatMap() {
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = '';

    for (let i = 1; i <= 70; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.innerText = i;

        if (Object.values(bookedSeats).includes(`${selectedClass}-${i}`)) {
            seat.classList.add('booked');
            seat.onclick = () => alert(`Seat ${i} in Class ${selectedClass} is already booked.`);
        } else {
            seat.onclick = () => selectSeat(i);
        }

        seatMap.appendChild(seat);
    }
}

function selectSeat(seatNumber) {
    if (selectedSeat) {
        document.querySelector('.seat.selected')?.classList.remove('selected');
    }

    selectedSeat = seatNumber;
    document.querySelector(`#seat-map .seat:nth-child(${seatNumber})`).classList.add('selected');
}

function bookSeat() {
    const regNumber = document.getElementById('reg-number').value.trim();

    if (!selectedSeat) {
        alert("Please select a seat.");
        return;
    }

    bookedSeats[regNumber] = `${selectedClass}-${selectedSeat}`;
    alert(`Seat ${selectedSeat} in Class ${selectedClass} booked successfully for ${regNumber}.`);

    generateSeatMap();
}
