// 1. Mở / đóng menu hamburger trên màn hình nhỏ.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// 2. Đóng menu sau khi người dùng chọn một liên kết.
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// 3. Đổi dark/light mode và lưu lựa chọn vào trình duyệt.
const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") document.documentElement.dataset.theme = "light";
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  document.documentElement.dataset.theme = isLight ? "dark" : "light";
  localStorage.setItem("theme", isLight ? "dark" : "light");
  updateThemeIcon();
});

function updateThemeIcon() {
  themeToggle.innerHTML =
    document.documentElement.dataset.theme === "light"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
}

// 4. Tìm kiếm và lọc dự án theo nội dung hoặc tag.
const searchInput = document.querySelector("#projectSearch");
const filterSelect = document.querySelector("#projectFilter");
const projectCards = document.querySelectorAll(".project-card");
const emptyMessage = document.querySelector("#emptyMessage");

function filterProjects() {
  const keyword = searchInput.value.toLowerCase().trim();
  const selectedTag = filterSelect.value;
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    const tags = card.dataset.tags;
    const matchesKeyword = cardText.includes(keyword);
    const matchesTag = selectedTag === "all" || tags.includes(selectedTag);
    const isVisible = matchesKeyword && matchesTag;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProjects);
filterSelect.addEventListener("change", filterProjects);

// 5. Đếm số ký tự đã nhập trong textarea.
const messageInput = document.querySelector("#message");
const charCount = document.querySelector("#charCount");

messageInput.addEventListener("input", () => {
  charCount.textContent = `${messageInput.value.length}/300`;
});

// 6. Kiểm tra nhiều điều kiện trước khi gửi form.
const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullname = document.querySelector("#fullname").value.trim();
  const email = document.querySelector("#email").value.trim();
  const subject = document.querySelector("#subject").value;
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  document.querySelectorAll(".error").forEach((error) => {
    error.textContent = "";
  });
  if (fullname.length < 2) {
    document.querySelector("#fullnameError").textContent =
      "Họ tên phải có ít nhất 2 ký tự.";
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    document.querySelector("#emailError").textContent =
      "Email chưa đúng định dạng.";
    isValid = false;
  }
  if (!subject) {
    document.querySelector("#subjectError").textContent =
      "Vui lòng chọn chủ đề.";
    isValid = false;
  }
  if (message.length < 10) {
    document.querySelector("#messageError").textContent =
      "Nội dung phải có ít nhất 10 ký tự.";
    isValid = false;
  }
  const status = document.querySelector("#formStatus");
  if (isValid) {
    status.textContent = "Gửi thành công! Cảm ơn bạn đã liên hệ.";
    contactForm.reset();
    charCount.textContent = "0/300";
  } else status.textContent = "Vui lòng sửa các thông tin chưa hợp lệ.";
});

// 7. Hiện các phần tử khi chúng xuất hiện trong màn hình.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

// 8. Tự động hiển thị năm hiện tại ở footer.
document.querySelector("#currentYear").textContent = new Date().getFullYear();
