$(document).ready(function() {
    
    // 1. Mobile Menu Open/Close trigger toggle
    $('#mobile-menu').on('click', function() {
        $('.nav-container').toggleClass('active-nav hidden-mobile');
    });

    // 2. Active Form Dropdowns Flag matching controller
    function updateFlagOnSelector(selectId, flagId) {
        var selectedOption = $(selectId).find('option:selected');
        var flagCode = selectedOption.data('flag');
        $(flagId).text(flagCode);
    }

    $('#from-currency').on('change', function() { updateFlagOnSelector('#from-currency', '#from-flag'); });
    $('#to-currency').on('change', function() { updateFlagOnSelector('#to-currency', '#to-flag'); });

    // 3. Central Swap Button Click inverse inverter execution
    $('#swap-btn').on('click', function() {
        var backupFromVal = $('#from-currency').val();
        var backupToVal = $('#to-currency').val();
        $('#from-currency').val(backupToVal).trigger('change');
        $('#to-currency').val(backupFromVal).trigger('change');
    });

    // 4. Submit conversion operations event handling logic
    $('#currency-form').on('submit', function(event) {
        event.preventDefault();
        var inputtedAmount = $('#amount').val();
        var fromUnit = $('#from-currency').val();
        var toUnit = $('#to-currency').val();

        var staticConversionRates = 1;
        if (fromUnit === 'USD' && toUnit === 'EUR') staticConversionRates = 0.92;
        else if (fromUnit === 'USD' && toUnit === 'INR') staticConversionRates = 83.50;
        else if (fromUnit === 'EUR' && toUnit === 'USD') staticConversionRates = 1.09;
        else if (fromUnit === 'EUR' && toUnit === 'INR') staticConversionRates = 90.75;
        else if (fromUnit === 'INR' && toUnit === 'USD') staticConversionRates = 0.012;
        else if (fromUnit === 'INR' && toUnit === 'EUR') staticConversionRates = 0.011;

        var mathematicallyCalculatedValue = (inputtedAmount * staticConversionRates).toFixed(2);
        $('#result-text').text(inputtedAmount + ' ' + fromUnit + ' = ' + mathematicallyCalculatedValue + ' ' + toUnit);
        $('.conversion-result').slideDown(250);
    });

    // 5. Pricing Tab Switcher Engine Rule execution
    $('.tab-btn').on('click', function() {
        if ($(this).hasClass('active-tab')) return;

        $('.tab-btn').removeClass('active-tab');
        $(this).addClass('active-tab');

        var targetTabId = $(this).attr('id');

        $('.plan-price').fadeOut(200, function() {
            var $this = $(this);
            if (targetTabId === 'yearly-tab') {
                var yearlyPrice = $this.data('yearly');
                $this.text('$' + yearlyPrice);
            } else {
                var monthlyPrice = $this.data('monthly');
                $this.text('$' + monthlyPrice);
            }
            $this.fadeIn(200);
        });
    });

    // 6. Custom jQuery Accordion Engine (Replacement of Bootstrap Collapse)
    $('.accordion-trigger').on('click', function() {
        var parentBox = $(this).closest('.accordion-box');
        
        if (parentBox.hasClass('active-item')) {
            parentBox.find('.accordion-content').slideUp(300);
            parentBox.removeClass('active-item');
        } else {
            // Close active panels
            $('.accordion-content').slideUp(300);
            $('.accordion-box').removeClass('active-item');
            
            // Open current panel
            parentBox.find('.accordion-content').slideDown(300);
            parentBox.addClass('active-item');
        }
    });

    // 7. Testimonial Custom Slider Engine (Replacement of Bootstrap Carousel)
    var activeIndex = 0;
    var totalSlides = $('.custom-slide').length;

    function renderSlidePosition(index) {
        var percentageMove = -(index * 50) + '%'; // Shifts slide window horizontally
        $('.slider-container-track').css('transform', 'translateX(' + percentageMove + ')');
    }

    $('.next-slide').on('click', function() {
        activeIndex++;
        if (activeIndex >= totalSlides) activeIndex = 0; // Infinite fallback loops
        renderSlidePosition(activeIndex);
    });

    $('.prev-slide').on('click', function() {
        activeIndex--;
        if (activeIndex < 0) activeIndex = totalSlides - 1;
        renderSlidePosition(activeIndex);
    });
});