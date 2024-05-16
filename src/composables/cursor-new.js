class Cursor {
  constructor() {
    this.cursor = null;
    this.pos = { curr: null, prev: null };
    this.styleElement = null;

    this.createCursor();
    this.initializeEvents();
    this.animateCursor();
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.id = 'cursor';
    this.cursor.classList.add('hidden');
    document.body.appendChild(this.cursor);

    this.styleElement = document.createElement('style');
    this.styleElement.innerHTML = `
      * { cursor: none !important; }
      a, button, img { cursor: none !important; }
    `;
    document.head.appendChild(this.styleElement);
  }

  initializeEvents() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));

    document.querySelectorAll('a, button, img').forEach(el => {
      el.addEventListener('mouseenter', this.onHoverStart.bind(this));
      el.addEventListener('mouseleave', this.onHoverEnd.bind(this));
    });
  }

  onMouseMove(event) {
    if (!this.pos.curr) {
      this.moveCursor(event.clientX, event.clientY);
    }
    this.pos.curr = { x: event.clientX, y: event.clientY };
    this.cursor.classList.remove('hidden');
  }

  onMouseEnter() {
    this.cursor.classList.remove('hidden');
  }

  onMouseLeave() {
    this.cursor.classList.add('hidden');
  }

  onMouseDown() {
    this.cursor.classList.add('active');
  }

  onMouseUp() {
    this.cursor.classList.remove('active');
  }

  onHoverStart() {
    this.cursor.classList.add('hover');
  }

  onHoverEnd() {
    this.cursor.classList.remove('hover');
  }

  moveCursor(left, top) {
    this.cursor.style.left = `${left}px`;
    this.cursor.style.top = `${top}px`;
  }

  animateCursor() {
    if (this.pos.prev) {
      this.pos.prev.x = this.lerp(this.pos.prev.x, this.pos.curr.x, 0.2);
      this.pos.prev.y = this.lerp(this.pos.prev.y, this.pos.curr.y, 0.2);
      this.moveCursor(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(this.animateCursor.bind(this));
  }

  lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }
}

const cursorInit = () => new Cursor();

export default cursorInit;
