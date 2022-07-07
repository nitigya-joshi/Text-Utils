import React, { useState } from "react";

export default function TextForm(props) {
	const [text, setText] = useState("Enter text here...");

	const upperCaseFunc = () => {
		const newText = text.toUpperCase();
		setText(newText);
		props.showAlert("Converted to uppercase", "Success");
	};

	const lowerCaseFunc = () => {
		const newText = text.toLowerCase();
		setText(newText);
		props.showAlert("Converted to lowercase.", "Success");
	};

	const clearFunc = () => {
		setText("");
		props.showAlert("Cleared all text.", "Success");
	};

	const copyFunc = () => {
		navigator.clipboard.writeText(text);
		props.showAlert("Copied to Clipboard!", "success");
	};

	const utterance = new SpeechSynthesisUtterance();

	const textToSpeechFunc = () => {
		props.showAlert("Text-to-speech enabled.", "Sucees!");
		if (speechSynthesis.speaking) return;
		utterance.text = text;
		utterance.rate = 1;
		speechSynthesis.speak(utterance);
	};

	const handleOnChange = (event) => {
		setText(event.target.value);
	};

	const textLength = text.split(/\s+/).filter((element) => {
		return element.length !== 0;
	}).length;

	const modes = {
		dark: {
			backgroundColor: "#272822",
			color: "#c8e5c9",
		},

		light: {
			backgroundColor: "white",
			color: "black",
		},
	};

	return (
		<>
			<div className="my-3 container">
				<h2 className="mb-3">{props.heading}</h2>
				<div className="mb-3">
					<textarea
						className="form-control"
						id="myBox"
						value={text}
						rows={8}
						onChange={handleOnChange}
						style={{
							backgroundColor: modes[props.mode].backgroundColor,
							color: modes[props.mode].color,
						}}
					></textarea>
				</div>
				<button
					className="mx-2 btn btn-primary mb-2"
					onClick={upperCaseFunc}
					disabled={textLength === 0}
				>
					Convert to uppercase
				</button>
				<button
					className="mx-2 btn btn-primary mb-2"
					onClick={lowerCaseFunc}
					disabled={textLength === 0}
				>
					Convert to lowercase
				</button>
				<button
					className="mx-2 btn btn-primary mb-2"
					onClick={clearFunc}
					disabled={textLength === 0}
				>
					Clear text
				</button>
				<button
					disabled={text.length === 0}
					className="btn btn-primary mx-2 mb-2"
					onClick={copyFunc}
				>
					Copy Text
				</button>
				<button
					className="mx-2 btn btn-warning play-button mb-2"
					onClick={textToSpeechFunc}
					disabled={textLength === 0}
				>
					Speak
				</button>
			</div>

			<div className="container my-3">
				<h3>Your text summary</h3>
				<p>
					{textLength} words and {text.length} characters
				</p>
			</div>
		</>
	);
}
