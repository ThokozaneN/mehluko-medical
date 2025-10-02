// DOM Elements
        const themeToggle = document.getElementById('theme-toggle');
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        const header = document.getElementById('header');
        const appointmentModal = document.getElementById('appointment-modal');
        const modalClose = document.getElementById('modal-close');
        const appointmentForm = document.getElementById('appointment-form');
        const bmiForm = document.getElementById('bmi-form');
        const bmiResult = document.getElementById('bmi-result');
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');
        const testimonialSlider = document.getElementById('testimonial-slider');
        const sliderDots = document.querySelectorAll('.slider-dot');
        const statusIndicator = document.getElementById('status-indicator');
        const faqItems = document.querySelectorAll('.faq-item');

        // Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        // Mobile Menu Toggle
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Appointment Modal
        document.querySelectorAll('a[href="#appointment"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                appointmentModal.classList.add('active');
            });
        });

        modalClose.addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });

        // Close modal when clicking outside
        appointmentModal.addEventListener('click', (e) => {
            if (e.target === appointmentModal) {
                appointmentModal.classList.remove('active');
            }
        });

        // Appointment Form Submission
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(appointmentForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            
            // Create mailto link
            const subject = `Appointment Request - ${service}`;
            const body = `Hello,\n\nI would like to request an appointment for ${service} on ${date}.\n\nName: ${name}\nEmail: ${email}\n\nThank you.`;
            
            const mailtoLink = `mailto:info@mehlukomedical.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Close modal
            appointmentModal.classList.remove('active');
            
            // Reset form
            appointmentForm.reset();
        });

        // BMI Calculator
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (height > 0 && weight > 0) {
                const bmi = weight / (height * height);
                const roundedBmi = bmi.toFixed(1);
                
                bmiValue.textContent = roundedBmi;
                
                // Determine BMI category
                let category = '';
                if (bmi < 18.5) {
                    category = 'Underweight';
                    bmiResult.style.backgroundColor = 'rgba(251, 188, 4, 0.1)';
                    bmiResult.style.color = '#fbbc04';
                } else if (bmi >= 18.5 && bmi < 25) {
                    category = 'Normal Weight';
                    bmiResult.style.backgroundColor = 'rgba(52, 168, 83, 0.1)';
                    bmiResult.style.color = '#34a853';
                } else if (bmi >= 25 && bmi < 30) {
                    category = 'Overweight';
                    bmiResult.style.backgroundColor = 'rgba(251, 188, 4, 0.1)';
                    bmiResult.style.color = '#fbbc04';
                } else {
                    category = 'Obese';
                    bmiResult.style.backgroundColor = 'rgba(234, 67, 53, 0.1)';
                    bmiResult.style.color = '#ea4335';
                }
                
                bmiCategory.textContent = category;
                bmiResult.style.display = 'block';
            }
        });

        // Testimonial Slider
        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.testimonial').length;
        
        function showSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            sliderDots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Add click events to dots
        sliderDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // Auto-advance slides
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // FAQ Accordion
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });

        // Open/Closed Status
        function updateStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const hour = now.getHours();
            
            // Monday-Friday: 8am-6pm, Saturday: 9am-1pm
            const isOpen = 
                (day >= 1 && day <= 5 && hour >= 8 && hour < 18) || 
                (day === 6 && hour >= 9 && hour < 13);
            
            if (isOpen) {
                statusIndicator.className = 'hours-status open';
                statusIndicator.innerHTML = '<span class="status-dot"></span><span>Open now</span>';
            } else {
                statusIndicator.className = 'hours-status closed';
                statusIndicator.innerHTML = '<span class="status-dot"></span><span>Closed now</span>';
            }
        }
        
        updateStatus();
        // Update status every minute
        setInterval(updateStatus, 60000);