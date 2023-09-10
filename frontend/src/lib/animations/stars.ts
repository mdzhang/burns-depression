export default function createBoxes() {
  const boxes: Element[] = [];

  const colors = [
    '#ff7477',
    '#32cbff',
    '#b388eb',
    '#5dfdcb',
    '#ffd639',
  ];

  const sizes = [6, 8, 10];

  for (let b = 0; b < 50; b += 1) {
    const box = document.createElement('div');

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;

    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    box.style.minWidth = `${randomSize}px`;
    box.style.height = `${randomSize}px`;

    const delay = Math.floor(Math.random() * 25);
    box.style.animationDelay = `${delay}s`;

    box.setAttribute('class', 'shooting-star');
    boxes.push(box);

    const pushToScreen = (i: number) => {
      document.getElementById('outer-space')?.appendChild(boxes[i]);

      if (i + 1 < boxes.length) {
        setTimeout(() => {
          pushToScreen(i + 1);
        }, 300);
      }
    };

    pushToScreen(0);
  }
}
