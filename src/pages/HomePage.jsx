import { NavLink } from "react-router";

const HomePage = () => {
  const sections = [
    {
      title: "Beginner Challenges",
      items: [
        {
          path: "todo",
          name: "Todo List",
          description: "CRUD operations, local state, styling. Bonus: localStorage, drag-and-drop.",
        },
        {
          path: "color-boxes",
          name: "Color Boxes",
          description: "Dynamic rendering, props, inline styles. Bonus: color picker.",
        },
        {
          path: "star-rating",
          name: "Star Rating",
          description: "Interactive UI, state, hover effects. Bonus: half-stars, size/color props.",
        },
        {
          path: "accordion",
          name: "Accordion",
          description: "Collapsible sections, ARIA accessibility.",
        },
        {
          path: "holy-grail-layout",
          name: "Holy Grail Layout",
          description: "Responsive layout using CSS Grid/Flexbox.",
        },
      ],
    },
    {
      title: "Intermediate (State Management + API)",
      items: [
        {
          path: "posts-comments",
          name: "Posts with Comments",
          description: "Fetch API data, nested components. Bonus: edit comments, optimistic updates.",
        },
        {
          path: "pagination",
          name: "Pagination (JS/React)",
          description: "Slice data into pages. Bonus: truncated pagination with ellipsis.",
        },
        {
          path: "shopping-cart",
          name: "Shopping Cart",
          description: "Global state (Context/Redux), cart ops. Bonus: persist cart, calculate totals.",
        },
        {
          path: "ecommerce-filters",
          name: "E-commerce Filters",
          description: "Multi-select filters with dynamic UI. Bonus: URL sync.",
        },
        {
          path: "nested-comments",
          name: "Nested Comments",
          description: "Recursive rendering, reply trees.",
        },
      ],
    },
    {
      title: "Advanced (Performance + System Design)",
      items: [
        {
          path: "infinite-scroll",
          name: "Infinite Scroll",
          description: "Intersection Observer, virtualization. Bonus: throttling, cache layer.",
        },
        {
          path: "carousel",
          name: "Carousel",
          description: "Auto-play, swipe gestures. Bonus: lazy loading, accessibility.",
        },
        {
          path: "config-form",
          name: "Config-Driven Form",
          description: "Dynamic form from JSON config. Bonus: extensible validation.",
        },
        {
          path: "toast-system",
          name: "Toast/Notification System",
          description: "Global event bus, auto-dismiss. Bonus: prioritization, multi-position.",
        },
        {
          path: "autocomplete",
          name: "Autocomplete/Typeahead",
          description: "Debounced API, dropdown UX. Bonus: caching, LRU eviction.",
        },
      ],
    },
    {
      title: "Complex UI Logic",
      items: [
        {
          path: "tic-tac-toe",
          name: "Advanced Tic-Tac-Toe",
          description: "Game state, undo/redo. Bonus: AI opponent (minimax).",
        },
        {
          path: "poll-widget",
          name: "Poll Widget",
          description: "WebSocket real-time votes, result chart.",
        },
        {
          path: "match-tiles",
          name: "Match Similar Tiles",
          description: "Memory game logic, animations, timer.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">React Machine Coding Challenges</h1>
      {sections.map((section) => (
        <div key={section.title} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((challenge) => (
              <li key={challenge.path} className="flex">
                <NavLink to={`/${challenge.path}`} className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition h-full w-full">
                  <h3 className="text-xl font-semibold">{challenge.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{challenge.description}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
