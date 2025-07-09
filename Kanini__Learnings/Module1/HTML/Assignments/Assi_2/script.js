const op = document.getElementById('output');
function calculate() {
    const ip_1 = document.getElementById('input_1').value;
    const ip_2 = document.getElementById('input_2').value;
    const opr = document.getElementById('operator').value;
    let result = '';

    if (ip_1 === '' || ip_2 === '' || opr === '') {
        result = 'Please fill all fields.';
    } else {
        try {
            const expression = `${parseFloat(ip_1)}${opr}${parseFloat(ip_2)}`;
            result = eval(expression);
        } catch (e) {
            result = 'Error in calculation.';
        }
    }
    op.textContent = result;
}

function resetCalc() {
    document.getElementById('input_1').value = '';
    document.getElementById('input_2').value = '';
    document.getElementById('operator').value = '';
    op.textContent = '';
}