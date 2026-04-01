const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning ");
    } else if(hr == 12) {
        speak("Good Noon ");
    } else if(hr > 12 && hr <= 16) {
        speak("Good Afternoon ");
    } else if(hr > 16 && hr <= 20) {
        speak("Good Evening ");
    } else {
        speak("Good Night");
    }
}

window.addEventListener('load', ()=>{
    speak("Inertia");
    speak("Going online");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
});

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I did not understand what you said, please try again";

    // Basic responses
    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello";
        speech.text = finalText;
    } else if(message.includes('how are you')) {
        const finalText = "I am fine, tell me how can I help you";
        speech.text = finalText;
    } else if(message.includes('name')) {
        const finalText = "My name is Inertia";
        speech.text = finalText;
    }

    // Opening websites
    else if(message.includes('open Ghub')) {
        window.open("https://github.com/", "_blank");
        const finalText = "Opening github";
        speech.text = finalText;
    }
    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    } else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening Instagram";
        speech.text = finalText;
    } else if(message.includes('open leetcode')) {
        window.open("https://leetcode.com/", "_blank");
        const finalText = "Opening Leetcode";
        speech.text = finalText;
    } else if(message.includes('open hackerrank')) {
        window.open("https://www.hackerrank.com/", "_blank");
        const finalText = "Opening Hackerrank";
        speech.text = finalText;
    }

    // Search on Google or Wikipedia
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speech.text = finalText;
    } else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speech.text = finalText;
    }

    // Play music on YouTube
    else if(message.includes('play')) {
        const songName = message.replace('play', '').trim();
        window.open(`https://www.youtube.com/results?search_query=${songName}`, "_blank");
        const finalText = `Playing ${songName} on YouTube`;
        speech.text = finalText;
    }

    // Simple math calculations
    else if(message.includes('calculate')) {
        try {
            const expression = message.replace('calculate', '').trim();
            const result = eval(expression); // Use cautiously
            const finalText = `The result is ${result}`;
            speech.text = finalText;
        } catch (e) {
            const finalText = "Sorry, I couldn't calculate that.";
            speech.text = finalText;
        }
    }

    // Set a reminder
    else if(message.includes('set reminder for')) {
        const time = parseInt(message.match(/\d+/)); // Extracts time in minutes
        const finalText = `Setting a reminder for ${time} minutes`;
        speech.text = finalText;

        setTimeout(() => {
            speak("This is your reminder!");
        }, time * 60000); // Time in milliseconds
    }

    // Tell a joke
    else if(message.includes('tell me a joke')) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the bicycle fall over? It was two-tired!",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kat ads."
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const finalText = randomJoke;
        speech.text = finalText;
    }

    // Time and date
    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
        const finalText = time;
        speech.text = finalText;
    } else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"});
        const finalText = date;
        speech.text = finalText;
    }

    // Volume control
    else if(message.includes('volume up')) {
        speech.volume = Math.min(speech.volume + 0.1, 1);
        const finalText = "Increasing volume";
        speech.text = finalText;
    } else if(message.includes('volume down')) {
        speech.volume = Math.max(speech.volume - 0.1, 0);
        const finalText = "Decreasing volume";
        speech.text = finalText;
    }

    // Browser control
    else if(message.includes('close tab')) {
        window.close();
        const finalText = "Closing current tab";
        speech.text = finalText;
    } else if(message.includes('next tab')) {
        const finalText = "Switching to the next tab";
        speech.text = finalText;
        // Switching tabs isn't supported natively in JavaScript without browser extensions.
    }

    // General search
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}