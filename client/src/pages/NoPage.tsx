import { useEffect } from "react";
/**CSS */
import "../css/nopage.css";
export const NoPage = () => {
	useEffect(() => {
		document.title = "Page not found";
	});
	return (
		<div id='no-page'>
			<h1>Error 404 : page not found.</h1>
		</div>
	);
};
