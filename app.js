// ===== CYBERVAULT - APP.JS =====

// ===== DATA =====
const PRODUCTS = [
    { id: 1, name: "VulnScanner Pro", desc: "Scanner avançado de vulnerabilidades para redes e aplicações web. Detecta CVEs, configurações inseguras e falhas de OWASP Top 10.", version: "4.2.1", compat: "Linux, Windows", price: 0, rating: 4.8, reviews: 342, category: "vuln-analysis", badge: "free", icon: "fa-bug", color: "#00ff88" },
    { id: 2, name: "NetWatch Monitor", desc: "Sistema de monitoramento de rede em tempo real. Alertas de intrusão, tráfego suspeito e anomalias de comportamento.", version: "3.1.0", compat: "Linux", price: 89, rating: 4.6, reviews: 187, category: "monitoring", badge: "popular", icon: "fa-eye", color: "#00d4ff" },
    { id: 3, name: "CTF Toolkit", desc: "Kit completo para competições CTF. Inclui ferramentas de criptografia, steganografia, engenharia reversa e forense.", version: "2.5.0", compat: "Linux (Kali, Ubuntu)", price: 0, rating: 4.9, reviews: 521, category: "lab-ctf", badge: "popular", icon: "fa-flag", color: "#a855f7" },
    { id: 4, name: "LogAnalyzer AI", desc: "Análise inteligente de logs com IA. Correlaciona eventos, detecta padrões de ataque e gera relatórios automáticos.", version: "1.8.3", compat: "Linux, Cloud", price: 149, rating: 4.7, reviews: 98, category: "log-analysis", badge: "new", icon: "fa-file-lines", color: "#ff8800" },
    { id: 5, name: "WebShield", desc: "Proteção de aplicações web (WASP). Firewall de aplicações, proteção contra SQL injection, XSS e CSRF.", version: "5.0.2", compat: "Linux, Docker", price: 199, rating: 4.5, reviews: 156, category: "app-security", icon: "fa-shield-halved", color: "#ff3366" },
    { id: 6, name: "FirewallDefender", desc: "Firewall defensivo avançado com regras inteligentes, geo-blocking e proteção DDoS de camada 7.", version: "3.3.1", compat: "Linux, FreeBSD", price: 129, rating: 4.4, reviews: 203, category: "defensive", icon: "fa-fire", color: "#00ff88" },
    { id: 7, name: "SysAdmin Suite", desc: "Suíte completa para administradores: gestão de usuários, auditoria de acessos, backup automático e patch management.", version: "2.1.0", compat: "Linux, Windows", price: 79, rating: 4.3, reviews: 178, category: "sysadmin", icon: "fa-server", color: "#00d4ff" },
    { id: 8, name: "PacketInspector", desc: "Inspector de pacotes de rede com decodificação profunda de protocolos. Suporte a TLS 1.3 e análise de tráfego cifrado.", version: "4.0.0", compat: "Linux, macOS", price: 0, rating: 4.8, reviews: 412, category: "monitoring", badge: "free", icon: "fa-network-wired", color: "#a855f7" },
    { id: 9, name: "HashCrack Lab", desc: "Ferramenta educacional para laboratório de criptografia. Testa resistência de hashes em ambiente controlado.", version: "1.2.0", compat: "Linux", price: 0, rating: 4.6, reviews: 289, category: "lab-ctf", badge: "free", icon: "fa-key", color: "#ff8800" },
    { id: 10, name: "CloudSec Scanner", desc: "Scanner de segurança para ambientes cloud (AWS, Azure, GCP). Verifica configurações, permissões e compliance.", version: "2.4.1", compat: "Linux, Cloud", price: 249, rating: 4.7, reviews: 87, category: "vuln-analysis", badge: "new", icon: "fa-cloud", color: "#00ff88" },
    { id: 11, name: "IncidentResponse Kit", desc: "Kit de resposta a incidentes. Coleta de evidências, análise forense e recuperação de sistemas comprometidos.", version: "1.5.0", compat: "Linux", price: 169, rating: 4.5, reviews: 134, category: "defensive", icon: "fa-bolt", color: "#ff3366" },
    { id: 12, name: "API Security Gate", desc: "Gateway de segurança para APIs. Validação de tokens, rate limiting, detecção de abuso e monitoramento.", version: "3.0.0", compat: "Linux, Docker, K8s", price: 179, rating: 4.6, reviews: 92, category: "app-security", icon: "fa-code", color: "#00d4ff" },
];

const CATEGORIES = [
    { id: "vuln-analysis", name: "Análise de Vulnerabilidades", icon: "fa-bug", desc: "Scanner e detecção de falhas", color: "#00ff88" },
    { id: "monitoring", name: "Monitoramento de Segurança", icon: "fa-eye", desc: "Monitoramento de rede e sistemas", color: "#00d4ff" },
    { id: "lab-ctf", name: "Laboratório / CTF", icon: "fa-flag", desc: "Ferramentas para estudo e competições", color: "#a855f7" },
    { id: "log-analysis", name: "Análise de Logs", icon: "fa-file-lines", desc: "Análise e correlação de eventos", color: "#ff8800" },
    { id: "app-security", name: "Segurança de Aplicações", icon: "fa-shield-halved", desc: "Proteção de web apps e APIs", color: "#ff3366" },
    { id: "defensive", name: "Ferramentas Defensivas", icon: "fa-fire", desc: "Firewall, IPS e proteção", color: "#00ff88" },
    { id: "sysadmin", name: "Administradores de Sistemas", icon: "fa-server", desc: "Gestão e auditoria de sistemas", color: "#00d4ff" },
];

let cart = JSON.parse(localStorage.getItem('cv_cart') || '[]');
let currentUser = JSON.parse(localStorage.getItem('cv_user') || 'null');
let adminLogs = [];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 2500);
    
    // Initialize admin user
    initAdminUser();
    
    renderFeatured();
    renderCategories();
    renderCatalog();
    updateCartCount();
    updateUserUI();
    animateStats();
    initMatrixRain();
});

function initAdminUser() {
    const adminEmail = 'dohypemeno5@gmail.com';
    const adminPass = 'sl007';
    let users = JSON.parse(localStorage.getItem('cv_users') || '[]');
    
    // Remove any existing admin without password
    users = users.filter(u => !(u.email === adminEmail && !u.password));
    
    // Check if admin exists with password
    const adminExists = users.find(u => u.email === adminEmail && u.password === adminPass);
    if (!adminExists) {
        // Remove old entry if exists
        users = users.filter(u => u.email !== adminEmail);
        // Add new admin
        users.push({ name: 'Admin', email: adminEmail, password: adminPass, isAdmin: true });
        localStorage.setItem('cv_users', JSON.stringify(users));
    } else {
        // Make sure admin is always admin
        adminExists.isAdmin = true;
        localStorage.setItem('cv_users', JSON.stringify(users));
    }
}

// ===== MATRIX RAIN =====
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('matrixRain');
    if (!container) return;
    container.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px JetBrains Mono`;
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 50);
}

// ===== ANIMATE STATS =====
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
        }, 30);
    });
}

// ===== NAVIGATION =====
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('active');
    window.scrollTo(0, 0);
    if (page === 'catalog') renderCatalog();
    if (page === 'cart') renderCart();
    if (page === 'dashboard') renderDashboard();
    if (page === 'purchases') renderPurchases();
    if (page === 'admin') renderAdmin();
    if (page === 'docs') renderDocs('getting-started');
    if (page === 'support') renderSupport();
    if (page === 'terms') renderTerms();
    if (!currentUser && ['dashboard', 'purchases', 'admin', 'checkout'].includes(page)) {
        showModal('login');
        showPage('home');
    }
}

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('show');
}

function toggleUserDropdown() {
    document.getElementById('userDropdown').classList.toggle('show');
}

// ===== RENDER FUNCTIONS =====
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = PRODUCTS.filter(p => p.badge === 'popular' || p.badge === 'new').slice(0, 6).map(p => productCard(p)).join('');
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = CATEGORIES.map(c => `
        <div class="category-card" onclick="filterByCategory('${c.id}')">
            <div class="category-icon" style="background:${c.color}22; color:${c.color}">
                <i class="fas ${c.icon}"></i>
            </div>
            <div><h3>${c.name}</h3><p>${c.desc}</p></div>
        </div>
    `).join('');
    const filters = document.getElementById('categoryFilters');
    if (filters) {
        filters.innerHTML = `<label class="filter-option"><input type="checkbox" checked onchange="filterProducts()"> Todas</label>` +
            CATEGORIES.map(c => `<label class="filter-option"><input type="checkbox" value="${c.id}" onchange="filterProducts()"> ${c.name}</label>`).join('');
    }
}

function renderCatalog(products = PRODUCTS) {
    const grid = document.getElementById('catalogResults');
    if (!grid) return;
    grid.innerHTML = products.length ? products.map(p => productCard(p)).join('') :
        '<div class="cart-empty"><i class="fas fa-search"></i><p>Nenhuma ferramenta encontrada</p></div>';
}

function productCard(p) {
    return `
    <div class="product-card" onclick="showProduct(${p.id})">
        <div class="product-card-header">
            <div class="product-icon" style="background:${p.color}22; color:${p.color}">
                <i class="fas ${p.icon}"></i>
            </div>
            ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'free' ? 'Grátis' : p.badge === 'new' ? 'Novo' : 'Popular'}</span>` : ''}
        </div>
        <div class="product-card-body">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="product-meta">
                <span><i class="fas fa-code-branch"></i> v${p.version}</span>
                <span><i class="fas fa-desktop"></i> ${p.compat}</span>
            </div>
        </div>
        <div class="product-card-footer">
            <div class="product-price ${p.price === 0 ? 'free' : ''}">${p.price === 0 ? 'Grátis' : `R$ ${p.price}`}</div>
            <div class="product-rating"><i class="fas fa-star"></i> ${p.rating} (${p.reviews})</div>
        </div>
    </div>`;
}

function showProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const container = document.getElementById('productDetail');
    container.innerHTML = `
    <div class="product-detail">
        <div class="pd-main">
            <div class="pd-header">
                <span class="pd-category">${CATEGORIES.find(c => c.id === p.category)?.name || ''}</span>
                <h1>${p.name}</h1>
            </div>
            <div class="pd-section">
                <h3>Descrição</h3><p>${p.desc}</p>
            </div>
            <div class="pd-section">
                <h3>Funcionalidades</h3>
                <ul class="pd-features">
                    <li><i class="fas fa-check"></i> Atualizações gratuitas incluídas</li>
                    <li><i class="fas fa-check"></i> Suporte técnico por 12 meses</li>
                    <li><i class="fas fa-check"></i> Documentação completa</li>
                    <li><i class="fas fa-check"></i> Licença para uso autorizado</li>
                </ul>
            </div>
            <div class="pd-section">
                <h3>Requisitos do Sistema</h3>
                <p>${p.compat}</p>
            </div>
        </div>
        <div class="pd-sidebar">
            <div class="pd-price">${p.price === 0 ? 'Grátis' : `R$ ${p.price}`}</div>
            <div class="pd-info">
                <div class="pd-info-row"><span>Versão</span><span>v${p.version}</span></div>
                <div class="pd-info-row"><span>Compatibilidade</span><span>${p.compat}</span></div>
                <div class="pd-info-row"><span>Avaliação</span><span>⭐ ${p.rating} (${p.reviews} reviews)</span></div>
                <div class="pd-info-row"><span>Licença</span><span>Uso autorizado</span></div>
            </div>
            <button class="btn btn-primary btn-full" onclick="addToCart(${p.id})">
                <i class="fas fa-cart-plus"></i> ${p.price === 0 ? 'Baixar Grátis' : 'Adicionar ao Carrinho'}
            </button>
            <div class="pd-screenshot">
                <i class="fas fa-image" style="font-size:32px;margin-bottom:8px;display:block"></i>
                Preview da ferramenta
            </div>
        </div>
    </div>`;
    showPage('product');
}

// ===== FILTER =====
function filterProducts() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('input[name="price"]:checked')?.value || 'all';
    const sort = document.getElementById('sortSelect')?.value || 'popular';
    let filtered = PRODUCTS.filter(p => {
        if (search && !p.name.toLowerCase().includes(search) && !p.desc.toLowerCase().includes(search)) return false;
        if (priceFilter === 'free' && p.price !== 0) return false;
        if (priceFilter === '0-50' && (p.price < 0 || p.price > 50)) return false;
        if (priceFilter === '50-200' && (p.price < 50 || p.price > 200)) return false;
        if (priceFilter === '200+' && p.price < 200) return false;
        return true;
    });
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);
    renderCatalog(filtered);
}

function filterByCategory(catId) {
    showPage('catalog');
    const cb = document.querySelector(`input[value="${catId}"]`);
    if (cb) cb.checked = true;
    renderCatalog(PRODUCTS.filter(p => p.category === catId));
}

// ===== CART =====
function addToCart(id) {
    if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('cv_cart', JSON.stringify(cart));
        updateCartCount();
        showToast('Produto adicionado ao carrinho!');
    } else {
        showToast('Produto já está no carrinho', 'warning');
    }
}

function removeFromCart(id) {
    cart = cart.filter(x => x !== id);
    localStorage.setItem('cv_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function renderCart() {
    const items = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    if (!items || !summary) return;
    if (cart.length === 0) {
        items.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Seu carrinho está vazio</p></div>';
        summary.innerHTML = '';
        return;
    }
    const products = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const total = products.reduce((sum, p) => sum + p.price, 0);
    items.innerHTML = products.map(p => `
        <div class="cart-item">
            <div class="cart-item-info"><h3>${p.name}</h3><p>v${p.version}</p></div>
            <div class="cart-item-actions">
                <span class="cart-item-price">${p.price === 0 ? 'Grátis' : `R$ ${p.price}`}</span>
                <button class="cart-remove" onclick="removeFromCart(${p.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    summary.innerHTML = `
        <h3>Resumo do Pedido</h3>
        ${products.map(p => `<div class="pd-info-row"><span>${p.name}</span><span>${p.price === 0 ? 'Grátis' : `R$ ${p.price}`}</span></div>`).join('')}
        <div class="cart-total"><span>Total</span><span>R$ ${total}</span></div>
        <button class="btn btn-primary btn-full" onclick="showPage('checkout')">
            <i class="fas fa-lock"></i> Finalizar Compra
        </button>`;
}

function renderCheckoutSummary() {
    const el = document.getElementById('checkoutSummary');
    if (!el) return;
    const products = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const total = products.reduce((sum, p) => sum + p.price, 0);
    el.innerHTML = `<h3 style="margin-bottom:20px">Resumo</h3>
        ${products.map(p => `<div class="pd-info-row"><span>${p.name}</span><span>${p.price === 0 ? 'Grátis' : `R$ ${p.price}`}</span></div>`).join('')}
        <div class="cart-total"><span>Total</span><span>R$ ${total}</span></div>`;
}

function processCheckout(e) {
    e.preventDefault();
    if (!currentUser) { showModal('login'); return; }
    const products = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const purchase = { id: Date.now(), date: new Date().toISOString(), items: products, total: products.reduce((s, p) => s + p.price, 0) };
    const purchases = JSON.parse(localStorage.getItem('cv_purchases') || '[]');
    purchases.push(purchase);
    localStorage.setItem('cv_purchases', JSON.stringify(purchases));
    cart = [];
    localStorage.setItem('cv_cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Compra realizada com sucesso!');
    addLog('Compra', `Pedido #${purchase.id} processado`);
    showPage('purchases');
}

// ===== AUTH =====
function showModal(type) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (type === 'login') {
        content.innerHTML = `
        <h2><i class="fas fa-sign-in-alt" style="color:var(--neon-green)"></i> Login</h2>
        <form onsubmit="login(event)">
            <div class="form-group"><label>E-mail</label><input type="email" id="loginEmail" required placeholder="seu@email.com"></div>
            <div class="form-group"><label>Senha</label><input type="password" id="loginPass" required placeholder="••••••••"></div>
            <button type="submit" class="btn btn-primary btn-full">Entrar</button>
            <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--text-muted)">
                Não tem conta? <a href="#" onclick="showModal('register')">Cadastre-se</a>
            </p>
        </form>`;
    } else if (type === 'register') {
        content.innerHTML = `
        <h2><i class="fas fa-user-plus" style="color:var(--neon-green)"></i> Cadastro</h2>
        <form onsubmit="register(event)">
            <div class="form-group"><label>Nome</label><input type="text" id="regName" required placeholder="Seu nome"></div>
            <div class="form-group"><label>E-mail</label><input type="email" id="regEmail" required placeholder="seu@email.com"></div>
            <div class="form-group"><label>Senha</label><input type="password" id="regPass" required placeholder="••••••••"></div>
            <button type="submit" class="btn btn-primary btn-full">Criar Conta</button>
            <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--text-muted)">
                Já tem conta? <a href="#" onclick="showModal('login')">Entrar</a>
            </p>
        </form>`;
    }
    overlay.classList.add('show');
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); }

function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
        currentUser = user;
    } else {
        // Check if email exists but wrong password
        const emailExists = users.find(u => u.email === email);
        if (emailExists) {
            showToast('Senha incorreta!', 'error');
            return;
        }
        currentUser = { name: email.split('@')[0], email, password: pass, isAdmin: false };
        users.push(currentUser);
        localStorage.setItem('cv_users', JSON.stringify(users));
    }
    localStorage.setItem('cv_user', JSON.stringify(currentUser));
    updateUserUI();
    closeModal();
    showToast(`Bem-vindo, ${currentUser.name}!`);
    addLog('Auth', `Login: ${email}`);
}

function register(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    currentUser = { name, email, isAdmin: false };
    const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
    users.push(currentUser);
    localStorage.setItem('cv_users', JSON.stringify(users));
    localStorage.setItem('cv_user', JSON.stringify(currentUser));
    updateUserUI();
    closeModal();
    showToast(`Conta criada! Bem-vindo, ${name}!`);
    addLog('Auth', `Registro: ${email}`);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('cv_user');
    updateUserUI();
    showPage('home');
    showToast('Logout realizado');
}

function updateUserUI() {
    if (currentUser) {
        document.getElementById('authButtons').style.display = 'none';
        document.getElementById('userActions').style.display = 'block';
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('adminLink').style.display = currentUser.isAdmin ? 'block' : 'none';
    } else {
        document.getElementById('authButtons').style.display = 'block';
        document.getElementById('userActions').style.display = 'none';
        document.getElementById('userName').textContent = 'Entrar';
    }
}

// ===== DASHBOARD =====
function renderDashboard() {
    const el = document.getElementById('dashboardContent');
    if (!el || !currentUser) return;
    const purchases = JSON.parse(localStorage.getItem('cv_purchases') || '[]');
    el.innerHTML = `
        <div class="dash-card"><h3>Nome</h3><div class="dash-value" style="font-size:20px">${currentUser.name}</div></div>
        <div class="dash-card"><h3>E-mail</h3><div class="dash-value" style="font-size:16px">${currentUser.email}</div></div>
        <div class="dash-card"><h3>Compras</h3><div class="dash-value">${purchases.length}</div></div>
        <div class="dash-card"><h3>Ferramentas</h3><div class="dash-value">${purchases.reduce((s, p) => s + p.items.length, 0)}</div></div>`;
}

// ===== PURCHASES =====
function renderPurchases() {
    const el = document.getElementById('purchasesList');
    if (!el || !currentUser) return;
    const purchases = JSON.parse(localStorage.getItem('cv_purchases') || '[]');
    if (purchases.length === 0) {
        el.innerHTML = '<div class="cart-empty"><i class="fas fa-download"></i><p>Nenhuma compra realizada</p></div>';
        return;
    }
    el.innerHTML = purchases.map(p => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h3>Pedido #${p.id}</h3>
                <p>${new Date(p.date).toLocaleDateString('pt-BR')} - ${p.items.map(i => i.name).join(', ')}</p>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-price">R$ ${p.total}</span>
                <button class="btn btn-primary btn-sm" onclick="showToast('Download iniciado!')"><i class="fas fa-download"></i></button>
            </div>
        </div>
    `).join('');
}

// ===== ADMIN =====
function renderAdmin() {
    if (!currentUser || !currentUser.isAdmin) { showPage('home'); return; }
    showAdminTab('products');
}

function showAdminTab(tab) {
    document.querySelectorAll('.admin-nav').forEach(n => n.classList.remove('active'));
    event?.target?.classList.add('active');
    const el = document.getElementById('adminContent');
    if (tab === 'products') {
        el.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h3>Produtos (${PRODUCTS.length})</h3>
                <button class="btn btn-primary btn-sm" onclick="showToast('Formulário de cadastro em breve!')"><i class="fas fa-plus"></i> Novo</button>
            </div>
            <table class="admin-table">
                <tr><th>ID</th><th>Nome</th><th>Preço</th><th>Categoria</th><th>Ações</th></tr>
                ${PRODUCTS.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>R$ ${p.price}</td><td>${p.category}</td>
                    <td><button class="btn btn-sm btn-outline" onclick="showToast('Editando ${p.name}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="showToast('Removido!','error')"><i class="fas fa-trash"></i></button></td></tr>`).join('')}
            </table>`;
    } else if (tab === 'users') {
        const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
        el.innerHTML = `
            <h3 style="margin-bottom:20px">Usuários (${users.length})</h3>
            <table class="admin-table">
                <tr><th>Nome</th><th>E-mail</th><th>Admin</th><th>Ações</th></tr>
                ${users.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.isAdmin ? '✅' : '❌'}</td>
                    <td><button class="btn btn-sm btn-outline" onclick="toggleAdmin('${u.email}')"><i class="fas fa-user-shield"></i></button></td></tr>`).join('')}
            </table>`;
    } else if (tab === 'orders') {
        const purchases = JSON.parse(localStorage.getItem('cv_purchases') || '[]');
        el.innerHTML = `
            <h3 style="margin-bottom:20px">Pedidos (${purchases.length})</h3>
            <table class="admin-table">
                <tr><th>ID</th><th>Data</th><th>Itens</th><th>Total</th></tr>
                ${purchases.map(p => `<tr><td>#${p.id}</td><td>${new Date(p.date).toLocaleDateString('pt-BR')}</td>
                    <td>${p.items.map(i => i.name).join(', ')}</td><td>R$ ${p.total}</td></tr>`).join('')}
            </table>`;
    } else if (tab === 'reviews') {
        el.innerHTML = `<h3 style="margin-bottom:20px">Avaliações</h3><p style="color:var(--text-muted)">Sistema de avaliações em desenvolvimento.</p>`;
    } else if (tab === 'logs') {
        el.innerHTML = `<h3 style="margin-bottom:20px">Logs de Atividade</h3>
            <table class="admin-table">
                <tr><th>Data</th><th>Tipo</th><th>Detalhes</th></tr>
                ${adminLogs.map(l => `<tr><td>${l.date}</td><td>${l.type}</td><td>${l.detail}</td></tr>`).join('')}
            </table>`;
    }
}

function toggleAdmin(email) {
    const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
    const user = users.find(u => u.email === email);
    if (user) { user.isAdmin = !user.isAdmin; localStorage.setItem('cv_users', JSON.stringify(users)); }
    showAdminTab('users');
}

function addLog(type, detail) {
    adminLogs.push({ date: new Date().toLocaleString('pt-BR'), type, detail });
}

// ===== DOCS =====
function renderDocs(tab) {
    document.querySelectorAll('.docs-nav').forEach(n => n.classList.remove('active'));
    document.querySelector(`.docs-nav[onclick*="${tab}"]`)?.classList.add('active');
    const el = document.getElementById('docsContent');
    const docs = {
        'getting-started': `<h2>Início Rápido</h2>
            <p>Bem-vindo ao CyberVault! Este guia ajuda você a começar a usar as ferramentas de segurança disponíveis na plataforma.</p>
            <h3>1. Crie sua conta</h3><p>Registre-se com seu e-mail e senhas seguras. Verifique seu e-mail para ativar a conta.</p>
            <h3>2. Explore o catálogo</h3><p>Navegue pelas categorias ou use a busca para encontrar a ferramenta ideal.</p>
            <h3>3. Adquira e baixe</h3><p>Após a compra, acesse "Minhas Compras" para fazer o download.</p>`,
        'installation': `<h2>Instalação</h2>
            <h3>Linux (Debian/Ubuntu)</h3><pre>sudo apt update
sudo apt install ./cybervault-tool.deb</pre>
            <h3>Linux (Arch)</h3><pre>sudo pacman -U cybervault-tool.pkg.tar.zst</pre>
            <h3>Docker</h3><pre>docker pull cybervault/tool:latest
docker run -it cybervault/tool</pre>`,
        'api': `<h2>API Reference</h2>
            <h3>Autenticação</h3><pre>curl -H "Authorization: Bearer YOUR_TOKEN" \\
     https://api.cybervault.com/v1/tools</pre>
            <h3>Listar Ferramentas</h3><pre>GET /v1/tools
GET /v1/tools/:id
GET /v1/tools?category=vuln-analysis</pre>
            <h3>Download</h3><pre>GET /v1/tools/:id/download</pre>`,
        'guides': `<h2>Guias</h2>
            <h3>Análise de Vulnerabilidades Autorizada</h3><p>Como conduzir assessments de segurança de forma ética e legal.</p>
            <h3>Configuração de Monitoramento</h3><p>Passo a passo para configurar monitoramento de rede defensivo.</p>
            <h3>Preparação para CTF</h3><p>Dicas e ferramentas para competições Capture The Flag.</p>`,
        'faq': `<h2>FAQ</h2>
            <h3>As ferramentas são legais?</h3><p>Sim! Todas as ferramentas são para uso autorizado em sistemas próprios ou com permissão.</p>
            <h3>Posso usar em produção?</h3><p>Sim, com as devidas autorizações e em conformidade com as leis aplicáveis.</p>
            <h3>Como obter suporte?</h3><p>Acesse a página de Suporte ou abra um ticket.</p>`,
    };
    el.innerHTML = docs[tab] || '<p>Documentação em construção.</p>';
}

function showDocsTab(tab) { renderDocs(tab); }

// ===== SUPPORT =====
function renderSupport() {
    document.getElementById('supportContent').innerHTML = `
        <div class="support-card"><i class="fas fa-envelope"></i><h3>E-mail</h3><p>suporte@cybervault.com</p></div>
        <div class="support-card"><i class="fas fa-comments"></i><h3>Chat ao Vivo</h3><p>Disponível 24/7</p></div>
        <div class="support-card"><i class="fas fa-ticket"></i><h3>Tickets</h3><p>Abra um chamado</p></div>
        <div class="support-card"><i class="fas fa-book"></i><h3>Documentação</h3><p>Guias e tutoriais</p></div>
        <div class="support-card"><i class="fas fa-users"></i><h3>Comunidade</h3><p>Forum e discussões</p></div>
        <div class="support-card"><i class="fas fa-video"></i><h3>Tutoriais</h3><p>Vídeos e webinars</p></div>`;
}

// ===== TERMS =====
function renderTerms() {
    document.getElementById('termsContent').innerHTML = `
        <h2>Termos de Serviço</h2>
        <p><strong>Última atualização:</strong> Janeiro 2026</p>
        <h2>1. Uso Autorizado</h2>
        <p>Todas as ferramentas disponíveis no CyberVault são destinadas exclusivamente para uso em sistemas próprios ou com autorização expressa e documentada do proprietário do sistema.</p>
        <h2>2. Proibições</h2>
        <p>É estritamente proibido o uso das ferramentas para:</p>
        <ul><li>Ataques não autorizados a sistemas de terceiros</li><li>Violação de privacidade e dados pessoais</li><li>Atividades criminosas conforme Art. 154-A do Código Penal</li><li>Engenharia reversa de software protegido</li></ul>
        <h2>3. Responsabilidade</h2>
        <p>O usuário é inteiramente responsável pelo uso que faz das ferramentas adquiridas. O CyberVault não se responsabiliza por uso indevido.</p>
        <h2>4. Política de Reembolso</h2>
        <p>Reembolso em até 7 dias após a compra, desde que a ferramenta não tenha sido baixada.</p>
        <h2>5. Privacidade</h2>
        <p>Dados dos usuários são protegidos conforme a LGPD (Lei Geral de Proteção de Dados).</p>`;
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Close dropdown on outside click
document.addEventListener('click', e => {
    if (!e.target.closest('.user-menu')) document.getElementById('userDropdown')?.classList.remove('show');
});
