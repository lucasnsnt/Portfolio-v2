document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('wf-form-Contact');
    
    form.addEventListener('submit', function(event) {
      // Prevent the default form submission
      event.preventDefault();

      // Capture form field values
      
      var firstName = document.getElementById('First-Name').value;
      var lastName = document.getElementById('Last-Name').value;
      var email = document.getElementById('Email').value;
      var phoneNumber = document.getElementById('Phone').value;
      var message = document.getElementById('Message').value;
      var title = document.getElementById('Title').value;

      // Pushing data to the data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'formSubmission',
        'formData': {         
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'phoneNumber': phoneNumber,
          'message': message
        }
      });

      // Continue with the form submission
      form.submit();
    });
  });
