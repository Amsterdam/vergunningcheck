import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { topics } from "../config";

const getTopicFromSlug = (slug: string) => {
  if (!slug) {
    return null;
  }

  const topic = topics.find((topic) => topic.slug === slug);

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
  return null;
};

export default () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState(getTopicFromSlug(slug));

  useEffect(() => {
    setTopic(getTopicFromSlug(slug));
  }, [setTopic, slug]);

  return topic;
};
