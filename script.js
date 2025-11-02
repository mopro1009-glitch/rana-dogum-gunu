// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Renk Kodları
    const successColor = '#4CAF50';
    const dangerColor = '#f44336';
    
    // HTML Elementlerini Seçme
    const body = document.body;
    const step1 = document.getElementById('step1');
    const startButton = document.getElementById('startButton');
    const step2 = document.getElementById('step2'); 
    const q1Yes = document.getElementById('q1Yes');
    const q1No = document.getElementById('q1No');
    const step3 = document.getElementById('step3'); 
    const q2Answer = document.getElementById('q2Answer');
    const submitAnswer3 = document.getElementById('submitAnswer3'); 
    const q2Feedback = document.getElementById('q2Feedback');
    const step4 = document.getElementById('step4'); 
    const q3Answer = document.getElementById('q3Answer');
    const submitAnswer4 = document.getElementById('submitAnswer4');
    const q3Feedback = document.getElementById('q3Feedback');
    const step5 = document.getElementById('step5'); 
    const q4Answer = document.getElementById('q4Answer');
    const submitAnswer5 = document.getElementById('submitAnswer5');
    const q4Feedback = document.getElementById('q4Feedback');
    const step6 = document.getElementById('step6'); 
    const q5Answer = document.getElementById('q5Answer');
    const submitAnswer6 = document.getElementById('submitAnswer6');
    const q5Feedback = document.getElementById('q5Feedback');
    const finalSurprise = document.getElementById('finalSurprise');
    const initialMessage = document.getElementById('initialMessage');
    const heartContainer = document.querySelector('.heart-container'); 
    
    // Konfeti için kapsayıcıyı dinamik olarak oluştur
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    body.appendChild(confettiContainer);


    // --- Adım 1: Başlangıç Butonuna Tıklama (Step 1 -> Step 2) ---
    startButton.addEventListener('click', () => {
        initialMessage.textContent = "DOĞRULAMA BAŞLIYOR...";
        startButton.classList.add('hidden');
        
        setTimeout(() => {
            step1.classList.add('hidden');
            step2.classList.remove('hidden'); // Soru 1'e geç
        }, 1000);
    });

    // --- Adım 2: Onur'u Seviyor Musun? (EVET Doğrulama) (Step 2 -> Step 3) ---
    q1Yes.addEventListener('click', () => {
        step2.classList.add('hidden');
        step3.classList.remove('hidden'); // Soru 2'ye geç
    });

    // Hayır Cevabı
    q1No.addEventListener('click', () => {
        q1No.textContent = "EVET OLMALIYDI!";
        q1No.style.backgroundColor = 'darkred';
        q1No.disabled = true;
        q1Yes.style.transform = 'scale(1.1)'; 
        
        setTimeout(() => {
            q1No.textContent = "HAYIR";
            q1No.style.backgroundColor = dangerColor;
            q1No.disabled = false;
            q1Yes.style.transform = 'scale(1.0)';
        }, 1500);
    });

    // --- Cevap Doğrulama Bağlantıları ---
    submitAnswer3.addEventListener('click', () => checkAnswer(q2Answer, ['waffle', 'künefe', 'kunefe'], q2Feedback, step3, step4));
    q2Answer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer(q2Answer, ['waffle', 'künefe', 'kunefe'], q2Feedback, step3, step4);
    });
    
    submitAnswer4.addEventListener('click', () => checkAnswer(q3Answer, ['bordo'], q3Feedback, step4, step5));
    q3Answer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer(q3Answer, ['bordo'], q3Feedback, step4, step5);
    });
    
    submitAnswer5.addEventListener('click', () => checkAnswer(q4Answer, ['yaban mersini', 'yabanmersini'], q4Feedback, step5, step6));
    q4Answer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer(q4Answer, ['yaban mersini', 'yabanmersini'], q4Feedback, step5, step6);
    });

    submitAnswer6.addEventListener('click', () => checkAnswer(q5Answer, ['balım', 'balim'], q5Feedback, step6, finalSurprise, true));
    q5Answer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer(q5Answer, ['balım', 'balim'], q5Feedback, step6, finalSurprise, true);
    });


    // *** GENEL CEVAP KONTROL FONKSİYONU ***
    function checkAnswer(inputElement, correctAnswers, feedbackElement, currentStep, nextStep, isFinalStep = false) {
        const answer = inputElement.value.trim().toLowerCase().replace(/[^a-zıüçöğş]/g, ''); 
        
        if (correctAnswers.includes(answer)) {
            feedbackElement.textContent = "Tebrikler! Doğrulama Başarılı.";
            feedbackElement.style.color = successColor;

            setTimeout(() => {
                currentStep.classList.add('hidden'); 
                
                if (isFinalStep) {
                    nextStep.classList.remove('hidden');
                    nextStep.classList.add('show'); 
                    body.classList.add('final-background'); 
                    startHeartAnimation(); 
                    startConfettiAnimation(); // Konfeti Başlat
                } else {
                    nextStep.classList.remove('hidden'); 
                }
                
                feedbackElement.textContent = '';
                inputElement.value = ''; 
            }, 1500);

        } else {
            feedbackElement.textContent = "Hata! Yanlış Cevap. Tekrar Deneyin.";
            feedbackElement.style.color = dangerColor;
            inputElement.value = '';
            inputElement.style.borderColor = dangerColor;
            
            setTimeout(() => {
                inputElement.style.borderColor = '#ddd';
                feedbackElement.textContent = '';
            }, 2000);
        }
    }

    // Kalp animasyonu fonksiyonları (Artık durmayacak!)
    function startHeartAnimation() {
        let heartInterval = setInterval(() => {
            createHeart();
        }, 100);

        // NOT: Kalpleri durduran kod kaldırıldı (setTimeout yok)
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        const randomLeft = Math.random() * 80 + 10; 
        heart.style.left = randomLeft + 'vw'; 
        heart.style.animationDuration = (Math.random() * 2 + 3.5) + 's'; 
        heart.style.animationDelay = Math.random() * 0.5 + 's'; 

        heartContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Konfeti animasyonu fonksiyonları (Aynı Kaldı)
    const confettiColors = ['var(--confetti-yellow)', 'var(--confetti-pink)', 'var(--confetti-blue)', '#FF00FF']; 

    function startConfettiAnimation() {
        // Sol üst köşeden konfeti fırlat
        for (let i = 0; i < 30; i++) { 
            createConfetti('top-left');
        }
        // Sağ üst köşeden konfeti fırlat
        for (let i = 0; i < 30; i++) { 
            createConfetti('top-right');
        }

        setTimeout(() => {
            confettiContainer.innerHTML = ''; 
        }, 3500);
    }

    function createConfetti(origin) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        let startX, startY;
        let endX, endY;
        let rotateDegree;

        if (origin === 'top-left') {
            startX = Math.random() * window.innerWidth * 0.1; 
            startY = Math.random() * window.innerHeight * 0.1;
            endX = Math.random() * window.innerWidth * 0.5; 
            endY = window.innerHeight + Math.random() * 100; 
            rotateDegree = Math.random() * 720; 
            
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            
        } else { // top-right
            startX = window.innerWidth * 0.9 + Math.random() * window.innerWidth * 0.1; 
            startY = Math.random() * window.innerHeight * 0.1;
            endX = window.innerWidth * 0.5 - Math.random() * window.innerWidth * 0.5; 
            endY = window.innerHeight + Math.random() * 100; 
            rotateDegree = Math.random() * 720;
            
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
        }

        confetti.style.setProperty('--dx', `${endX - startX}px`);
        confetti.style.setProperty('--dy', `${endY - startY}px`);
        confetti.style.setProperty('--dr', `${rotateDegree}deg`);

        confetti.style.animationDuration = (Math.random() * 1.5 + 2) + 's'; 
        confetti.style.animationDelay = Math.random() * 0.5 + 's'; 

        confettiContainer.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
});