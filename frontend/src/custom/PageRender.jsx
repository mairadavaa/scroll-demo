import { createElement } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../components/other/NotFound";

const customizingPageRouter = (pageName) => {
  try {
    const renderedComponent = () =>
      require(`../pages/main/${pageName}`).default;
    return createElement(renderedComponent());
  } catch (error) {
    return <NotFound />;
  }
};
export const PageRender = () => {
  const { page, id } = useParams();
  const pageName = id ? `${page}/[id]` : page;
  return customizingPageRouter(pageName);
};
