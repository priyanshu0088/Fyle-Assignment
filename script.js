function validateInputFields() {
    const numericRegex = /^\d*\.?\d+$/;

    let error = false;

    // Validate Gross Annual Income
    const grossIncome = $('#gross-income').val().trim();
    if (!numericRegex.test(grossIncome)) {
        showErrorIcon('gross-income-error-icon', 'Enter a valid number');
        error = true;
    } else {
        hideErrorIcon('gross-income-error-icon');
    }

    // Validate Extra Income
    const extraIncome = $('#extra-income').val().trim();
    if (!numericRegex.test(extraIncome)) {
        showErrorIcon('extra-income-error-icon', 'Enter a valid number');
        error = true;
    } else {
        hideErrorIcon('extra-income-error-icon');
    }

    // Validate Age Group
    const age = $('#age').val();
    if (age === '') {
        showErrorIcon('age-error-icon', 'Age group is required');
        error = true;
    } else {
        hideErrorIcon('age-error-icon');
    }

    // Validate Total Applicable Deductions
    const deductions = $('#deductions').val().trim();
    if (!numericRegex.test(deductions)) {
        showErrorIcon('deductions-error-icon', 'Enter a valid number');
        error = true;
    } else {
        hideErrorIcon('deductions-error-icon');
    }

    return !error;
}

function showErrorIcon(id, message) {
    $('#' + id).show().attr('title', message);
}

function hideErrorIcon(id) {
    $('#' + id).hide();
}

function calculateTax() {
    if (!validateInputFields()) {
        return;
    }

    const grossIncome = parseFloat($('#gross-income').val());
    const extraIncome = parseFloat($('#extra-income').val());
    const age = $('#age').val();
    const deductions = parseFloat($('#deductions').val());

    let overallIncome = 0;
    const totalIncome = grossIncome + extraIncome - deductions;

    if (totalIncome <= 8) {
        overallIncome = totalIncome;
    } else {
        let taxableAmount = totalIncome - 8;
        if (age === '<40') {
            overallIncome = totalIncome - (taxableAmount * 0.3);
        } else if (age === '≥40 <60') {
            overallIncome = totalIncome - (taxableAmount * 0.4);
        } else if (age === '≥60') {
            overallIncome = totalIncome - (taxableAmount * 0.1);
        }
    }

    $('#resultBody').html(`<p>Your overall income after tax deduction is: <strong>${overallIncome.toFixed(2)} Lakhs</strong></p>`);
    $('#resultModal').modal('show');
}

//#######################

