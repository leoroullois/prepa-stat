import React, { FC } from "react";
/**Components */
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";
import { Leaderboard } from "./pages/Leaderboard";
import { Simulator } from "./pages/Simulator";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
/**React-route */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Layout } from "./pages/Layout";
/**Redux */
import { Provider } from "react-redux";
import { store } from "./store/store";
import jwt_decode from "jwt-decode";

import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser } from "./store/actions/loginAction";
import { logoutUser } from "./store/thunks/logout";
import { AuthRedirect } from "./pages/AuthRedirect";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded: any = jwt_decode(token);
	console.log("DECODED:", decoded);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = "./se-connecter";
	}
}
const App: FC<any> = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='/se-connecter' element={<Login />}></Route>
						<Route path='/s-enregistrer' element={<Register />}></Route>
						<Route path='/redirect' element={<AuthRedirect />}></Route>
						<Route
							path='/dashboard'
							element={<PrivateRoute component={<Dashboard />} />}
						/>
						<Route path="/classements/:id" element={<Leaderboard classement="L'étudiant"/>} />
						<Route path='/simulateur' element={<Simulator />}></Route>
						<Route
							path='/statistiques/:filiere/:concours'
							element={<Stats />}
						/>

						<Route path='*' element={<NoPage />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
};
export default App;
