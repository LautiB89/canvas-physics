export const getNavbar = (canvas) => {
  const Navbar = {
    x: 0,
    y: 0,
    w: 70,
    h: canvas.height,
    collapsedW: 70,
    expandedW: 300,
    expansionRate: 50, // pixel per fotogram
    expanded: false,
    color: "grey",
    draw(context) {
      Navbar.w = Math.max(
        Math.min(
          Navbar.w + (Navbar.expanded ? 1 : -1) * Navbar.expansionRate,
          Navbar.expandedW
        ),
        Navbar.collapsedW
      );
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.w, this.h);
    },
  };

  const hoverNavbar = (event) => {
    Navbar.expanded = event.pageX <= Navbar.w;
  };

  canvas.addEventListener("mousemove", hoverNavbar, false);
  canvas.addEventListener("mouseenter", hoverNavbar, false);
  canvas.addEventListener("mouseleave", hoverNavbar, false);

  return Navbar;
};
