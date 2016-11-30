( function ( $ ) {
    "use strict";
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    $(function() {
        $.scrollDepth({
            elements: ['#product', 'pricing'],
        });
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    });
    $( document ).ready( function () {
        function closeModal() {
            $('#requestDemo').modal('toggle');
        }

        $('#requestDemoForm').submit(function(e) {
            e.preventDefault();
            var form = document.getElementById("requestDemoForm");
            var htmlMessage = 'Contact form<br/>' +
                'Name: '+$('#first-name').val()+' '+$('#last-name').val()+'<br/>'+
                'Email: '+$('#email').val()+'<br/>'+
                'Phone: '+$('#phone').val();
            $.ajax({
              type: "POST",
              url: "https://mandrillapp.com/api/1.0/messages/send.json",
              data: {
                "key": 'i6fMMseTxAtJ6LDLLxYJng',
                "message": {
                  "from_email": 'info@ruutly.com',
                  "from_name": "Ruutly Info",
                  "to": [
                    {
                      "email": 'serg@ruutly.com',
                      "name": 'Sergiy Dybskiy',
                      "type": 'to'
                    },
                    {
                      "email": 'ryan@ruutly.com',
                      "name": 'Ryan Porter',
                      "type": 'to'
                    },
                    {
                      "email": 'tyler@ruutly.com',
                      "name": 'Tyler Smith',
                      "type": 'to'
                    }
                  ],
                  "subject": 'Demo Request from Ruutly Homepage',
                  "html": htmlMessage
                }
              },
              success: function() {
                form.reset();
                $('#demoSubmitButton').text('Thank you!');
                window.setTimeout(closeModal, 1000);    
              }
            });
        });
        
        $('.cocoen').cocoen();
        $('#annual-toggle').click(function(e) {
            e.preventDefault();
            $('#annual-toggle').addClass('active');
            $('#month-toggle').removeClass('active');
          $( ".monthly-price" ).fadeOut( 250, function() {
                      $( ".annual-price" ).fadeIn( 250 );
                    });
        });

        $('#month-toggle').click(function(e) {
            e.preventDefault();
            $('#annual-toggle').removeClass('active');
            $('#month-toggle').addClass('active');
            $( ".annual-price" ).fadeOut( 250, function() {
                      $( ".monthly-price" ).fadeIn( 250 );
                    });
        });

        // CTA Analytics

        $('#start_yr').click(function(e) {
            analytics.track('start_yr');
        });
        $('#start_mo').click(function(e) {
            analytics.track('start_mo');
        });
        $('#grow_yr').click(function(e) {
            analytics.track('grow_yr');
        });
        $('#grow_mo').click(function(e) {
            analytics.track('grow_mo');
        });
        $('#scale_yr').click(function(e) {
            analytics.track('scale_yr');
        });
        $('#scale_mo').click(function(e) {
            analytics.track('scale_mo');
        });
        $('#soar_yr').click(function(e) {
            analytics.track('soar_yr');
        });
        $('#soar_mo').click(function(e) {
            analytics.track('soar_mo');
        });

        $('#try-top').click(function(e) {
            analytics.track('Top Cta');
        });

        $('#try-slider').click(function(e) {
            analytics.track('Slider Cta');
        });

        $('#try-product').click(function(e) {
            analytics.track('Product Cta');
        });

        $('#try-study').click(function(e) {
            analytics.track('Study Cta');
        });

        // Nav Analytics
        $('#product-link').click(function(e) {
            analytics.track('Product Link');
        });

        $('#pricing-link').click(function(e) {
            analytics.track('Pricing Link');
        });

        $('#demo-link').click(function(e) {
            analytics.track('Demo Link');
        });

        $('#login-link').click(function(e) {
            analytics.track('Login Link');
        });

        // Intercom Analytics & Activation

        $('#lets-talk').click(function(e) {
            e.preventDefault();
            Intercom('show');
            analytics.track('Lets Talk');
        });
    });

} ( jQuery ) );
