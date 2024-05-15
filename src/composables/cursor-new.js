// cursor.js
export function initializeCustomCursor() {
  document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    });

    document.addEventListener("mousedown", () => {
      cursor.classList.add("clickable-cursor");
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("clickable-cursor");
    });

    document.querySelectorAll("a, button, .clickable").forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("clickable-cursor");
      });
      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("clickable-cursor");
      });
    });
  });
}
