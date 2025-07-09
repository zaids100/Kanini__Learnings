function show_alert(event) {
    if (event) event.preventDefault();

    const user_name = document.getElementById('user-name');
    const telnum = document.getElementById('telephone-number');
    const email = document.querySelector('input[type="email"]');
    const book = document.getElementById('book-name');
    const qnty = document.getElementById('quantity');

    if (
        !user_name.value.trim() ||
        !telnum.value.trim() ||
        !email.value.trim() ||
        !book.value.trim() ||
        !qnty.value.trim()
    ) {
        alert('Please fill all the details');
        return false;
    }

    alert("You have submitted the book successfully!");
    return false;
}

document.querySelector('form').addEventListener('submit', show_alert);