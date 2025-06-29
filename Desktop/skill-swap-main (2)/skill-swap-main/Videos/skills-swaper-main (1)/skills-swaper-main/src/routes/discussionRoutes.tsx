
import { Route } from "react-router-dom";
import DiscussionDetail from "@/pages/DiscussionDetail";

// This file exports discussion-related routes that can be imported in App.tsx
export const discussionRoutes = (
  <Route path="/discussions/:id" element={<DiscussionDetail />} />
);
