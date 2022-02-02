import validator from "validator";
import isEmpty from "is-empty";

export const validateLoginInput = (data: any) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	//Email checks
	if (validator.isEmpty(data.email)) {
		errors.email = "Email field is required.";
	} else if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	//Password checks
	if (validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
