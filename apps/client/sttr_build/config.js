module.exports = {
  production: {
    // aanbouw: [
    //   {
    //     id: "WzTvyyRGkp2pf79aQ",
    //     naam: "Aanbouw bouwen"
    //   },
    //   {
    //     id: "FMbPHJhi3B3mwb7pT",
    //     naam: "test"
    //   }
    // ],
    dakraam: [
      {
        id: "hMwHKR7Wz4FP8Dm4x",
        naam: "Het wijzigen van een monument bij een dakraam",
      },
      {
        id: "dRy4PfDs7jQPc9gMG",
        naam: "Dakraam bouwen",
      },
    ],
    dakkapel: [
      {
        id: "WKPxKx4YBJ5fqYSni",
        naam: "Dakkapel monument",
      },
      {
        id: "Aa2EX3YprpZQ65non",
        naam: "Dakkapel bouwen",
      },
    ],
    zonnepaneel: [
      {
        id: "TRhZrFexMjBW42Ky6",
        naam: "Zonnepaneel en zonneboiler monument",
      },
      {
        id: "skPG9qqTqWyX9tSY7",
        naam: "Zonnepaneel en zonneboiler bouwen",
      },
    ],
    kozijn: [
      {
        id: "Xm2WwYeGkNN9w6rgQ",
        name: "Kozijn plaatsen in een monument",
      },
      {
        id: "5CJrbgbWZP6uZsouY",
        name: "Kozijn plaatsen",
      },
    ],
    zonwering: [
      {
        id: "TuP6ido9xpJSSxjLi",
        name: "Zonwering, rolhek, luik of rolluik bouwen",
      },
      {
        id: "AkxinYRNNo679qi6T",
        name: "Zonwering, rolhek, luik of rolluik monument",
      },
    ],
  },
  staging: {
    dakkapel: [
      {
        id: "KtAQGNzyyPjYe5mPc",
        name: "Dakkapel bouwen",
      },
      {
        id: "BTEm6sJJ6ZQEP9rJx",
        name: "Het wijzigen van een monument bij een dakkapel",
      },
    ],
    dakraam: [
      {
        id: "gzMTczepTCdxFnvYe",
        name: "Dakraam bouwen",
      },
      {
        id: "rpqSbyPsSK29JcAm9",
        name: "Het wijzigen van een monument bij een dakraam",
      },
    ],
    outcomes: [
      {
        id: "p3a48QBHA48YkZrRs",
        name: "Testing different outcomes/conclusions",
      },
    ],
  },
}[process.env.STTR_ENV];
