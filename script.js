
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize all 360° viewers safely
            const init360Viewer = (viewerId) => {
                const viewer = document.getElementById(viewerId);
                if (!viewer) return;

                let rotation = 0;

                const leftBtn = viewer.parentElement.querySelector('.rotate-left');
                const rightBtn = viewer.parentElement.querySelector('.rotate-right');

                if (leftBtn) {
                    leftBtn.addEventListener('click', () => {
                        rotation -= 30;
                        viewer.style.transform = `rotateY(${rotation}deg)`;
                    });
                }

                if (rightBtn) {
                    rightBtn.addEventListener('click', () => {
                        rotation += 30;
                        viewer.style.transform = `rotateY(${rotation}deg)`;
                    });
                }
            };

            ['tesla-view', 'taycan-view', 'etron-view', 'rimac-view'].forEach(init360Viewer);

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Modal elements
            const modal = document.getElementById('userDetailsModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalSubtitle = document.getElementById('modalSubtitle');
            const modalCarName = document.getElementById('modalCarName');
            const modalCarPrice = document.getElementById('modalCarPrice');
            const modalAction = document.getElementById('modalAction');
            const userDetailsForm = document.getElementById('userDetailsForm');
            const cancelModal = document.getElementById('cancelModal');

            // Handle button clicks
            document.querySelectorAll('.car-actions button').forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.getAttribute('data-action');
                    const car = this.getAttribute('data-car');
                    const price = this.getAttribute('data-price');
                    
                    // Set modal content based on action
                    if (action === 'demo') {
                        modalTitle.textContent = `Book Demo for ${car}`;
                        modalSubtitle.textContent = "We'll schedule your test drive";
                    } else {
                        modalTitle.textContent = `Purchase ${car}`;
                        modalSubtitle.textContent = `Price: ${price}`;
                    }
                    
                    // Set hidden values
                    modalCarName.value = car;
                    modalCarPrice.value = price;
                    modalAction.value = action;
                    
                    // Show modal
                    modal.classList.add('active');
                });
            });

            // Handle modal form submission
            userDetailsForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                
                fetch("e_cars.php", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.text())
                .then(msg => {
                    alert(msg);
                    modal.classList.remove('active');
                    this.reset();
                })
                .catch(() => {
                    alert("❌ Failed to submit your request. Please try again.");
                });
            });

            // Handle modal cancel
            cancelModal.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        });
    



