export const useDate = () => {
	const matchDay = (day: string): string => {
		switch (day) {
			case "Mon":
				return "Monday";
			case "Tue":
				return "Tuesday";
			case "Wed":
				return "Wednesday";
			case "Thu":
				return "Thursday";
			case "Fri":
				return "Friday";
			case "Sat":
				return "Saturday";
			case "Sun":
				return "Sunday";
			default:
				return "";
		}
	};
	const formatDate = (date: number): string => {
		const myDate = new Date(date).toDateString().split(" ");
		myDate[0] = matchDay(myDate[0]) + ",";
		myDate[2] += ",";
		return myDate.join(" ");
	};
	return formatDate;
};
