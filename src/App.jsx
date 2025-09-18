import { Route, Routes } from "react-router";
import { ChallengeLayout, TodoList, HolyGrailLayout, Accordion, StarRating, ColorBoxes, InfiniteScroll, Pagination, PostsWithComments } from "./componets";
import HomePage from "./pages/HomePage";
import NotFound from "./componets/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route element={<ChallengeLayout />}>
        {/* Beginner Challenges */}
        <Route path="todo" element={<TodoList />} />
        <Route path="holy-grail-layout" element={<HolyGrailLayout />} />
        <Route path="accordion" element={<Accordion />} />
        <Route path="star-rating" element={<StarRating />} />
        <Route path="color-boxes" element={<ColorBoxes />} />

        {/* Intermediate (State Management + API) */}
        <Route path="pagination" element={<Pagination />} />
        <Route path="posts-comments" element={<PostsWithComments />} />



        <Route path="infinite-scroll" element={<InfiniteScroll />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
