export const triggerConfetti = () => {
  const container = document.createElement("div");
  container.className = "fixed inset-0 pointer-events-none z-50 overflow-hidden";
  document.body.appendChild(container);

  const colors = ["#F472B6", "#C084FC", "#38BDF8", "#FDE047", "#4ADE80", "#FB7185"];
  const shapes = ["🌸", "⭐", "✨", "🎉", "💖", "💫"];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const isEmoji = Math.random() > 0.4;
    const startX = Math.random() * 80 + 10;
    const endX = startX + (Math.random() * 40 - 20);
    const duration = 1.2 + Math.random() * 0.8;
    const delay = Math.random() * 0.2;

    if (isEmoji) {
      particle.innerText = shapes[Math.floor(Math.random() * shapes.length)];
      particle.style.fontSize = `${14 + Math.random() * 14}px`;
    } else {
      const size = 6 + Math.random() * 8;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    particle.style.position = "absolute";
    particle.style.left = `${startX}vw`;
    particle.style.top = `30vh`;
    particle.style.opacity = "1";
    particle.style.transition = `all ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`;

    container.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${endX - startX}vw, ${20 + Math.random() * 40}vh) rotate(${Math.random() * 360}deg) scale(${0.4 + Math.random() * 0.8})`;
      particle.style.opacity = "0";
    });
  }

  setTimeout(() => {
    container.remove();
  }, 2200);
};