const scheduleController = {};
const moment = require('moment');
const scheduler = require('node-schedule');
const Messages = require('../models/Message');

const checkValidity = (schedule) =>
	(moment(schedule).isValid() &&
		moment(schedule).get('hour') >= moment().get('hour') &&
		moment(schedule).get('minute') >= moment().get('minute') &&
		moment(schedule).isAfter(moment(), 'second'));

const formatDate = (date) => moment(date).format('Do MMM YYYY (dddd) h:mm:ss a');

scheduleController.scheduleinsert = ({ year, month, day, hour, minute, second }, message) => {
	const schedule = new Date(year, month, day, hour, minute, second);
	// let schedule = new Date(2020, 3, 12, 23, 52, 0);
	console.log(formatDate(schedule));
	if (checkValidity(schedule)) {
		scheduler.scheduleJob(schedule, (fireDate) => {
			console.log(`scheduled task started at: ${formatDate(fireDate)}...`);
			Messages.create({
				message,
				date_time: formatDate(fireDate)
			});
		});
		return { status: 200, message: 'success' };
	}
	else return { status: 400, message: 'not valid date/past date' }
}

module.exports = scheduleController;