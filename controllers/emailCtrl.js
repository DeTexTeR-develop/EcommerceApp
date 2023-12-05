const nodemailer = require('nodemailer');
const expressAsyncHandler = require('express-async-handler');


const sendEmail = expressAsyncHandler(async(data) => {
	const transporter = nodemailer.createTransport({
		service:'gmail',
		auth:{
			user:process.env.MAIL_ID,
			pass:process.env.MAIL_PASS
		}
	});

	const mailOptions = {
		from:'ujjwalsinghbot@gmail.com',
		to:data.to,
		subject:data.subject,
		text:data.text,
		html:data.html
	}

	try{
		const result = await transporter.sendMail(mailOptions);
		console.log('mail sent')
	}catch(err){
		throw new Error(err);
	}
})

module.exports = {sendEmail};