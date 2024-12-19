import { useEffect, useState } from "react";
import axios from "axios";
import Copy from "./assets/Copy";
import Twitter from "./assets/Twitter";
import Whatsapp from "./assets/Whatsapp";

function ShowQuote({ content, author, hue }) {
    return (
        <>
            <p className="text-2xl text-balance font-semibold w-full">
                <span
                    className=" text-6xl"
                    style={{
                        color: `hsl(${hue}, 50%, 30%)`,
                        fontFamily:"consolas",
                        lineHeight:'2rem'
                    }}
                >
                    "
                </span>
                {content}
            </p>
            <span className="text-xl text-end">- {author}</span>
        </>
    );
}

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quote, setQuote] = useState(null);
    const [hue, setHue] = useState(245);

    const fetchQuote = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("https://api.quotable.io/random");
            setQuote(response.data);
            changeHue();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const changeHue = () => {
        const newHue = Math.floor(Math.random() * 360);
        setHue(newHue);
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    const handleRetry = () => {
        setError(null);
        fetchQuote();
    };

    const appStyle = {
        backgroundColor: `hsl(${hue}, 50%, 50%)`,
        transition: "0.5s ease-in-out",
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const handleShareWhatsApp = () => {
        if (quote) {
            const url = `https://wa.me/?text=${encodeURIComponent(
                `${quote.content} - ${quote.author}`
            )}`;
            window.open(url, "_blank");
        }
    };

    const handleShareTwitter = () => {
        if (quote) {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `${quote.content} - ${quote.author}`
            )}`;
            window.open(url, "_blank");
        }
    };

    const handleCopyToClipboard = () => {
        if (quote) {
            navigator.clipboard.writeText(`${quote.content} - ${quote.author}`);
            alert("Quote copied to clipboard!");
        }
    };

    return (
        <div style={appStyle}>
            <div
                className="flex flex-col justify-center gap-2 p-4 rounded-lg shadow-2xl"
                style={{
                    backgroundColor: "#fdfdfd",
                    width: "500px",
                    maxWidth: "95%",
                }}
            >
                {loading && <p>Loading...</p>}
                {error && (
                    <div>
                        <p>Error: {error}</p>
                        <button
                            className="text-white p-2 rounded-lg w-1/4"
                            onClick={handleRetry}
                            style={{
                                background: `hsl(${hue}, 50%, 30%)`,
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}
                {!loading && !error && quote && (
                    <>
                        <ShowQuote
                            content={quote.content}
                            author={quote.author}
                            hue={hue}
                        />
                        <div className=" flex justify-end items-center h-10 gap-2">
                            <div className="flex justify-start gap-2 w-3/5 h-full">
                                <button
                                    onClick={handleShareWhatsApp}
                                    className="p-2 h-full aspect-square rounded-lg grid place-items-center"
                                    style={{
                                        background: `hsl(${hue}, 50%, 30%)`,
                                    }}
                                >
                                    <Whatsapp className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleShareTwitter}
                                    className="p-2 h-full aspect-square rounded-lg grid place-items-center"
                                    style={{
                                        background: `hsl(${hue}, 50%, 30%)`,
                                    }}
                                >
                                    <Twitter className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleCopyToClipboard}
                                    className="p-2 h-full aspect-square rounded-lg grid place-items-center"
                                    style={{
                                        background: `hsl(${hue}, 50%, 30%)`,
                                    }}
                                >
                                    <Copy className="w-6 h-6" />
                                </button>
                            </div>
                            <button
                                onClick={fetchQuote}
                                className="bg-emerald-500 h-full w-2/5 rounded-lg text-white font-semibold ml-2"
                                style={{
                                    background: `hsl(${hue}, 50%, 30%)`,
                                }}
                            >
                                New Quote
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
