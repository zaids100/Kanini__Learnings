$(document).ready(function () {

    $('.book-button').click(function () {
        const seat_row = $('#seat-row').val().toUpperCase(); // e.g., 'A'
        const number_of_tickets = parseInt($('#number-of-tickets').val()); // e.g., 3
        const starting_seat = parseInt($('#seat-number').val()); // e.g., 4

        if (!seat_row || isNaN(starting_seat) || isNaN(number_of_tickets)) {
            alert("Please enter valid inputs.");
            return;
        }

        const total_cols = 10;

        // Check if the starting seat and range is valid
        if (starting_seat < 1 || starting_seat + number_of_tickets - 1 > total_cols) {
            alert("Not enough seats available in the row.");
            return;
        }

        // Check if all seats are available
        let seatsAvailable = true;
        let seatsToBook = [];

        for (let i = 0; i < number_of_tickets; i++) {
            const seatNum = starting_seat + i;
            const seatId = `${seat_row}${seatNum}`;
            const seatElem = $(`.seat[data-seat="${seatId}"]`);

            if (seatElem.hasClass('booked')) {
                seatsAvailable = false;
                break;
            } else {
                seatsToBook.push(seatElem);
            }
        }

        if (!seatsAvailable) {
            alert("One or more of the selected seats are already booked.");
            return;
        }

        // Book the seats
        seatsToBook.forEach(seat => {
            seat.addClass('booked');
        });

        alert(`Successfully booked ${number_of_tickets} seat(s) in row ${seat_row} starting from seat ${starting_seat}.`);
    });

    function generateMovieTicketGrid() {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const cols = 10;
        const grid = $('.ticket-grid');

        grid.append(`<div class="label"></div>`);

        for (let col = 1; col <= cols; col++) {
            grid.append(`<div class="label">${col}</div>`);
        }

        for (let i = 0; i < rows.length; i++) {
            const rowChar = rows[i];
            grid.append(`<div class="label">${rowChar}</div>`);

            for (let j = 1; j <= cols; j++) {
                const seatId = `${rowChar}${j}`;
                let seatClass = "seat";
                grid.append(`<div class="${seatClass}" data-seat="${seatId}"></div>`);
            }
        }
    }

    generateMovieTicketGrid();
});
