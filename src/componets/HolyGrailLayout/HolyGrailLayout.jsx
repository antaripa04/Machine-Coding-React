import "./HolyGrailLayout.css";

export const HolyGrailLayoutFlex = () => {
  return (
    <div class="holy-grail-flexbox">
      <header class="header">Header FlexBox</header>
      <main class="main-content">Main content</main>
      <section class="left-sidebar">Left sidebar</section>
      <aside class="right-sidebar">Right sidebar</aside>
      <footer class="footer">Footer</footer>
    </div>
  );
};

export const HolyGrailLayoutGrid = () => {
  return (
    <div class="holy-grail-grid">
      <header class="header">Header Grid</header>
      <main class="main-content">Main content</main>
      <section class="left-sidebar">Left sidebar</section>
      <aside class="right-sidebar">Right sidebar</aside>
      <footer class="footer">Footer</footer>
    </div>
  );
};

export const HolyGrailLayout = () => {
  return (
    <div>
      <HolyGrailLayoutFlex />
      <div className="mb-5"></div>
      <HolyGrailLayoutGrid />
    </div>
  );
};
