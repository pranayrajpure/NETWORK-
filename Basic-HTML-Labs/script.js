$(document).ready(function () {
    let selectedRating = 0;

    const ratingLabels = {
        1: "Poor 😞",
        2: "Fair 😐",
        3: "Good 🙂",
        4: "Very Good 😊",
        5: "Excellent! 🌟"
    };

    // 1. Theme Toggle (jQuery)
    $('#themeToggleBtn').on('click', function () {
        $('body').toggleClass('dark-mode');
        if ($('body').hasClass('dark-mode')) {$(this).text('☀️ Light Mode');
        } else {
            $(this).text('🌙 Dark Mode');
        }
    });

    // 2. Show / Hide Password Toggle (jQuery)
    $('#togglePasswordBtn').on('click', function () {
        const passInput = $('#password');
        const passType = passInput.attr('type');

        if (passType === 'password') {
            passInput.attr('type', 'text');
            $(this).text('🙈 Hide');
        } else {
            passInput.attr('type', 'password');
            $(this).text('👁️ Show');
        }
    });

    // 3. Password Strength Indicator (jQuery)
    $('#password').on('keyup input', function () {
        const val = $(this).val();
        let strength = 0;

        if (val.length >= 8) strength += 1;
        if (val.match(/[a-z]+/)) strength += 1;
        if (val.match(/[A-Z]+/)) strength += 1;
        if (val.match(/[0-9]+/)) strength += 1;
        if (val.match(/[$@#&!]+/)) strength += 1;

        const strengthSpan = $('#strengthText');

        if (val.length === 0) {
            strengthSpan.text('None').attr('class', '');
        } else if (strength <= 2) {
            strengthSpan.text('Weak').attr('class', 'weak');
        } else if (strength === 3 || strength === 4) {
            strengthSpan.text('Medium').attr('class', 'medium');
        } else if (strength === 5) {
            strengthSpan.text('Strong').attr('class', 'strong');
        }
    });

    // 4. Star Rating System Interaction (jQuery)
    $('.star').on('click', function () {
        selectedRating = parseInt($(this).data('value'));

        $('#ratingValue').text(`${ratingLabels[selectedRating]} (${selectedRating} / 5 Stars)`);

        $('.star').removeClass('active');$('.star').each(function (index) {
            if (index < selectedRating) {
                $(this).addClass('active');
            }
        });
    });

    // 5. jQuery Form Validation & Smooth Submission Feedback
    $('#registrationForm').on('submit', function (event) {
        event.preventDefault();

        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const feedbackBanner = $('#feedbackMessage');

        // Confirm Password Match Check
        if (password !== confirmPassword) {
            $('#passwordMatchError').text('Passwords do not match!');
            feedbackBanner
                .removeClass('success')
                .addClass('error')
                .text('⚠️ Please fix errors before submitting.')
                .slideDown();
            return;
        } else {
            $('#passwordMatchError').text('');
        }

        // Star Rating Check
        if (selectedRating === 0) {
            feedbackBanner
                .removeClass('success')
                .addClass('error')
                .text('⚠️ Please select a service rating before registering.')
                .slideDown();
            return;
        }

        // Success Feedback Animation
        feedbackBanner
            .removeClass('error')
            .addClass('success')
            .html(`✅ <strong>Registration Successful!</strong> Welcome to NetConnect ISP. Rated: ${ratingLabels[selectedRating]}`)
            .slideDown();

        // Reset Form Fields after 2.5 seconds
        setTimeout(function () {
            $('#registrationForm')[0].reset();
            $('.star').removeClass('active');$('#ratingValue').text('Select Rating (0 / 5 Stars)');
            $('#strengthText').text('None').attr('class', '');
            $('#togglePasswordBtn').text('👁️ Show');
            $('#password').attr('type', 'password');
            feedbackBanner.slideUp();
        }, 3000);
    });
});