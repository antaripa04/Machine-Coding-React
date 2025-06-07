import { Route, Routes } from "react-router";
import { ChallengeLayout, TodoList, HolyGrailLayout, Accordion } from "./componets";
import HomePage from "./pages/HomePage";
import NotFound from "./componets/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route element={<ChallengeLayout />}>
        <Route path="todo" element={<TodoList />} />
        <Route path="holy-grail-layout" element={<HolyGrailLayout />} />
        <Route path="accordion" element={<Accordion />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
