document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. NAVIGATION : SCROLL FLUIDE (SMOOTH SCROLL)
       ========================================= */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");

            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetPosition = targetElement.offsetTop;
                    
                    // Scroll avec un décalage de 60px pour la barre de navigation
                    window.scrollTo({
                        top: offsetPosition - 60,
                        behavior: "smooth"
                    });

                    // Met à jour l'URL sans recharger
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    /* =========================================
       2. NAVIGATION : LIEN ACTIF AU DÉFILEMENT (SCROLL SPY)
       ========================================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    const changeActiveLink = () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Marge de déclenchement
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSectionId)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", changeActiveLink);
    changeActiveLink(); // Initialisation au chargement

    /* =========================================
       3. EFFET MACHINE À ÉCRIRE 1 (JOB TITLE)
       ========================================= */
    const typingText = document.getElementById("typing-text");
    
    // 2. Vérification de sécurité
    if (!typingText) {
        console.error("ERREUR : Impossible de trouver <span id='typing-text'> dans le HTML.");
        return; // On arrête tout si l'élément n'existe pas
    }

    // 3. Les mots à écrire
    const words = ["Mechatronics Engineer", "Robotics Engineer", "Automation Expert"];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const currentChars = currentWord.substring(0, charIndex);
        
        typingText.textContent = currentChars;

        // Vitesse de frappe
        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed = 50; // Efface plus vite
        }

        if (!isDeleting && charIndex < currentWord.length) {
            // On écrit
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            // On efface
            charIndex--;
        } else {
            // Fin du mot ou mot effacé
            isDeleting = !isDeleting;
            typeSpeed = isDeleting ? 2000 : 500; // Pause avant d'effacer ou de réécrire
            
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, typeSpeed);
    };

    // Lancement
    typeEffect();


    /* =========================================
       4. EFFET MACHINE À ÉCRIRE 2 (ROLES)
       ========================================= */
    const roles = ["Consultant", "Curious Learner", "Problem Solver", "Data Enthusiast"];
    let roleIndex = 0;
    let roleCharIndex = 0;
    const roleTextElement = document.getElementById("role-text");

    // Paramètres de vitesse (légèrement différents du premier)
    const typeRoleSpeed = 100;
    const eraseRoleSpeed = 50;
    const delayRoleBetween = 2500;

    function typeRole() {
        if (!roleTextElement) return;

        if (roleCharIndex < roles[roleIndex].length) {
            roleTextElement.textContent += roles[roleIndex].charAt(roleCharIndex);
            roleCharIndex++;
            setTimeout(typeRole, typeRoleSpeed);
        } else {
            setTimeout(eraseRole, delayRoleBetween);
        }
    }

    function eraseRole() {
        if (!roleTextElement) return;

        if (roleCharIndex > 0) {
            roleTextElement.textContent = roles[roleIndex].substring(0, roleCharIndex - 1);
            roleCharIndex--;
            setTimeout(eraseRole, eraseRoleSpeed);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, typeRoleSpeed + 150);
        }
    }

    if (roleTextElement) typeRole();

    /* =========================================
       5. ANIMATION TIMELINE (DÉFILEMENT)
       ========================================= */
    const timelineItems = document.querySelectorAll(".timeline-item");

    const animateTimeline = () => {
        timelineItems.forEach(item => {
            // L'élément devient visible quand il atteint 80% de la hauteur de fenêtre
            if (item.getBoundingClientRect().top < window.innerHeight * 0.8) {
                item.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", animateTimeline);
    animateTimeline(); // Vérification initiale

    /* =========================================
       6. BOUTON RETOUR EN HAUT (SCROLL TO TOP)
       ========================================= */
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const homeSection = document.getElementById("home");

    const handleScrollToTopVisibility = () => {
        if (!scrollToTopBtn || !homeSection) return;

        // Affiche le bouton si on a dépassé la section Home
        if (homeSection.getBoundingClientRect().bottom < 0) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    };

    window.addEventListener("scroll", handleScrollToTopVisibility);
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    handleScrollToTopVisibility(); // Vérification initiale
});