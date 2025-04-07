document.addEventListener('DOMContentLoaded', function() {
    const stressForm = document.getElementById('stressForm');
    const resultsSection = document.getElementById('results');
    const scorePercent = document.getElementById('scorePercent');
    const scoreCircle = document.getElementById('scoreCircle');
    const stressLevel = document.getElementById('stressLevel');
    const stressAnalysis = document.getElementById('stressAnalysis');
    const stressRecommendations = document.getElementById('stressRecommendations');
    const restartBtn = document.getElementById('restartBtn');
    const themeToggle = document.getElementById('themeToggle');
    const historySection = document.getElementById('history');
    const historyList = document.getElementById('historyList');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    const closeHistoryBtn = document.getElementById('closeHistoryBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const saveResultsBtn = document.getElementById('saveResultsBtn');
    const printResultsBtn = document.getElementById('printResultsBtn');
    const shareWhatsapp = document.getElementById('shareWhatsapp');
    const shareTwitter = document.getElementById('shareTwitter');
    const shareEmail = document.getElementById('shareEmail');
    const prevButton = document.getElementById('prevQuestion');
    const nextButton = document.getElementById('nextQuestion');
    const progressBar = document.getElementById('questionProgress');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const submitBtn = document.getElementById('submitBtn');

    // Define stress categories and their ranges
    const stressCategories = {
        low: { min: 15, max: 35, name: 'منخفض', color: 'low-stress', circleColor: 'low-stress-circle' },
        medium: { min: 36, max: 55, name: 'متوسط', color: 'medium-stress', circleColor: 'medium-stress-circle' },
        high: { min: 56, max: 75, name: 'مرتفع', color: 'high-stress', circleColor: 'high-stress-circle' }
    };

    // Define stress domains for analysis
    const stressDomains = {
        workload: [1, 5, 12],
        relationships: [3, 7, 9, 15],
        psychological: [2, 4, 8, 10],
        adaptation: [6, 11, 13, 14]
    };

    // Define recommendations based on stress domains
    const recommendations = {
        workload: [
            'تنظيم الوقت باستخدام جداول وأولويات واضحة للمهام.',
            'تفويض بعض المهام عندما يكون ذلك ممكنًا.',
            'التواصل مع الإدارة لمناقشة عبء العمل إذا كان مفرطًا.',
            'تخصيص وقت للراحة بين المهام المختلفة.'
        ],
        relationships: [
            'تطوير مهارات التواصل الفعال مع الزملاء والإدارة وأولياء الأمور.',
            'المشاركة في أنشطة بناء الفريق لتعزيز العلاقات المهنية.',
            'تعلم استراتيجيات إدارة النزاعات للتعامل مع المواقف الصعبة.',
            'طلب الدعم من الزملاء ذوي الخبرة عند مواجهة تحديات مع أولياء الأمور.'
        ],
        psychological: [
            'ممارسة تقنيات الاسترخاء مثل التنفس العميق والتأمل.',
            'تخصيص وقت للأنشطة الترفيهية والهوايات خارج نطاق العمل.',
            'الحفاظ على التوازن بين العمل والحياة الشخصية.',
            'طلب المساعدة المهنية إذا استمرت مشاعر القلق والتوتر.'
        ],
        adaptation: [
            'المشاركة في دورات تدريبية لتطوير المهارات المهنية.',
            'التعاون مع الزملاء لتبادل الأفكار والاستراتيجيات الجديدة.',
            'تبني نهج مرن تجاه التغييرات في نظام التعليم.',
            'وضع أهداف واقعية وقابلة للتحقيق للتكيف مع المتطلبات الجديدة.'
        ]
    };

    // Setup question navigation
    const questions = document.querySelectorAll('.question');
    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;
    
    // Hide all questions except the first one
    questions.forEach((question, index) => {
        if (index !== 0) {
            question.style.display = 'none';
        }
    });
    
    // Update progress indicator
    totalQuestionsSpan.textContent = totalQuestions;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;
    
    // Hide submit button until last question
    submitBtn.style.display = 'none';
    
    // Next button handler
    nextButton.addEventListener('click', function() {
        // Check if current question is answered
        const currentQuestion = questions[currentQuestionIndex];
        const radioButtons = currentQuestion.querySelectorAll('input[type="radio"]');
        let answered = false;
        
        radioButtons.forEach(radio => {
            if (radio.checked) {
                answered = true;
            }
        });
        
        if (!answered) {
            alert('يرجى اختيار إجابة قبل الانتقال للسؤال التالي');
            return;
        }
        
        // Hide current question and show next question
        if (currentQuestionIndex < totalQuestions - 1) {
            questions[currentQuestionIndex].style.display = 'none';
            currentQuestionIndex++;
            questions[currentQuestionIndex].style.display = 'block';
            
            // Update progress indicator
            currentQuestionSpan.textContent = currentQuestionIndex + 1;
            progressBar.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;
            
            // Enable previous button
            prevButton.disabled = false;
            
            // If we reached the last question, show submit button and hide next button
            if (currentQuestionIndex === totalQuestions - 1) {
                nextButton.style.display = 'none';
                submitBtn.style.display = 'block';
            }
        }
    });
    
    // Previous button handler
    prevButton.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            questions[currentQuestionIndex].style.display = 'none';
            currentQuestionIndex--;
            questions[currentQuestionIndex].style.display = 'block';
            
            // Update progress indicator
            currentQuestionSpan.textContent = currentQuestionIndex + 1;
            progressBar.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;
            
            // Disable previous button if we reached the first question
            if (currentQuestionIndex === 0) {
                prevButton.disabled = true;
            }
            
            // If we're no longer on the last question, show next button and hide submit button
            if (currentQuestionIndex < totalQuestions - 1) {
                nextButton.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        // Save theme preference
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Load saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    // Form submission handler
    stressForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Calculate total score
        let totalScore = 0;
        let answers = [];
        
        // Collect all answers
        for (let i = 1; i <= 15; i++) {
            const questionName = 'q' + i;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedOption) {
                const value = parseInt(selectedOption.value);
                totalScore += value;
                answers.push(value);
            }
        }
        
        // Calculate percentage
        const maxPossibleScore = 75; // 15 questions * 5 (max value)
        const percentage = Math.round((totalScore / maxPossibleScore) * 100);
        
        // Determine stress level
        let category;
        if (totalScore >= stressCategories.high.min) {
            category = stressCategories.high;
        } else if (totalScore >= stressCategories.medium.min) {
            category = stressCategories.medium;
        } else {
            category = stressCategories.low;
        }
        
        // Update UI with results
        scorePercent.textContent = percentage;
        stressLevel.textContent = category.name;
        stressLevel.className = category.color;
        
        // Update circle visualization
        const dashoffset = 440 - (440 * percentage / 100);
        scoreCircle.style.strokeDashoffset = dashoffset;
        
        // Remove any existing color classes
        scoreCircle.classList.remove('low-stress-circle', 'medium-stress-circle', 'high-stress-circle');
        // Add the appropriate color class
        scoreCircle.classList.add(category.circleColor);
        
        // Analyze stress domains
        const domainScores = analyzeDomains(answers);
        
        // Generate analysis text
        stressAnalysis.innerHTML = generateAnalysis(totalScore, category, domainScores);
        
        // Generate recommendations
        stressRecommendations.innerHTML = generateRecommendations(domainScores);
        
        // Create domains chart
        createDomainsChart(domainScores);
        
        // Show results section
        stressForm.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Create domains chart
    function createDomainsChart(domainScores) {
        const ctx = document.getElementById('domainsChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.domainsChart) {
            window.domainsChart.destroy();
        }
        
        // Create new chart
        window.domainsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['عبء العمل', 'العلاقات المهنية', 'الضغوط النفسية', 'التكيف مع المتغيرات'],
                datasets: [{
                    label: 'مستوى الضغط (%)',
                    data: [
                        domainScores.workload.percentage,
                        domainScores.relationships.percentage,
                        domainScores.psychological.percentage,
                        domainScores.adaptation.percentage
                    ],
                    backgroundColor: [
                        '#8e44ad',
                        '#3498db',
                        '#e74c3c',
                        '#2ecc71'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: document.body.classList.contains('light-theme') ? '#333333' : '#f5f5f5'
                        },
                        grid: {
                            color: document.body.classList.contains('light-theme') ? '#dddddd' : '#333333'
                        }
                    },
                    x: {
                        ticks: {
                            color: document.body.classList.contains('light-theme') ? '#333333' : '#f5f5f5'
                        },
                        grid: {
                            color: document.body.classList.contains('light-theme') ? '#dddddd' : '#333333'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Save results functionality
    saveResultsBtn.addEventListener('click', function() {
        const totalScore = parseInt(document.getElementById('scorePercent').textContent);
        const stressLevelText = document.getElementById('stressLevel').textContent;
        
        // Get domain scores from chart
        const domainScores = {
            workload: { percentage: window.domainsChart.data.datasets[0].data[0] },
            relationships: { percentage: window.domainsChart.data.datasets[0].data[1] },
            psychological: { percentage: window.domainsChart.data.datasets[0].data[2] },
            adaptation: { percentage: window.domainsChart.data.datasets[0].data[3] }
        };
        
        // Create result object
        const result = {
            date: new Date().toISOString(),
            totalScore: totalScore,
            stressLevel: stressLevelText,
            domainScores: domainScores
        };
        
        // Save to localStorage
        const savedResults = JSON.parse(localStorage.getItem('stressTestResults') || '[]');
        savedResults.push(result);
        localStorage.setItem('stressTestResults', JSON.stringify(savedResults));
        
        alert('تم حفظ النتائج بنجاح!');
    });
    
    // View history functionality
    viewHistoryBtn.addEventListener('click', function() {
        const savedResults = JSON.parse(localStorage.getItem('stressTestResults') || '[]');
        
        if (savedResults.length === 0) {
            alert('لا توجد نتائج محفوظة بعد.');
            return;
        }
        
        // Clear history list
        historyList.innerHTML = '';
        
        // Add history items
        savedResults.forEach((result, index) => {
            const date = new Date(result.date);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <div class="history-item-date">${formattedDate}</div>
                    <div class="history-item-score">مستوى الضغط: <span class="${getStressLevelClass(result.stressLevel)}">${result.stressLevel}</span> (${result.totalScore}%)</div>
                </div>
                <div class="history-item-domains">
                    <p>عبء العمل: ${result.domainScores.workload.percentage}%</p>
                    <p>العلاقات المهنية: ${result.domainScores.relationships.percentage}%</p>
                    <p>الضغوط النفسية: ${result.domainScores.psychological.percentage}%</p>
                    <p>التكيف مع المتغيرات: ${result.domainScores.adaptation.percentage}%</p>
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
        
        // Create history chart
        createHistoryChart(savedResults);
        
        // Show history section
        resultsSection.style.display = 'none';
        historySection.style.display = 'block';
    });
    
    // Create history chart
    function createHistoryChart(savedResults) {
        const ctx = document.getElementById('historyChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.historyChart) {
            window.historyChart.destroy();
        }
        
        // Prepare data
        const labels = savedResults.map(result => {
            const date = new Date(result.date);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        });
        
        const data = savedResults.map(result => result.totalScore);
        
        // Create new chart
        window.historyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'مستوى الضغط (%)',
                    data: data,
                    borderColor: '#8e44ad',
                    backgroundColor: 'rgba(142, 68, 173, 0.2)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: document.body.classList.contains('light-theme') ? '#333333' : '#f5f5f5'
                        },
                        grid: {
                            color: document.body.classList.contains('light-theme') ? '#dddddd' : '#333333'
                        }
                    },
                    x: {
                        ticks: {
                            color: document.body.classList.contains('light-theme') ? '#333333' : '#f5f5f5'
                        },
                        grid: {
                            color: document.body.classList.contains('light-theme') ? '#dddddd' : '#333333'
                        }
                    }
                }
            }
        });
    }
    
    // Helper function to get stress level class
    function getStressLevelClass(level) {
        switch (level) {
            case 'منخفض':
                return 'low-stress';
            case 'متوسط':
                return 'medium-stress';
            case 'مرتفع':
                return 'high-stress';
            default:
                return '';
        }
    }
    
    // Close history button
    closeHistoryBtn.addEventListener('click', function() {
        historySection.style.display = 'none';
        resultsSection.style.display = 'block';
    });
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', function() {
        if (confirm('هل أنت متأكد من رغبتك في مسح جميع النتائج المحفوظة؟')) {
            localStorage.removeItem('stressTestResults');
            historySection.style.display = 'none';
            resultsSection.style.display = 'block';
            alert('تم مسح جميع النتائج المحفوظة.');
        }
    });
    
    // Print results button
    printResultsBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Share buttons
    shareWhatsapp.addEventListener('click', function() {
        const text = `نتيجة مقياس ضغط العمل: ${scorePercent.textContent}% - مستوى الضغط: ${stressLevel.textContent}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    });
    
    shareTwitter.addEventListener('click', function() {
        const text = `نتيجة مقياس ضغط العمل: ${scorePercent.textContent}% - مستوى الضغط: ${stressLevel.textContent}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    });
    
    shareEmail.addEventListener('click', function() {
        const subject = 'نتائج مقياس ضغط العمل للمعلمات';
        const body = `نتيجة مقياس ضغط العمل: ${scorePercent.textContent}%\nمستوى الضغط: ${stressLevel.textContent}\n\nتحليل المجالات:\n- عبء العمل: ${window.domainsChart.data.datasets[0].data[0]}%\n- العلاقات المهنية: ${window.domainsChart.data.datasets[0].data[1]}%\n- الضغوط النفسية: ${window.domainsChart.data.datasets[0].data[2]}%\n- التكيف مع المتغيرات: ${window.domainsChart.data.datasets[0].data[3]}%`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    });
    
    // Restart button handler
    restartBtn.addEventListener('click', function() {
        // Reset form
        stressForm.reset();
        
        // Reset question navigation
        currentQuestionIndex = 0;
        questions.forEach((question, index) => {
            question.style.display = index === 0 ? 'block' : 'none';
        });
        
        // Update progress indicator
        currentQuestionSpan.textContent = 1;
        progressBar.style.width = `${(1 / totalQuestions) * 100}%`;
        
        // Reset navigation buttons
        prevButton.disabled = true;
        nextButton.style.display = 'block';
        submitBtn.style.display = 'none';
        
        // Hide results and show form
        resultsSection.style.display = 'none';
        stressForm.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Function to analyze stress domains
    function analyzeDomains(answers) {
        const domainScores = {
            workload: 0,
            relationships: 0,
            psychological: 0,
            adaptation: 0
        };
        
        // Calculate score for each domain
        for (const domain in stressDomains) {
            const questions = stressDomains[domain];
            let domainTotal = 0;
            
            questions.forEach(questionIndex => {
                domainTotal += answers[questionIndex - 1];
            });
            
            // Calculate percentage for the domain
            const maxDomainScore = questions.length * 5;
            const domainPercentage = Math.round((domainTotal / maxDomainScore) * 100);
            
            domainScores[domain] = {
                score: domainTotal,
                percentage: domainPercentage,
                maxScore: maxDomainScore
            };
        }
        
        return domainScores;
    }
    
    // Function to generate analysis text
    function generateAnalysis(totalScore, category, domainScores) {
        let analysisText = `<p>درجتك الكلية هي <strong>${totalScore}</strong> من أصل 75، مما يشير إلى مستوى <strong class="${category.color}">${category.name}</strong> من الضغط النفسي المرتبط بالعمل.</p>`;
        
        analysisText += '<p>تحليل مجالات الضغط الرئيسية:</p><ul>';
        
        // Sort domains by percentage (highest first)
        const sortedDomains = Object.entries(domainScores).sort((a, b) => b[1].percentage - a[1].percentage);
        
        // Add domain analysis
        for (const [domain, data] of sortedDomains) {
            let domainName = '';
            let domainDescription = '';
            
            switch (domain) {
                case 'workload':
                    domainName = 'عبء العمل';
                    domainDescription = 'يتعلق بحجم المهام والمسؤوليات وضغط الوقت';
                    break;
                case 'relationships':
                    domainName = 'العلاقات المهنية';
                    domainDescription = 'يتعلق بالتفاعلات مع الزملاء والإدارة وأولياء الأمور';
                    break;
                case 'psychological':
                    domainName = 'الضغوط النفسية';
                    domainDescription = 'يتعلق بالقلق والتوتر والتأثير على الصحة النفسية';
                    break;
                case 'adaptation':
                    domainName = 'التكيف مع المتغيرات';
                    domainDescription = 'يتعلق بالقدرة على التعامل مع التغييرات والمتطلبات الجديدة';
                    break;
            }
            
            let stressLevelText = '';
            let levelClass = '';
            
            if (data.percentage >= 70) {
                stressLevelText = 'مرتفع جدًا';
                levelClass = 'high-stress';
            } else if (data.percentage >= 50) {
                stressLevelText = 'مرتفع';
                levelClass = 'high-stress';
            } else if (data.percentage >= 30) {
                stressLevelText = 'متوسط';
                levelClass = 'medium-stress';
            } else {
                stressLevelText = 'منخفض';
                levelClass = 'low-stress';
            }
            
            analysisText += `<li><strong>${domainName}</strong> (${data.score}/${data.maxScore}): 
                            <span class="${levelClass}">${stressLevelText}</span> - ${domainDescription}</li>`;
        }
        
        analysisText += '</ul>';
        
        return analysisText;
    }
    
    // Function to generate recommendations
    function generateRecommendations(domainScores) {
        let recommendationsText = '<p>بناءً على نتائج التقييم، إليك بعض التوصيات التي قد تساعدك في تقليل مستوى الضغط:</p><ul>';
        
        // Sort domains by percentage (highest first)
        const sortedDomains = Object.entries(domainScores).sort((a, b) => b[1].percentage - a[1].percentage);
        
        // Add top 2 domains recommendations
        const topDomains = sortedDomains.slice(0, 2);
        
        for (const [domain, data] of topDomains) {
            if (data.percentage >= 30) { // Only provide recommendations if stress level is at least moderate
                const domainRecommendations = recommendations[domain];
                
                let domainName = '';
                switch (domain) {
                    case 'workload':
                        domainName = 'لتخفيف عبء العمل';
                        break;
                    case 'relationships':
                        domainName = 'لتحسين العلاقات المهنية';
                        break;
                    case 'psychological':
                        domainName = 'للتعامل مع الضغوط النفسية';
                        break;
                    case 'adaptation':
                        domainName = 'لتعزيز القدرة على التكيف';
                        break;
                }
                
                recommendationsText += `<li><strong>${domainName}:</strong><ul>`;
                
                // Add 2-3 random recommendations from this domain
                const shuffled = [...domainRecommendations].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, Math.min(3, shuffled.length));
                
                selected.forEach(recommendation => {
                    recommendationsText += `<li>${recommendation}</li>`;
                });
                
                recommendationsText += '</ul></li>';
            }
        }
        
        // Add general recommendations
        recommendationsText += `<li><strong>توصيات عامة:</strong><ul>
            <li>ممارسة النشاط البدني بانتظام لتقليل التوتر وتحسين المزاج.</li>
            <li>الحصول على قسط كافٍ من النوم والراحة.</li>
            <li>التواصل مع زملاء العمل لتبادل الخبرات والدعم المتبادل.</li>
            <li>الاهتمام بالتغذية السليمة وشرب كميات كافية من الماء.</li>
        </ul></li>`;
        
        recommendationsText += '</ul>';
        
        // Add note about seeking professional help if needed
        if (sortedDomains[0][1].percentage >= 70) {
            recommendationsText += '<p><strong>ملاحظة مهمة:</strong> إذا كنت تعاني من مستويات عالية من الضغط لفترة طويلة، ننصحك بالتحدث مع مختص في الصحة النفسية للحصول على الدعم المناسب.</p>';
        }
        
        return recommendationsText;
    }

    // Initialize navigation for main nav
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.main-nav li').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link's parent
            this.parentElement.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            document.querySelectorAll('.test-container, .results-container, .history-container').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            document.getElementById(targetId).style.display = 'block';
        });
    });
});
