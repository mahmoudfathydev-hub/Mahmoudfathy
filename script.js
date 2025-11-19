
const menuToggle = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active'); // عشان نعمل الـ X
});



$(document).ready(function() {
  $(document).on('mouseover', '.container_page_1 .column', function(){
      $(this).addClass('active').siblings().removeClass('active');
  });
});




document.addEventListener("scroll", () => {
  const aboutSection = document.querySelector(".about-section");
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.7;

  if (sectionTop < triggerPoint) {
    aboutSection.classList.add("visible");
  }
});






// Wrap letters in .char spans with CSS var --i for delay
document.addEventListener('DOMContentLoaded', () => {
  const waveElems = document.querySelectorAll('.wave-text');

  waveElems.forEach(el => {
    // نحافظ على النص مع المسافات الجديدة
    const text = el.textContent;
    // ننظف المحتوى الأصلي
    el.innerHTML = '';

    // نبني الأحرف ونلصقهم
    let index = 0;
    for (let ch of text) {
      // نحتفظ بالـ spaces كـ &nbsp; داخل span عشان يظهر المسافات
      const span = document.createElement('span');
      span.className = 'char';
      span.style.setProperty('--i', index);
      span.textContent = ch;
      el.appendChild(span);
      index++;
    }

    // لو العنصر يحتوي على عنصر .highlight (اسمك) — لازم نحافظ عليه باللون
    // ولكن لأننا أعِدنا بناء المحتوى بالكامل فوق، محتوى highlight اتكسّر.
    // لذلك: نعالج الـ highlight بالشكل التالي — نبحث عن كلمة الاسم في النص الأصلي
    // ونعمل إعادة تغليف اسمك بـ <span class="highlight">...</span>
    // (نفعل هذا فقط لو الاسم موجود في النص)
    const name = 'Mahmoud Fathy';
    const fullHTML = el.innerHTML;
    // نبحث التسلسل النصي للحروف المجزأة ونعمل استبدال ذكي
    const nameChars = Array.from(name).map(ch => (ch === ' ' ? '\\s' : ch)).join('');
    const nameRegex = new RegExp(nameChars);
    // محاولة بسيطة: لو الاسم في النص الأصلي — نعيد بناء الفقرات بحيث الاسم ملفوف بالـ highlight
    if (text.includes(name)) {
      // نعيد بناء الفقرات بطريقة أبسط: نستبدل اسم في النص الأصلي بنسخة مبدوءة marker
      const parts = text.split(name);
      el.innerHTML = ''; // نعيد تفريغ
      let idx = 0;
      // دالة تساعد تغليف سلسلة نصية إلى spans .char مع الـ index start
      const appendChars = (str) => {
        for (let ch of str) {
          const s = document.createElement('span');
          s.className = 'char';
          s.style.setProperty('--i', idx);
          s.textContent = ch;
          el.appendChild(s);
          idx++;
        }
      };

      // لبناء: جزء قبل الاسم + highlight(الاسم) + جزء بعد الاسم
      appendChars(parts[0]);
      // build highlight container (wrapped chars)
      const highlight = document.createElement('span');
      highlight.className = 'highlight';
      for (let ch of name) {
        const s = document.createElement('span');
        s.className = 'char';
        s.style.setProperty('--i', idx);
        s.textContent = ch;
        highlight.appendChild(s);
        idx++;
      }
      el.appendChild(highlight);
      appendChars(parts[1] || '');
    }

  });
});






document.addEventListener("DOMContentLoaded", () => {
  const meters = document.querySelectorAll(".skill-item");

  function drawFluidMeter(canvas, percentTarget) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    let percent = 0;
    let waveOffset = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2 - 5, 0, Math.PI * 2);
      ctx.clip();

      // background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, w, h);

      // wave
      ctx.beginPath();
      const amplitude = 5;
      const waveLength = 30;
      const waterLevel = h - (percent / 100) * h;
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x++) {
        const y = waterLevel + amplitude * Math.sin((x + waveOffset) / waveLength);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = "#c4151c";
      ctx.fill();

      ctx.restore();

      // outer circle
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2 - 5, 0, Math.PI * 2);
      ctx.strokeStyle = "#c4151c";
      ctx.lineWidth = 4;
      ctx.stroke();

      // text
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px Poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${percent}%`, w / 2, h / 2 + 8);

      waveOffset += 2;
      requestAnimationFrame(draw);
    }

    const interval = setInterval(() => {
      if (percent < percentTarget) percent++;
      else clearInterval(interval);
    }, 25);

    draw();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const canvas = entry.target.querySelector(".fluid-meter");
          const percentTarget = parseInt(entry.target.dataset.skill);
          drawFluidMeter(canvas, percentTarget);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  meters.forEach((item) => observer.observe(item));
});




// Carousel JS
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
const itemWidth = items[0].getBoundingClientRect().width + 16; // +gap

// Move Carousel
function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Next Button
nextBtn.addEventListener('click', () => {
  if(currentIndex < items.length - Math.floor(track.parentElement.offsetWidth / itemWidth)) {
    currentIndex++;
    updateCarousel();
  }
});

// Prev Button
prevBtn.addEventListener('click', () => {
  if(currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});





const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth' // هنا الانيميشن
    });
  });
});




// Back to top functionality
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});