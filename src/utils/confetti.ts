export const triggerConfetti = () => {
  const colors = ["#F472B6", "#C084FC", "#67E8F9", "#FDE047", "#A7F3D0"];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 6;
    const startX = window.innerWidth / 2 + (Math.random() * 200 - 100);
    const startY = window.innerHeight * 0.3;

    particle.style.position = "fixed";
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.opacity = "1";
    particle.style.transition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)";
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(particle);

    const destX = startX + (Math.random() * 400 - 200);
    const destY = startY + Math.random() * 300 + 50;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${destX - startX}px, ${destY - startY}px) rotate(${
        Math.random() * 720
      }deg)`;
      particle.style.opacity = "0";
    });

    setTimeout(() => {
      particle.remove();
    }, 1100);
  }
};