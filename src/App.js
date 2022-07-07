import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import About from "./components/About";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
	const [mode, setMode] = useState("light");
	const [alert, setAlert] = useState(null);

	const showAlert = (message, type) => {
		setAlert({
			msg: message,
			type: type,
		});

		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};

	const toggleMode = () => {
		if (mode === "light") {
			setMode("dark");
			showAlert("Dark mode has been enabled.", "Success");
			document.body.style.cssText = `   
			 	background-color: #0d2b50;
    			color: #cddeed;`;
		} else {
			setMode("light");
			showAlert("Light mode has been enabled.", "Success");
			document.body.style.cssText = `   
			 	background-color: white;
    			color: black;`;
		}
	};

	return (
		<>
			<Navbar
				title="TextChanger"
				aboutText="About"
				googleLink="https://www.google.com/"
				toggleMode={toggleMode}
				mode={mode}
			/>

			<Alert alert={alert} />
			<Routes>
				<Route
					path="/"
					element={
						<TextForm
							heading="Text tools - manipulate your text"
							mode={mode}
							showAlert={showAlert}
						/>
					}
				></Route>
				<Route path="about" element={<About mode={mode} />} />
			</Routes>
		</>
	);
}

export default App;
