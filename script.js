// script.js - Combined JavaScript for AMIGLORIA 2025 website

document.addEventListener('DOMContentLoaded', () => {
    // === Constants for DOM Elements ===
    const loading = document.getElementById('loading');
    const launchButton = document.getElementById('launch-button');
    const navButtons = document.querySelectorAll('.nav-button');
    const navParticleBurst = document.querySelector('.nav-particle-burst');
    const hackButton = document.getElementById('hack-button');
    const registerButton = document.getElementById('register-button');
    const registerModal = document.getElementById('register-modal');
    const closeModal = document.getElementById('close-modal');
    const favoritesList = document.getElementById('favorites');
    const contactForm = document.getElementById('contact-form');
    const registerForm = document.getElementById('register-form');
    const holoMessages = document.getElementById('holo-messages');
    const holoInput = document.getElementById('holo-input');
    const holoVoice = document.getElementById('holo-voice');
    const voiceUnsupported = document.getElementById('voice-unsupported');
    const amigloriaLogo = document.getElementById('amigloria-logo'); // Added for logo scroll effect

    // === Hyperspace Jump Animation on Load ===
    const handlePageLoad = () => {
        try {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                const hyperspace = document.createElement('div');
                hyperspace.className = 'hyperspace';
                document.body.appendChild(hyperspace);
                const audio = new Audio('https://freesound.org/data/previews/171/171671_2435678-lq.mp3');
                audio.play().catch(err => console.error('Audio playback failed:', err));
                setTimeout(() => {
                    hyperspace.remove();
                    document.querySelector('main').style.opacity = '1';
                    // Ensure sections are visible
                    document.querySelectorAll('#home, #about, #events, #contact-us').forEach(section => {
                        section.style.opacity = '1';
                    });
                }, 1000);
            }, 300);
        } catch (error) {
            console.error('Error during page load animation:', error);
        }
    };

    window.addEventListener('load', handlePageLoad);

    // === Cockpit Navigation with Particle Burst ===
    const createParticleBurst = (x, y) => {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'nav-particle';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            const angle = Math.random() * 360;
            const distance = Math.random() * 50 + 20;
            particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
            navParticleBurst.appendChild(particle);
            setTimeout(() => particle.remove(), 500);
        }
    };

    const handleNavClick = (button) => {
        try {
            const section = document.querySelector(button.dataset.section);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                const rect = button.getBoundingClientRect();
                createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
                const audio = new Audio('https://freesound.org/data/previews/171/171671_2435678-lq.mp3');
                audio.play().catch(err => console.error('Audio playback failed:', err));
            }
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };

    launchButton.addEventListener('click', () => {
        document.querySelector('main').style.opacity = '1';
        const audio = new Audio('https://freesound.org/data/previews/171/171671_2435678-lq.mp3');
        audio.play().catch(err => console.error('Audio playback failed:', err));
    });

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            if (sectionId) {
                // If on the main page, scroll to the section
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    const section = document.querySelector(sectionId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Redirect to the main page with the section ID
                    window.location.href = `index.html${sectionId}`;
                }
            }
        });
    });

    // === Hyperspace Button Animation ===
    hackButton.addEventListener('click', () => {
        try {
            const hyperspace = document.createElement('div');
            hyperspace.className = 'hyperspace';
            document.body.appendChild(hyperspace);
            const audio = new Audio('https://freesound.org/data/previews/171/171671_2435678-lq.mp3');
            audio.play().catch(err => console.error('Audio playback failed:', err));
            setTimeout(() => {
                hyperspace.remove();
                document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        } catch (error) {
            console.error('Error during hyperspace animation:', error);
        }
    });

    // === Countdown Timer ===
    const updateCountdown = () => {
        const eventDate = new Date('2025-05-09T18:00:00');
        const now = new Date();
        const timeDiff = eventDate - now;

        if (timeDiff <= 0) {
            document.querySelector('.countdown').innerHTML = '<p>Event has started!</p>';
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // === Favorite Events ===
    const favoriteEvents = new Set(JSON.parse(localStorage.getItem('favorites')) || []);

    const updateFavoritesList = () => {
        favoritesList.innerHTML = '';
        favoriteEvents.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            favoritesList.appendChild(li);
        });
        localStorage.setItem('favorites', JSON.stringify([...favoriteEvents]));
    };

    document.querySelectorAll('.favorite-button').forEach(button => {
        const eventName = button.dataset.event;
        if (favoriteEvents.has(eventName)) {
            button.classList.add('favorited');
        }

        button.addEventListener('click', () => {
            if (favoriteEvents.has(eventName)) {
                favoriteEvents.delete(eventName);
                button.classList.remove('favorited');
            } else {
                favoriteEvents.add(eventName);
                button.classList.add('favorited');
            }
            updateFavoritesList();
        });
    });

    updateFavoritesList();

    // === Event Registration Modal ===
    const openModal = () => {
        registerModal.style.display = 'flex';
        registerModal.querySelector('input').focus();
    };

    const closeModalHandler = () => {
        registerModal.style.display = 'none';
    };

    registerButton.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    closeModal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            closeModalHandler();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            closeModalHandler();
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        console.log('Registration Data:', Object.fromEntries(formData));
        alert('Registration successful!');
        closeModalHandler();
        registerForm.reset();
    });

    // Event details mapping
    const eventDetails = {
        "echo-verse": { name: "Echo Verse: The Ultimate Singing Showdown", maxParticipants: 5, amount: 500 },
        "rhythmic-rumble": { name: "Rhythmic Rumble: Video Choreography", maxParticipants: 10, amount: 1000 },
        "taal-tarang": { name: "Taal Tarang: The Classical Dance Confrontation", maxParticipants: 1, amount: 500 },
        "folk-feat-fiesta": { name: "Folk Feat Fiesta: Step Into Heritage", maxParticipants: 10, amount: 1000 },
        "clash-of-chords": { name: "Clash of Chords: The Band Face-Off", maxParticipants: 10, amount: 2000 },
        "aether-vortex": { name: "Aether Vortex: The Runway Revolution", maxParticipants: 12, amount: 2000 },
        "canvas-of-expressions": { name: "Canvas of Expressions – The Face Painting Challenge", maxParticipants: 2, amount: 500 },
        "spontanea": { name: "Spontanea: Speak Your Mind", maxParticipants: 1, amount: 300 },
        "clash-of-minds": { name: "Clash of Minds – The Ultimate Debate Battle", maxParticipants: 2, amount: 500 },
        "brainwave-arena": { name: "Brainwave Arena: The Knowledge Knockout", maxParticipants: 1, amount: 500 },
        "inno-thon": { name: "Inno Thon: Pitch to Win", maxParticipants: 4, amount: 500 },
        "bid-blasters": { name: "Bid Blasters: The IPL Auction Showdown", maxParticipants: 4, amount: 1000 },
        "frame-quest": { name: "Frame Quest: Capture the Moment", maxParticipants: 1, amount: 300 },
        "cine-sprint": { name: "Cine Sprint – The Short Movie Showdown", maxParticipants: 6, amount: 1000 }
    };

    // Open registration modal with event-specific details
    document.querySelectorAll(".register-button").forEach(button => {
        button.addEventListener("click", () => {
            const eventKey = button.dataset.event;
            const event = eventDetails[eventKey];
            document.getElementById("event-name").textContent = event.name;
            document.getElementById("registration-amount").textContent = event.amount;
            document.getElementById("group-name").style.display = event.maxParticipants > 1 ? "block" : "none";
            document.getElementById("participants").innerHTML = `
                <div class="participant">
                    <h3>Participant 1</h3>
                    <input type="text" name="participant-name[]" placeholder="Name" required aria-label="Participant Name">
                    <input type="text" name="college-name[]" placeholder="College Name" required aria-label="College Name">
                    <input type="tel" name="contact-no[]" placeholder="Contact No" required aria-label="Contact No">
                    <input type="email" name="email[]" placeholder="Email ID" required aria-label="Email ID">
                </div>
            `;
            registerModal.style.display = "flex";
        });
    });

    // Add participant functionality
    document.getElementById("add-participant").addEventListener("click", () => {
        const participants = document.querySelectorAll(".participant").length;
        const eventKey = document.querySelector(".register-button[data-event]").dataset.event;
        const maxParticipants = eventDetails[eventKey].maxParticipants;

        if (participants < maxParticipants) {
            const participantDiv = document.createElement("div");
            participantDiv.classList.add("participant");
            participantDiv.innerHTML = `
                <h3>Participant ${participants + 1}</h3>
                <input type="text" name="participant-name[]" placeholder="Name" required aria-label="Participant Name">
                <input type="text" name="college-name[]" placeholder="College Name" required aria-label="College Name">
                <input type="tel" name="contact-no[]" placeholder="Contact No" required aria-label="Contact No">
                <input type="email" name="email[]" placeholder="Email ID" required aria-label="Email ID">
            `;
            document.getElementById("participants").appendChild(participantDiv);
        } else {
            alert(`Maximum ${maxParticipants} participants allowed for this event.`);
        }
    });

    // Handle form submission
    document.getElementById("register-form").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Redirecting to payment gateway...");
        // Integrate payment gateway link here
        window.location.href = "https://payment-gateway-link.com";
    });

    // === Contact Form Submission ===
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        console.log('Contact Form Data:', Object.fromEntries(formData));
        alert('Message sent successfully!');
        contactForm.reset();
    });

    // === Scroll Animations ===
    const animateOnScroll = () => {
        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // === Custom Cursor ===
    let cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        document.documentElement.style.setProperty('--cursor-x', `${cursorX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${cursorY}px`);
    });

    // === Starfield Effect using Three.js ===
    const initStarfield = () => {
        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('bg-canvas').appendChild(renderer.domElement);

            const starsGeometry = new THREE.BufferGeometry();
            const starsCount = 5000;
            const positions = new Float32Array(starsCount * 3);

            for (let i = 0; i < starsCount * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 2000;
            }

            starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const starsMaterial = new THREE.PointsMaterial({ color: 0xe6e6e6, size: 2, sizeAttenuation: true });
            const starField = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(starField);

            camera.position.z = 5;

            const animate = () => {
                requestAnimationFrame(animate);
                starField.rotation.y += 0.001;
                renderer.render(scene, camera);
            };

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        } catch (error) {
            console.error('Error initializing starfield:', error);
        }
    };

    initStarfield();

    // === Shooting Stars Effect using Canvas ===
    const initShootingStars = () => {
        try {
            const canvas = document.getElementById('shooting-stars');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const stars = [];
            const createStar = () => {
                return {
                    x: Math.random() * canvas.width,
                    y: 0,
                    length: Math.random() * 80 + 20,
                    speed: Math.random() * 5 + 2,
                    angle: Math.PI / 4
                };
            };

            const drawStar = (star) => {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                const endX = star.x + star.length * Math.cos(star.angle);
                const endY = star.y + star.length * Math.sin(star.angle);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = 'rgba(230, 230, 230, 0.8)';
                ctx.lineWidth = 2;
                ctx.stroke();
            };

            const updateStar = (star) => {
                star.x += star.speed * Math.cos(star.angle);
                star.y += star.speed * Math.sin(star.angle);
                return star.y < canvas.height && star.x < canvas.width;
            };

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (Math.random() < 0.05) {
                    stars.push(createStar());
                }
                stars.forEach((star, index) => {
                    drawStar(star);
                    if (!updateStar(star)) {
                        stars.splice(index, 1);
                    }
                });
                requestAnimationFrame(animate);
            };

            animate();

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        } catch (error) {
            console.error('Error initializing shooting stars:', error);
        }
    };

    initShootingStars();

    // === Cursor Trail Effect ===
    const initCursorTrail = () => {
        try {
            const cursorTrail = document.getElementById('cursor-trail');
            let lastX = 0, lastY = 0;

            document.addEventListener('mousemove', (e) => {
                const deltaX = Math.abs(e.clientX - lastX);
                const deltaY = Math.abs(e.clientY - lastY);
                if (deltaX > 5 || deltaY > 5) {
                    const particle = document.createElement('div');
                    particle.className = 'cursor-particle';
                    particle.style.left = `${e.clientX}px`;
                    particle.style.top = `${e.clientY}px`;
                    cursorTrail.appendChild(particle);
                    setTimeout(() => particle.remove(), 1000);
                    lastX = e.clientX;
                    lastY = e.clientY;
                }
            });
        } catch (error) {
            console.error('Error initializing cursor trail:', error);
        }
    };

    initCursorTrail();

    // === Holographic Chat Assistant (Astra) ===
    const initHoloChat = () => {
        try {
            const responses = {
                'hello': 'Greetings, space traveler! How can Astra assist you today?',
                'events': 'AMIGLORIA 2025 features events like Echo Verse, Rhythmic Rumble, and Clash of Chords. Which one interests you?',
                'date': 'AMIGLORIA 2025 is happening on May 9-10, 2025. Mark your calendar!',
                'location': 'The event is at Amity University Bengaluru, a 70-acre campus. Ready to explore?',
                'default': 'I’m not sure about that. Try asking about events, date, or location!'
            };

            const addMessage = (message, sender) => {
                const p = document.createElement('p');
                p.textContent = `${sender}: ${message}`;
                holoMessages.appendChild(p);
                holoMessages.scrollTop = holoMessages.scrollHeight;
            };

            const getResponse = (message) => {
                const msg = message.toLowerCase();
                return responses[msg] || responses['default'];
            };

            holoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && holoInput.value.trim()) {
                    const userMessage = holoInput.value.trim();
                    addMessage(userMessage, 'You');
                    const response = getResponse(userMessage);
                    setTimeout(() => addMessage(response, 'Astra'), 500);
                    holoInput.value = '';
                }
            });

            // Voice Input Support
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-US';
                recognition.interimResults = false;

                holoVoice.addEventListener('click', () => {
                    recognition.start();
                    holoVoice.textContent = '🎤 Listening...';
                });

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    holoInput.value = transcript;
                    addMessage(transcript, 'You');
                    const response = getResponse(transcript);
                    setTimeout(() => addMessage(response, 'Astra'), 500);
                    holoVoice.textContent = '🎙️';
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    addMessage('Sorry, I couldn’t hear you. Please try typing.', 'Astra');
                    holoVoice.textContent = '🎙️';
                };

                recognition.onend = () => {
                    holoVoice.textContent = '🎙️';
                };
            } else {
                voiceUnsupported.classList.remove('hidden');
                holoVoice.disabled = true;
            }
        } catch (error) {
            console.error('Error initializing holo chat:', error);
        }
    };

    initHoloChat();

    // === Logo Disappear on Scroll ===
    const handleLogoScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            amigloriaLogo.style.opacity = '0';
            amigloriaLogo.style.transition = 'opacity 0.3s ease';
        } else {
            amigloriaLogo.style.opacity = '1';
            amigloriaLogo.style.transition = 'opacity 0.3s ease';
        }
    };

    window.addEventListener('scroll', handleLogoScroll);
    handleLogoScroll(); // Initial call to set the correct state on page load

    // === Footer Visibility on Scroll ===
    const footer = document.querySelector('footer');
    let lastScrollY = window.scrollY;

    const handleFooterScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleFooterScroll);
    handleFooterScroll(); // Initial call to set the correct state on page load

    // === Event Link Update for Echo Verse ===
    document.querySelectorAll('.sub-planet[data-event="echo-verse"]').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = './events/echo-verse.html';
        });
    });
});