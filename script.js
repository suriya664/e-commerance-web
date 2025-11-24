const heroSlides = document.querySelectorAll(".hero .slide");
const prevBtn = document.querySelector(".slider-controls .prev");
const nextBtn = document.querySelector(".slider-controls .next");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
const productList = document.getElementById("productList");
const featuredGrid = document.getElementById("featuredGrid");
const relatedGrid = document.getElementById("relatedGrid");
const categoryList = document.getElementById("categoryList");
const cartRecommendations = document.getElementById("cartRecommendations");

let slideIndex = 0;
const products = [
  {
    title: "Wireless Earbuds",
    price: 89,
    discount: "15% off",
    img: "https://media.istockphoto.com/id/2182334888/photo/white-wireless-headphones-new-earphones-on-black-background-new-technologies.jpg?s=612x612&w=0&k=20&c=YhDNykQDPe0XyPV3IMq2skH1J1Jf7jeptt8vekwEqnU="
  },
  {
    title: "Smart Watch",
    price: 149,
    discount: "10% off",
    img: "https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg"
  },
  {
    title: "Gaming Laptop",
    price: 1299,
    discount: "20% off",
    img: "https://images.pexels.com/photos/15919234/pexels-photo-15919234.jpeg"
  },
  {
    title: "Running Shoes",
    price: 120,
    discount: "5% off",
    img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  },
  {
    title: "Designer Bag",
    price: 250,
    discount: "12% off",
    img: "https://images.pexels.com/photos/3761552/pexels-photo-3761552.jpeg"
  },
  {
    title: "4K Smart TV",
    price: 799,
    discount: "18% off",
    img: "https://media.istockphoto.com/id/930273490/photo/led-or-lcd-internet-tv-monitor.jpg?s=612x612&w=0&k=20&c=XznaMI1IzaxVWPDCup8EDOhdrwNkweGjcph98DuTC6c="
  }
];

function renderCards(target) {
  if (!target) return;
  target.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.img}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">$${product.price} <span class="discount">${product.discount}</span></p>
        <div class="actions">
          <button>Add to Cart</button>
          <button class="ghost">Wishlist</button>
        </div>
      </article>`
    )
    .join("");
}

renderCards(productList);
renderCards(featuredGrid);
renderCards(relatedGrid);
renderCards(categoryList);
renderCards(cartRecommendations);

function showSlide(index) {
  if (!heroSlides.length) return;
  heroSlides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === index);
  });
}

function moveSlide(offset) {
  if (!heroSlides.length) return;
  slideIndex = (slideIndex + offset + heroSlides.length) % heroSlides.length;
  showSlide(slideIndex);
  updateIndicators();
}

function updateIndicators() {
  const sliderIndicators = document.querySelectorAll(".slider-indicators span");
  if (sliderIndicators.length) {
    sliderIndicators.forEach((indicator, idx) => {
      indicator.classList.toggle("active", idx === slideIndex);
    });
  }
}

if (prevBtn && nextBtn && heroSlides.length) {
  prevBtn.addEventListener("click", () => moveSlide(-1));
  nextBtn.addEventListener("click", () => moveSlide(1));
  setInterval(() => moveSlide(1), 5000);
}

// Slider Indicators
const sliderIndicators = document.querySelectorAll(".slider-indicators span");
if (sliderIndicators.length && heroSlides.length) {
  sliderIndicators.forEach((indicator, idx) => {
    indicator.addEventListener("click", () => {
      slideIndex = idx;
      showSlide(slideIndex);
      updateIndicators();
    });
  });
  updateIndicators(); // Initialize indicators
}

const suggestions = [
  "Smartphone",
  "Sneakers",
  "Laptop",
  "Kitchen",
  "Headphones",
  "Smartwatch"
];

if (searchInput && searchSuggestions) {
  searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      searchSuggestions.style.display = "none";
      return;
    }

    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(value)
    );

    if (!filtered.length) {
      searchSuggestions.style.display = "none";
      return;
    }

    searchSuggestions.innerHTML = filtered
      .map((item) => `<span>${item}</span>`)
      .join("");
    searchSuggestions.style.display = "flex";
  });

  searchSuggestions.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
      searchInput.value = event.target.textContent;
      searchSuggestions.style.display = "none";
    }
  });
}

// Price Range Slider
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

if (priceRange && priceValue) {
  priceRange.addEventListener("input", (event) => {
    const value = event.target.value;
    priceValue.textContent = `$${value}`;
  });
}

// Pagination
const paginationButtons = document.querySelectorAll(".pagination button, .pagination span");
paginationButtons.forEach((btn) => {
  if (btn.tagName === "SPAN" && !btn.classList.contains("active")) {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pagination span").forEach((span) => {
        span.classList.remove("active");
      });
      btn.classList.add("active");
    });
  }
});

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const navLinks = document.querySelectorAll(".top-nav nav a");
  
  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPath = new URL(link.href).pathname;
    const linkHash = new URL(link.href).hash;
    
    // Check if it's the current page
    if (currentPath.includes(linkPath.split('/').pop()) || 
        (currentHash && linkHash === currentHash)) {
      link.classList.add("active");
    }
  });
}

// Run on page load
setActiveNavLink();

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('mobile-open');
    mobileMenuToggle.textContent = mainNav.classList.contains('mobile-open') ? '✕' : '☰';
  });

  // Close menu when clicking on a nav link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('mobile-open');
      mobileMenuToggle.textContent = '☰';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mainNav.classList.remove('mobile-open');
      mobileMenuToggle.textContent = '☰';
    }
  });
}

