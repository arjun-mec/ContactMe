const emailjs = require('emailjs-com');
    
exports.handler = async (event, context) => {
  try {
    const { firstName, lastName, gender, phoneNumber, message, email } = JSON.parse(event.body);

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { 
        firstName: firstName, 
        lastName: lastName,
        gender: gender,
        phoneNumber: phoneNumber,
        message: message,
        to_email: email 
      },
      process.env.EMAILJS_USER_ID
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email.' }),
    };
  }
};