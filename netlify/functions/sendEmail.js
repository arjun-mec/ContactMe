const emailjs = require('@emailjs/nodejs'); 

exports.handler = async (event, context) => {
  try {
    const { firstName, lastName, gender, phoneNumber, message, email } = JSON.parse(event.body);

    emailjs.init({
      serviceId: process.env.EMAILJS_SERVICE_ID, 
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      publicKey: process.env.EMAILJS_PUBLIC_KEY 
    });

    const templateParams = {
      firstName,
      lastName,
      gender,
      phoneNumber,
      message,
      to_email: email
    };

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email.' })
    };
  }
};