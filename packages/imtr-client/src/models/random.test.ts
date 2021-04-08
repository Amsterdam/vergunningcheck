// import { number } from "../utils/mocks";
// import Question from "./question";

// type Brand<K, T> = K & { __brand: T };

// /** Generic Id type */
// type Id<T extends string> = {
//   type: T;
//   value: string;
// };
// type FooId = Id<"foo">;

// // type USD = Brand<number, "USD">;

// it("checks the type of stuff", () => {
//   type RuleId = Brand<string, "RuleId">;
//   // type RuleId = string & { __brand: "A" };
//   // type RuleIdType = 'RuleId';
//   // type RuleId = Id<RuleIdType>;

//   const id: RuleId = "asdf";

//   new Question({
//     id,
//     prio: 123,
//     text: "asdfasdf",
//     type: "boolean",
//   });

//   // interface NotZeroNumber {
//   //   x: number;
//   // }
//   // type NotZeroNumber = number & { __type: "NotZeroNumber" }; // this number must be not-zero
//   type NotZeroNumber = Brand<number, "NotZeroNumber">;
//   // enum FooIdBrand {
//   //   _ = 0,
//   // }
//   // type NotZeroNumber = FooIdBrand & number;

//   /** Generic type */
//   // type Num<T extends string> = {
//   //   type: T;
//   //   value: number;
//   // };

//   /** Specific  types */
//   // type NotZeroNumber = Num<"NotZeroNumber">;

//   function devide(x: number, devideBy: NotZeroNumber): number {
//     return x / devideBy;
//   }

//   const x = 2;
//   const y = 0 as number;
//   // const y = 1 as NotZeroNumber; // zo mag hij wel natuurlijk

//   expect(() => {
//     devide(x, y);
//   }).toThrow();
// });
