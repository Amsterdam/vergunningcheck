import { findTopicBySlug } from "../utils";
import useSlug from "./useSlug";

const getTopicFromSlug = (slug: string | undefined) => {
  if (!slug) {
    return;
  }

  const topic = findTopicBySlug(slug);
  if (topic) {
    return topic;
  }
  // Demo of usage with dynamic (unconfigured) topics
  //   /**
  //    * Fallback scenario;
  //    * We don't have a configured topic for the current slug.
  //    * Setup a 'fake' topic configuration and render the page.
  //    */
  //   const topicConfig = topicsJson.flat().find((topic) => topic.slug === slug);
  //   const name = topicConfig.name || topicConfig.slug;

  //   return {
  //     slug,
  //     name,
  //     hasSTTR: true,
  //     text: {
  //       heading: name,
  //     },
  //   };
};

// export default () => {
//   const context = useContext(SessionContext);
//   const slug = useSlug();

//   if (!context.topic || slug !== context.topic?.slug) {
//     context.topic = getTopicFromSlug(slug);
//   }

//   return context.topic;
// };

export default () => {
  const slug = useSlug();
  return getTopicFromSlug(slug);
};
