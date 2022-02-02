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
						<Route path='/simulateur' element={<Simulator />}></Route>
						<Route path='/se-connecter' element={<Login />}></Route>
						<Route path='/s-enregistrer' element={<Register />}></Route>
						<Route
							path='/dashboard'
							element={<PrivateRoute component={<Dashboard />} />}
						/>
						{/* MP */}
						<Route
							path='statistiques/mp/generale'
							element={<Stats filiere={"MP"} concours={"generale"} />}
						/>
						<Route
							path='statistiques/mp/x'
							element={<Stats filiere={"MP"} concours={"x"} />}
						/>
						<Route
							path='statistiques/mp/ens'
							element={<Stats filiere={"MP"} concours={"ens"} />}
						/>
						<Route
							path='statistiques/mp/centrale'
							element={<Stats filiere={"MP"} concours={"centrale"} />}
						/>
						<Route
							path='statistiques/mp/mines'
							element={<Stats filiere={"MP"} concours={"mines"} />}
						/>
						<Route
							path='statistiques/mp/ccinp'
							element={<Stats filiere={"MP"} concours={"ccinp"} />}
						/>
						<Route
							path='statistiques/mp/e3a'
							element={<Stats filiere={"MP"} concours={"e3a"} />}
						/>

						{/* PC */}
						<Route
							path='statistiques/pc/generale'
							element={<Stats filiere={"PC"} concours={"generale"} />}
						/>
						<Route
							path='statistiques/pc/x'
							element={<Stats filiere={"PC"} concours={"x"} />}
						/>
						<Route
							path='statistiques/pc/ens'
							element={<Stats filiere={"PC"} concours={"ens"} />}
						/>
						<Route
							path='statistiques/pc/centrale'
							element={<Stats filiere={"PC"} concours={"centrale"} />}
						/>
						<Route
							path='statistiques/pc/mines'
							element={<Stats filiere={"PC"} concours={"mines"} />}
						/>
						<Route
							path='statistiques/pc/ccinp'
							element={<Stats filiere={"PC"} concours={"ccinp"} />}
						/>
						<Route
							path='statistiques/pc/e3a'
							element={<Stats filiere={"PC"} concours={"e3a"} />}
						/>

						{/* PSI */}
						<Route
							path='statistiques/psi/generale'
							element={<Stats filiere={"PSI"} concours={"generale"} />}
						/>
						<Route
							path='statistiques/psi/x'
							element={<Stats filiere={"PSI"} concours={"x"} />}
						/>
						<Route
							path='statistiques/psi/ens'
							element={<Stats filiere={"PSI"} concours={"ens"} />}
						/>
						<Route
							path='statistiques/psi/centrale'
							element={<Stats filiere={"PSI"} concours={"centrale"} />}
						/>
						<Route
							path='statistiques/psi/mines'
							element={<Stats filiere={"PSI"} concours={"mines"} />}
						/>
						<Route
							path='statistiques/psi/ccinp'
							element={<Stats filiere={"PSI"} concours={"ccinp"} />}
						/>
						<Route
							path='statistiques/psi/e3a'
							element={<Stats filiere={"PSI"} concours={"e3a"} />}
						/>

						{/* PT */}
						<Route
							path='statistiques/pt/generale'
							element={<Stats filiere={"PT"} concours={"generale"} />}
						/>
						<Route
							path='statistiques/pt/x'
							element={<Stats filiere={"PT"} concours={"x"} />}
						/>
						<Route
							path='statistiques/pt/ens'
							element={<Stats filiere={"PT"} concours={"ens"} />}
						/>
						<Route
							path='statistiques/pt/centrale'
							element={<Stats filiere={"PT"} concours={"centrale"} />}
						/>
						<Route
							path='statistiques/pt/mines'
							element={<Stats filiere={"PT"} concours={"mines"} />}
						/>
						<Route
							path='statistiques/pt/ccinp'
							element={<Stats filiere={"PT"} concours={"ccinp"} />}
						/>
						<Route
							path='statistiques/pt/e3a'
							element={<Stats filiere={"PT"} concours={"e3a"} />}
						/>
						<Route
							path='classements/letudiant'
							element={<Leaderboard classement="l'étudiant" />}
						/>
						<Route
							path='classements/usine-nouvelle'
							element={<Leaderboard classement='usine nouvelle' />}
						/>

						<Route path='*' element={<NoPage />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
};

// class App extends React.Component {
// 	render() {
// 		return (
// 			<Provider store={store}>
// 				<Router>
// 					<Routes>
// 						<Route path='/' element={<Layout />}>
// 							<Route index element={<Home />} />
// 							<Route path='/simulateur' element={<Simulator />}></Route>
// 							<Route path='/se-connecter' element={<Login />}></Route>
// 							<Route path='/s-enregistrer' element={<Register />}></Route>
// 							<Route
// 								path='dashboard'
// 								element={<PrivateRoute component={<Dashboard />} />}
// 							/>
// 							{/* MP */}
// 							<Route
// 								path='statistiques/mp/generale'
// 								element={<Stats filiere={"MP"} concours={"generale"} />}
// 							/>
// 							<Route
// 								path='statistiques/mp/x'
// 								element={<Stats filiere={"MP"} concours={"x"} />}
// 							/>
// 							<Route
// 								path='statistiques/mp/ens'
// 								element={<Stats filiere={"MP"} concours={"ens"} />}
// 							/>
// 							<Route
// 								path='statistiques/mp/centrale'
// 								element={<Stats filiere={"MP"} concours={"centrale"} />}
// 							/>
// 							<Route
// 								path='statistiques/mp/mines'
// 								element={<Stats filiere={"MP"} concours={"mines"} />}
// 							/>
// 							<Route
// 								path='statistiques/mp/ccinp'
// 								element={<Stats filiere={"MP"} concours={"ccinp"} />}
// 							/>
// 							<Route
// 								path='statistiques/mp/e3a'
// 								element={<Stats filiere={"MP"} concours={"e3a"} />}
// 							/>

// 							{/* PC */}
// 							<Route
// 								path='statistiques/pc/generale'
// 								element={<Stats filiere={"PC"} concours={"generale"} />}
// 							/>
// 							<Route
// 								path='statistiques/pc/x'
// 								element={<Stats filiere={"PC"} concours={"x"} />}
// 							/>
// 							<Route
// 								path='statistiques/pc/ens'
// 								element={<Stats filiere={"PC"} concours={"ens"} />}
// 							/>
// 							<Route
// 								path='statistiques/pc/centrale'
// 								element={<Stats filiere={"PC"} concours={"centrale"} />}
// 							/>
// 							<Route
// 								path='statistiques/pc/mines'
// 								element={<Stats filiere={"PC"} concours={"mines"} />}
// 							/>
// 							<Route
// 								path='statistiques/pc/ccinp'
// 								element={<Stats filiere={"PC"} concours={"ccinp"} />}
// 							/>
// 							<Route
// 								path='statistiques/pc/e3a'
// 								element={<Stats filiere={"PC"} concours={"e3a"} />}
// 							/>

// 							{/* PSI */}
// 							<Route
// 								path='statistiques/psi/generale'
// 								element={<Stats filiere={"PSI"} concours={"generale"} />}
// 							/>
// 							<Route
// 								path='statistiques/psi/x'
// 								element={<Stats filiere={"PSI"} concours={"x"} />}
// 							/>
// 							<Route
// 								path='statistiques/psi/ens'
// 								element={<Stats filiere={"PSI"} concours={"ens"} />}
// 							/>
// 							<Route
// 								path='statistiques/psi/centrale'
// 								element={<Stats filiere={"PSI"} concours={"centrale"} />}
// 							/>
// 							<Route
// 								path='statistiques/psi/mines'
// 								element={<Stats filiere={"PSI"} concours={"mines"} />}
// 							/>
// 							<Route
// 								path='statistiques/psi/ccinp'
// 								element={<Stats filiere={"PSI"} concours={"ccinp"} />}
// 							/>
// 							<Route
// 								path='statistiques/psi/e3a'
// 								element={<Stats filiere={"PSI"} concours={"e3a"} />}
// 							/>

// 							{/* PT */}
// 							<Route
// 								path='statistiques/pt/generale'
// 								element={<Stats filiere={"PT"} concours={"generale"} />}
// 							/>
// 							<Route
// 								path='statistiques/pt/x'
// 								element={<Stats filiere={"PT"} concours={"x"} />}
// 							/>
// 							<Route
// 								path='statistiques/pt/ens'
// 								element={<Stats filiere={"PT"} concours={"ens"} />}
// 							/>
// 							<Route
// 								path='statistiques/pt/centrale'
// 								element={<Stats filiere={"PT"} concours={"centrale"} />}
// 							/>
// 							<Route
// 								path='statistiques/pt/mines'
// 								element={<Stats filiere={"PT"} concours={"mines"} />}
// 							/>
// 							<Route
// 								path='statistiques/pt/ccinp'
// 								element={<Stats filiere={"PT"} concours={"ccinp"} />}
// 							/>
// 							<Route
// 								path='statistiques/pt/e3a'
// 								element={<Stats filiere={"PT"} concours={"e3a"} />}
// 							/>
// 							<Route
// 								path='classements/letudiant'
// 								element={<Leaderboard classement="l'étudiant" />}
// 							/>
// 							<Route
// 								path='classements/usine-nouvelle'
// 								element={<Leaderboard classement='usine nouvelle' />}
// 							/>

// 							<Route path='*' element={<NoPage />} />
// 						</Route>
// 					</Routes>
// 				</Router>
// 			</Provider>
// 		);
// 	}
// }

export default App;
