import React, { Suspense } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, waitForElement, screen } from "./utils/test-utils";
import { topics } from "./config";

describe("Config", () => {
  afterEach(cleanup);

  it("should be able to find all Intro pages", async () => {
    // Add DebugIntro to topics if not already defined
    if (!topics.find((t) => t.intro === "DebugIntro")) {
      topics.push({
        intro: "DebugIntro",
      });
    }

    const { getAllByText } = render(
      <>
        {topics.map((t) => {
          const { intro } = t;
          if (intro) {
            // Use same load method as in IntroPage.js
            const Intro = React.lazy(() => import(`./intros/${intro}`));
            return (
              <Suspense key={`${intro} - suspense`} fallback={<p>Loading</p>}>
                <Intro key={intro} />
              </Suspense>
            );
          }
          return null;
        })}
      </>
    );

    // Find Loading text fallback before the React.lazy has loaded the Intros
    expect(getAllByText("Loading")).toBeTruthy();

    // Find DebugIntro after React.lazy has loaded the Intros
    await waitForElement(() => screen.getByText(/Some debug intro/i));

    // This test is to make sure all Intro files are found
    // If errors occur, it means that one or more of the Intros specified in config.js has not been found.
    // Check your error log in console
  });
});
