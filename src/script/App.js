import { useState, useEffect } from "react";
import axios from "axios";
import "../style/App.css";
import tweeterapplogo from "../assets/tweeter.svg";
import whatsapplogo from "../assets/whatsapp.svg";

export function App() {
	const [quote, setQuote] = useState({
		content: "",
		author: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(null);
	const [tip, setTip] = useState(0);

	async function fetchQuote() {
		setIsLoading(true);
		setErr(null);
		try {
			const res = await axios.get(
				"https://api.quotable.io/quotes/random"
			);
			const data = res.data[0];
			setQuote({
				content: data.content,
				author: data.author,
			});
			setRandColor();
		} catch (error) {
			setErr(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchQuote();
		setRandColor();
	},[]);

	function copyToClipboard() {
		navigator.clipboard.writeText(`${quote.content} - ${quote.author}`);
		setTip(1);
		setTimeout(() => {
			setTip(0);
		}, 3000);
	}

	function twitterShare() {
		const encodedQuote = encodeURIComponent(
			`${quote.content} - ${quote.author}`
		);
		window.open(`https://twitter.com/intent/tweet?text=${encodedQuote}`);
	}

	function whatsappShare() {
		const encodedQuote = encodeURIComponent(
			`${quote.content} - ${quote.author}`
		);
		window.open(`whatsapp://send?text=${encodedQuote}`);
	}

	function setRandColor(){
		let hue = Math.floor(Math.random() * 360);
		document.documentElement.style.setProperty("--accent-col",hue);
	}

	return (
		<div className="App">
			{isLoading ? (
				<p id="show-quote">Fetching Quote</p>
			) : err ? (
				<p id="show-quote">Error : {err}</p>
			) : (
				<>
					<p id="show-quote">{quote.content}</p>
					<span id="author">{quote.author}</span>
					<div className="ctrl">
						<button type="button" id="tweet" onClick={twitterShare}>
							<img
								src={tweeterapplogo}
								alt="Tweet"
								title="share quote on Tweeter"
							/>
						</button>
						<button
							type="button"
							id="whatsapp"
							onClick={whatsappShare}
						>
							<img
								src={whatsapplogo}
								alt="WhatsApp"
								title="share quote on WhatsApp"
							/>
						</button>
						<button
							type="button"
							title="copy quote to clipboard"
							onClick={copyToClipboard}
						>
							Copy
							<span id="tip" style={{ opacity: tip }}>
								Copied
							</span>
						</button>
						<button type="button" onClick={fetchQuote}>
							New Quote
						</button>
					</div>
				</>
			)}
		</div>
	);
}
