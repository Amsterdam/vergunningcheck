import { random } from "./util";
import {
  EXACT_MATCH,
  getFixturesByProperties,
  HAS_ALPHANUM_ADDITION,
  HAS_NOUN_ADDITION,
  HAS_NUM_ADDITION,
  HAS_PLURAL_NOUN_ADDITION,
  MANY_ADDITIONS,
  NO_ADDITIONS,
  VALID_WITHOUT_ADDITION,
  VALID_WITH_ADDITION,
} from "./zipcode";

const byProps = (props) => random(getFixturesByProperties(props))?.[2];

const testProps = (props) =>
  test(props.toString(), () =>
    expect(byProps(props)).toEqual(expect.arrayContaining(props))
  );

describe("zipcode", () => {
  testProps([NO_ADDITIONS, EXACT_MATCH, VALID_WITHOUT_ADDITION]);
  testProps([VALID_WITH_ADDITION, HAS_NUM_ADDITION]);
  testProps([VALID_WITH_ADDITION, HAS_NOUN_ADDITION]);
  testProps([VALID_WITHOUT_ADDITION, VALID_WITH_ADDITION]);
  testProps([MANY_ADDITIONS, VALID_WITH_ADDITION, HAS_NOUN_ADDITION]);
  testProps([HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]);
  testProps([
    HAS_NUM_ADDITION,
    HAS_NOUN_ADDITION,
    HAS_ALPHANUM_ADDITION,
    VALID_WITH_ADDITION,
  ]);
  testProps([
    HAS_ALPHANUM_ADDITION,
    VALID_WITH_ADDITION,
    VALID_WITHOUT_ADDITION,
  ]);
  testProps([HAS_PLURAL_NOUN_ADDITION, VALID_WITHOUT_ADDITION]);
  testProps([VALID_WITH_ADDITION, HAS_NOUN_ADDITION, EXACT_MATCH]);

  test("unknown combination", () => {
    expect(byProps([HAS_NOUN_ADDITION, NO_ADDITIONS])).toBeUndefined();
  });
});
