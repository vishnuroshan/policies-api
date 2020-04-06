const csv = require('csvtojson');
const XLSX = require('xlsx');

const toJson = async (path, type) => {
	if (type === 'text/csv')
		return csv().fromFile(path);
	if (type === 'application/vnd.ms-excel' ||
		type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
		const workBook = XLSX.readFile(path);
		XLSX.writeFile(workBook, path, { bookType: "csv" });
		return toJson(path, 'text/csv');
	}
}

module.exports = { toJson };