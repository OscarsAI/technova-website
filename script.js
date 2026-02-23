// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    initParticles();
    
    // 初始化导航栏
    initNavigation();
    
    // 初始化主题切换
    initTheme();
    
    // 初始化数字动画
    initCountUp();
    
    // 初始化表单
    initContactForm();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化动画
    initAnimations();
});

// 主题切换功能
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // 应用保存的主题
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // 添加切换动画
            document.body.style.transition = 'background-color 0.3s ease';
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// 数字滚动动画
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const countObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                countObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(num => countObserver.observe(num));
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 粒子背景配置
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const particleColor = isDark ? "#00d9ff" : "#0099cc";
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particleColor,
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 导航栏功能
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // 导航链接点击处理
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果是移动端，点击后关闭菜单
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
            
            // 更新活动链接
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 滚动时更新活动导航链接
    window.addEventListener('scroll', updateActiveNavLink);
}

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 联系表单处理
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                service: this.querySelector('select').value,
                message: this.querySelector('textarea').value
            };
            
            // 简单的表单验证
            if (!formData.name || !formData.email || !formData.message || !formData.service) {
                showFormMessage('请填写所有必填字段', 'error');
                return;
            }
            
            // 显示提交中状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            // 模拟API调用（实际项目中替换为真实API）
            setTimeout(() => {
                // 显示成功消息
                showFormMessage('咨询已提交！我们的团队将在24小时内联系您。', 'success');
                
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // 添加成功动画
                submitBtn.style.background = 'linear-gradient(90deg, #05ffa1, #00d9ff)';
                setTimeout(() => {
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }
}

// 显示表单消息
function showFormMessage(message, type) {
    // 移除现有消息
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 15px;
        margin-top: 20px;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        background: ${type === 'success' ? 'rgba(5, 255, 161, 0.1)' : 'rgba(255, 42, 109, 0.1)'};
        color: ${type === 'success' ? '#05ffa1' : '#ff2a6d'};
        border: 1px solid ${type === 'success' ? '#05ffa1' : '#ff2a6d'};
    `;
    
    // 添加到表单
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // 5秒后自动移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.opacity = '0';
                messageDiv.style.transition = 'opacity 0.5s ease';
                setTimeout(() => messageDiv.remove(), 500);
            }
        }, 5000);
    }
}

// 滚动效果
function initScrollEffects() {
    // 滚动时显示/隐藏导航栏阴影
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 滚动动画（元素进入视口时触发）
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .tech-column, .pricing-card, .deployment-item');
    animatedElements.forEach(el => observer.observe(el));
}

// 初始化动画
function initAnimations() {
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        
        .tech-column:nth-child(1) { animation-delay: 0.2s; }
        .tech-column:nth-child(2) { animation-delay: 0.3s; }
        .tech-column:nth-child(3) { animation-delay: 0.4s; }
        
        .pricing-card:nth-child(1) { animation-delay: 0.2s; }
        .pricing-card:nth-child(2) { animation-delay: 0.3s; }
        .pricing-card:nth-child(3) { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);
    
    // 电路板动画
    const circuitLines = document.querySelectorAll('.circuit-line');
    circuitLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.3}s`;
    });
    
    // 芯片脉冲动画
    const chipCore = document.querySelector('.chip-core');
    if (chipCore) {
        setInterval(() => {
            chipCore.style.transform = 'scale(1.2)';
            setTimeout(() => {
                chipCore.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
}

// 页面加载完成后显示欢迎消息
window.addEventListener('load', function() {
    console.log('%c🚀 TechNova 网站已加载完成！', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 技术栈：HTML5, CSS3, JavaScript, Particles.js', 'color: #05ffa1; font-size: 14px;');
    console.log('%c👻 设计制作：乾多多AI助手', 'color: #ff2a6d; font-size: 14px;');
});