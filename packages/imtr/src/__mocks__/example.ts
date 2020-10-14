const x: DMNDocument = {
  "dmn:definitions": [
    {
      "attributes": {
        "xmlns:dmn": "http://www.omg.org/spec/DMN/20151101/dmn.xsd",
        "xmlns:feel": "http://www.omg.org/spec/FEEL/20140401",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:inter": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Interactieregel",
        "xmlns:bedr": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Bedrijfsregel",
        "xmlns:uitv": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Uitvoeringsregel",
        "xmlns:content": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Content",
        "xmlns": "http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000",
        "namespace": "http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000",
        "exporter": "Geodan FLO Legal STTR Builder",
        "exporterVersion": "1.1 (2.2.5)",
        "id": "_627a5874-f0b2-4784-ae01-c9cdb1e81a9e",
        "name": "Conclusie Dakkapel bouwen",
      },
      "dmn:extensionElements": [
        {
          "inter:regelgroepen": [
            {
              "inter:regelgroep": [
                {
                  "attributes": {
                    "id": "groep1"
                  },
                  "inter:naam": "Conclusie Dakkapel bouwen\t gemeente Amsterdam",
                  "inter:prioriteit": 10
                }
              ]
            }
          ],
          "uitv:uitvoeringsregels": [
            {
              "uitv:uitvoeringsregel": [
                {
                  "attributes": {
                    "id": "uitv__51fe2afb-ebfa-48e0-b81d-822c38eaf87a"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 10,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Staat het gebouw waarop u de dakkapel gaat plaatsen in een gebied waar gemeentelijke regels gelden voor het uiterlijk van gebouwen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "In bijna heel Amsterdam gelden regels voor het uiterlijk van gebouwen. In een klein aantal gebieden gelden er geen regels. We noemen die gebieden welstandsvrij. [Op de kaart](https://maps.amsterdam.nl/welstand/?LANG=nl&L=11) staan de gebieden waar geen regels gelden. Valt u daar buiten, dan beantwoordt u de vraag met ‘ja’.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "uitv:herbruikbaarId": "monument",
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 20,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Gaat u de dakkapel plaatsen op het dak van een gemeentelijk of rijksmonument?"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv_e8111db4-8a83-4d79-9d05-4f6f9905b882"
                  },
                  "uitv:herbruikbaarId": "dakkapel - onderhoud1",
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 30,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "list",
                      "uitv:vraagTekst": "Gaat u een dakkapel plaatsen of vernieuwen?",
                      "uitv:opties": [
                        {
                          "uitv:optieType": "enkelAntwoord",
                          "uitv:optie": [
                            {
                              "uitv:sequenceId": 0,
                              "uitv:optieText": "Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was."
                            },
                            {
                              "uitv:sequenceId": 1,
                              "uitv:optieText": "Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv_8b235cec-7f69-42f7-8aad-d49668fe720b"
                  },
                  "uitv:herbruikbaarId": "dakkapel - onderhoud2",
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 40,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "list",
                      "uitv:vraagTekst": "U gaat een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was. Verandert de vorm, de grootte of het profiel? Of verandert de kleur of het materiaal?",
                      "uitv:opties": [
                        {
                          "uitv:optieType": "enkelAntwoord",
                          "uitv:optie": [
                            {
                              "uitv:sequenceId": 0,
                              "uitv:optieText": "Ja, de dakkapel verandert."
                            },
                            {
                              "uitv:sequenceId": 1,
                              "uitv:optieText": "Nee, de vorm, de grootte en het profiel veranderen niet. Ook kleur en materiaal veranderen niet."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv_fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 50,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "list",
                      "uitv:vraagTekst": "Gaat u een dakkapel plaatsen of vernieuwen?",
                      "uitv:opties": [
                        {
                          "uitv:optieType": "enkelAntwoord",
                          "uitv:optie": [
                            {
                              "uitv:sequenceId": 0,
                              "uitv:optieText": "Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was."
                            },
                            {
                              "uitv:sequenceId": 1,
                              "uitv:optieText": "Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv_bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 60,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "list",
                      "uitv:vraagTekst": "U gaat een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was. Verandert de vorm, de grootte of het profiel?",
                      "uitv:opties": [
                        {
                          "uitv:optieType": "enkelAntwoord",
                          "uitv:optie": [
                            {
                              "uitv:sequenceId": 0,
                              "uitv:optieText": "Ja, de vorm, de grootte of het profiel verandert."
                            },
                            {
                              "uitv:sequenceId": 1,
                              "uitv:optieText": "Nee, de vorm, de grootte en het profiel veranderen niet."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 70,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "list",
                      "uitv:vraagTekst": "Aan welke kant van het gebouw gaat u de dakkapel plaatsen?",
                      "uitv:opties": [
                        {
                          "uitv:optieType": "enkelAntwoord",
                          "uitv:optie": [
                            {
                              "uitv:sequenceId": 0,
                              "uitv:optieText": "Voorkant"
                            },
                            {
                              "uitv:sequenceId": 1,
                              "uitv:optieText": "Zijkant"
                            },
                            {
                              "uitv:sequenceId": 2,
                              "uitv:optieText": "Achterkant"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/3_a_Voorkant_v2.png \"Voorkant\")\n\n![](https://sttr-files.flolegal.app/00000001002564440000/3_b_Zijkant_v2.png \"Zijkant\")\n\n![](https://sttr-files.flolegal.app/00000001002564440000/3_c_Achterkant_1_v2.png \"Achterkant\")",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 80,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "U gaat de dakkapel plaatsen aan de zijkant van het gebouw. Ligt die kant aan een straat, fietspad of voetpad waar iedereen mag komen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/4_a_OTG_Zijkant-weg_v2.png \"Zijkant aan een straat, fietspad of voetpad.\")\n\nAls u naast het gebouw een tuin hebt en die ligt aan een straat, fietspad of voetpad, beantwoordt u de vraag met ‘ja’.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 90,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "U gaat de dakkapel plaatsen aan de zijkant van het gebouw. Ligt die kant aan een gracht, kanaal of ander vaarwater waar iedereen mag komen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/4_c_OTG_Zijkant-water_v2.png \"Zijkant aan een gracht, kanaal of ander vaarwater.\")\n\nAls er direct achter uw tuin een gracht, kanaal of ander vaarwater ligt, dan beantwoordt u de vraag met 'ja'.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 100,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "U gaat de dakkapel plaatsen aan de zijkant van het gebouw. Ligt die kant aan een plein, park of parkeerplaats waar iedereen mag komen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/4_b_OTG_Zijkant-plantsoen_v2.png \"Zijkant aan een plein, park of parkeerplaats.\")\n\nAls u naast het gebouw een tuin hebt en die ligt aan een plein, park of parkeerplaats, beantwoordt u de vraag met ‘ja’.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 110,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Staat het gebouw waarop u de dakkapel gaat plaatsen in een beschermd stads- of dorpsgezicht?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "Aan het begin van deze vergunningcheck hebt u het antwoord op deze vraag gekregen. Wij kunnen dit antwoord op dit moment nog niet automatisch hier invullen. Vul alstublieft zelf het antwoord hieronder in.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 120,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "U gaat de dakkapel plaatsen aan de achterkant van het gebouw. Ligt die kant aan een straat, fietspad of voetpad, waar iedereen mag komen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/6_a_OTG_Achterkant-weg_v2.png \"Achterkant aan een straat, fietspad of voetpad.\")\n\nAls er direct achter uw tuin een straat, fietspad of voetpad ligt, dan beantwoordt u de vraag met 'ja'.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__1c4854f4-ea25-450b-a7f4-734203024943"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 130,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "U gaat de dakkapel plaatsen aan de achterkant van het gebouw. Ligt die kant aan een gracht, kanaal of ander vaarwater waar iedereen mag komen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/6_c_OTG_Achterkant-water_v2.png \"Achterkant aan een gracht, kanaal of ander vaarwater.\")\n\nAls u naast het gebouw een tuin hebt en die ligt aan een gracht, kanaal of ander vaarwater, beantwoordt u de vraag met ‘ja’.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__69f71c11-edb3-4949-8951-1861308beb03"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 140,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "U gaat de dakkapel plaatsen aan de achterkant van het gebouw. Ligt die kant aan een plein, park of parkeerplaats waar iedereen mag komen?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/6_b_OTG_Achterkant-plantsoen_v2.png \"Achterkant aan een plein, park of parkeerplaats.\")\n\nAls er direct achter uw tuin een plein, park of parkeerplaats ligt, dan beantwoordt u de vraag met 'ja'.",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__01938ee8-1007-4b10-b672-6ebb050df5bf"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 150,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Krijgt de dakkapel een plat dak?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/7_a_platdak_v2.png)",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 160,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Wordt de dakkapel hoger dan 1,75 meter?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/8_a_hoogte_dakkapel_3D-_v2.png)",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 170,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Wordt de afstand van het laagste punt van het dak tot de onderkant van de dakkapel tussen de 50 en 100 centimeter?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/9_a_afstand_tot_onderkant_3D_v2.png)",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__4420be2f-e8ca-46e8-9eec-e9036076fbff"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 180,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Wordt de afstand tussen de bovenkant van de dakkapel en de bovenkant van het dak meer dan 50 centimeter?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "Toelichting 'bovenkant van het dak': het gaat om het hoogste punt van het dak van het gebouw. U rekent een schoorsteen, schotel of antenne niet mee.\n\n![](https://sttr-files.flolegal.app/00000001002564440000/10_a_afstand_tot_bovenkant_3D-_v2.png)",
                      "content:belangrijk": true
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "uitv__e097c508-67a8-408c-9e9b-b813eda85db0"
                  },
                  "uitv:regelgroepRef": [
                    {
                      "attributes": {
                        "href": "#groep1"
                      }
                    }
                  ],
                  "inter:prioriteit": 190,
                  "uitv:vraag": [
                    {
                      "uitv:gegevensType": "boolean",
                      "uitv:vraagTekst": "Worden de afstanden tussen de zijkanten van de dakkapel en de zijkanten van uw dak meer dan 50 centimeter?"
                    }
                  ],
                  "content:uitvoeringsregelToelichting": [
                    {
                      "content:toelichting": "![](https://sttr-files.flolegal.app/00000001002564440000/11_a_afstand_tot_dakrand_2D-v4.png)",
                      "content:belangrijk": true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "dmn:inputData": [
        {
          "attributes": {
            "id": "input__51fe2afb-ebfa-48e0-b81d-822c38eaf87a",
            "label": "_51fe2afb-ebfa-48e0-b81d-822c38eaf87a",
            "name": "_51fe2afb-ebfa-48e0-b81d-822c38eaf87a"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__51fe2afb-ebfa-48e0-b81d-822c38eaf87a"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_6667a44c-b17d-441d-b914-f5a89f783fbf",
                "name": "_51fe2afb-ebfa-48e0-b81d-822c38eaf87a",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__e3f23320-186c-4507-b6a6-84170426cc0a",
            "label": "_e3f23320-186c-4507-b6a6-84170426cc0a",
            "name": "_e3f23320-186c-4507-b6a6-84170426cc0a"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_7afbe23b-88f4-4d0f-b01a-ade2ea53c2e6",
                "name": "_e3f23320-186c-4507-b6a6-84170426cc0a",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input_e8111db4-8a83-4d79-9d05-4f6f9905b882",
            "label": "e8111db4-8a83-4d79-9d05-4f6f9905b882",
            "name": "e8111db4-8a83-4d79-9d05-4f6f9905b882"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv_e8111db4-8a83-4d79-9d05-4f6f9905b882"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_64a82ebb-d911-466c-acbe-51a231f25a63",
                "name": "e8111db4-8a83-4d79-9d05-4f6f9905b882",
                "typeRef": "feel:string"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input_8b235cec-7f69-42f7-8aad-d49668fe720b",
            "label": "8b235cec-7f69-42f7-8aad-d49668fe720b",
            "name": "8b235cec-7f69-42f7-8aad-d49668fe720b"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv_8b235cec-7f69-42f7-8aad-d49668fe720b"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_a0b7acc3-d5ef-4bab-953a-f7ccae26e803",
                "name": "8b235cec-7f69-42f7-8aad-d49668fe720b",
                "typeRef": "feel:string"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input_fc74c97d-266b-4b96-b618-99910669e546",
            "label": "fc74c97d-266b-4b96-b618-99910669e546",
            "name": "fc74c97d-266b-4b96-b618-99910669e546"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_f4d34012-6a7b-415a-8d1c-137f563230b3",
                "name": "fc74c97d-266b-4b96-b618-99910669e546",
                "typeRef": "feel:string"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input_bb2328ac-a595-4311-9beb-1934469d6245",
            "label": "bb2328ac-a595-4311-9beb-1934469d6245",
            "name": "bb2328ac-a595-4311-9beb-1934469d6245"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_171a90c5-93a7-4b50-b3d0-8d41e033b414",
                "name": "bb2328ac-a595-4311-9beb-1934469d6245",
                "typeRef": "feel:string"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__2af9eafd-fd78-439f-a06c-bb7566c21154",
            "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154",
            "name": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_552c9d87-7e21-47a3-ad96-7dcd5bebcdaa",
                "name": "_2af9eafd-fd78-439f-a06c-bb7566c21154",
                "typeRef": "feel:string"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705",
            "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705",
            "name": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_3d2f3734-be1b-49b9-8571-720405625f4a",
                "name": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__76fea73f-9000-4c9a-92e3-fc1003f6de60",
            "label": "_76fea73f-9000-4c9a-92e3-fc1003f6de60",
            "name": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_f585f17c-08b0-41db-8f42-88e6fe1bc28a",
                "name": "_76fea73f-9000-4c9a-92e3-fc1003f6de60",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__2cf98565-883d-4eb0-9bb8-175ed6fc2f24",
            "label": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24",
            "name": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_79ce364b-62ed-403a-895a-8e5573318c90",
                "name": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7",
            "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7",
            "name": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_b280be42-a09b-4fee-ba89-b5a919d7ba10",
                "name": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7",
            "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7",
            "name": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_e261d8bd-a94c-4838-aca2-56b5773a38fb",
                "name": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__1c4854f4-ea25-450b-a7f4-734203024943",
            "label": "_1c4854f4-ea25-450b-a7f4-734203024943",
            "name": "_1c4854f4-ea25-450b-a7f4-734203024943"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__1c4854f4-ea25-450b-a7f4-734203024943"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_06cb61e4-5d2d-45f7-a377-0e984e7df0ce",
                "name": "_1c4854f4-ea25-450b-a7f4-734203024943",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__69f71c11-edb3-4949-8951-1861308beb03",
            "label": "_69f71c11-edb3-4949-8951-1861308beb03",
            "name": "_69f71c11-edb3-4949-8951-1861308beb03"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__69f71c11-edb3-4949-8951-1861308beb03"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_2131e64c-c48e-4c18-ba52-18d95e451962",
                "name": "_69f71c11-edb3-4949-8951-1861308beb03",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__01938ee8-1007-4b10-b672-6ebb050df5bf",
            "label": "_01938ee8-1007-4b10-b672-6ebb050df5bf",
            "name": "_01938ee8-1007-4b10-b672-6ebb050df5bf"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__01938ee8-1007-4b10-b672-6ebb050df5bf"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_46a4c24e-7011-4f74-809e-a14bb0bc5738",
                "name": "_01938ee8-1007-4b10-b672-6ebb050df5bf",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6",
            "label": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6",
            "name": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_31fb3897-2ab8-4651-892a-854922c45f42",
                "name": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a",
            "label": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a",
            "name": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_ae3233b4-ad68-4997-af89-39679d26024a",
                "name": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__4420be2f-e8ca-46e8-9eec-e9036076fbff",
            "label": "_4420be2f-e8ca-46e8-9eec-e9036076fbff",
            "name": "_4420be2f-e8ca-46e8-9eec-e9036076fbff"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__4420be2f-e8ca-46e8-9eec-e9036076fbff"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_c47ba1fd-bab2-4a0a-a554-631c22b3e7a9",
                "name": "_4420be2f-e8ca-46e8-9eec-e9036076fbff",
                "typeRef": "feel:boolean"
              }
            }
          ]
        },
        {
          "attributes": {
            "id": "input__e097c508-67a8-408c-9e9b-b813eda85db0",
            "label": "_e097c508-67a8-408c-9e9b-b813eda85db0",
            "name": "_e097c508-67a8-408c-9e9b-b813eda85db0"
          },
          "dmn:extensionElements": [
            {
              "uitv:uitvoeringsregelRef": [
                {
                  "attributes": {
                    "href": "#uitv__e097c508-67a8-408c-9e9b-b813eda85db0"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_58ed2ec1-2861-4a96-adf4-e22e59c9f45d",
                "name": "_e097c508-67a8-408c-9e9b-b813eda85db0",
                "typeRef": "feel:boolean"
              }
            }
          ]
        }
      ],
      "dmn:decision": [
        {
          "attributes": {
            "id": "_768319cc-9fea-4927-bff9-6a618d4b4857",
            "name": "Pad 1"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_70c1e36e-b96b-49df-91f0-046a6b5d529f",
                "name": "Pad 1",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__51fe2afb-ebfa-48e0-b81d-822c38eaf87a"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_497162fa-c4b5-4b3d-8522-98690c98aafd",
                "outputLabel": "Pad 1"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_f9047612-cece-45dc-ad8f-6e014ae7414c",
                    "label": "_51fe2afb-ebfa-48e0-b81d-822c38eaf87a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_51fe2afb-ebfa-48e0-b81d-822c38eaf87a"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_2af00e8a-8813-4a00-ad6f-135ad449bbe7",
                    "label": "Pad 1"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"NeemContactOpMet\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_ef2a5a3f-2782-4bb5-a304-450cf5402205"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9ef092b9-797a-43f1-adcc-64387b2473a2"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_da0a9927-9347-46fc-9395-cbe7491e7c13"
                      },
                      "dmn:text": "\"NeemContactOpMet\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_25e11909-6b0b-4d11-8b69-9b1192ee8447"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c6cabd38-a42b-4298-af43-9daa93ed282f"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d02f4f62-cd0d-4d67-b2e5-d3c82005356e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_962b6469-bd47-42cc-8292-a4e8bc1e50d5",
            "name": "Pad 2"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_3cb27b67-aa1c-4659-b7b4-9646407e9af7",
                "name": "Pad 2",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_e8111db4-8a83-4d79-9d05-4f6f9905b882"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_992f5c4f-8e3d-4acc-98be-f6bd44d9cb1b",
                "outputLabel": "Pad 2"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_6122d234-984e-4fbb-89e4-413026e6323b",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fb950214-518a-42d2-8bcc-0ac807f68ce5",
                    "label": "e8111db4-8a83-4d79-9d05-4f6f9905b882"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "e8111db4-8a83-4d79-9d05-4f6f9905b882"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_26457932-f32a-4c23-95b9-3109e1bff876",
                    "label": "Pad 2"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_0b71c7d0-7f4a-4310-b232-751c780a2f07"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b3e7c727-0488-48c0-bf4e-524b7e822248"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_0b965797-6450-4517-8790-2cba721acc0d"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_247171df-1b8e-4c00-b51d-ea937a2f2bca"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_efbc36fa-3427-44e0-9c6d-792439b4d07c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e2842b40-a847-45e1-ae8e-86087307c41f"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_486ae828-3d56-4f03-947c-91ee9f319195"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_edbec198-3cc0-4099-bd9f-7780beb9b029"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_52a675e0-9875-4f56-b066-ad6933035647"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f8f38d34-8094-4e36-b0c8-f24ad694354f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bbe232fd-9807-4a7f-8af6-02da5d48a4b7"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_080e1ac8-6179-4c8d-bbd9-ee13a64e7cb8"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_72a2fe65-b1d1-4281-b7f1-3e4cf1efe35b",
            "name": "Pad 3"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_b8ebc496-d382-491e-b296-99a4220c4413",
                "name": "Pad 3",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_e8111db4-8a83-4d79-9d05-4f6f9905b882"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_8b235cec-7f69-42f7-8aad-d49668fe720b"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_e7e06072-4b3d-4d00-9037-4e9166963255",
                "outputLabel": "Pad 3"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_4384386a-7e06-4270-8b3a-225c190b7381",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_035d0c60-db8b-4e1e-9277-98b1ca5c2c3a",
                    "label": "e8111db4-8a83-4d79-9d05-4f6f9905b882"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "e8111db4-8a83-4d79-9d05-4f6f9905b882"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ad1b842e-60a2-4ab5-ab00-e887a3fcd9ce",
                    "label": "8b235cec-7f69-42f7-8aad-d49668fe720b"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "8b235cec-7f69-42f7-8aad-d49668fe720b"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_2085c009-4f71-4716-a8d2-a080bf02cc97",
                    "label": "Pad 3"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_421109dd-d4fb-49b0-b06e-f237b5ec267a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_717795b7-92c0-4180-a1dd-efde05d59fc6"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_76ba8c2a-e267-420e-abed-924a8c0bf876"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_4af5c067-bd22-4dd9-9610-59a71f9407a5"
                      },
                      "dmn:text": "\"Ja, de dakkapel verandert.\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_30d98a2f-1c9a-4d33-a092-42fbc2cb763c"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5260975e-4108-488a-979b-dc3d84ead398"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b8ef2425-39e6-4ef3-ac97-5ed554faf835"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_26053b16-c68b-4f62-afb3-08a4bb8574ee"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_16d1b912-3821-4a46-a158-7c03bb20f229"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ef6d81f6-3f9b-4195-8757-ac9b6782300d"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b8b54a5f-70e5-4ecd-bb4e-a3e783e796d0"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b122c0cd-86a2-4f0c-b941-fb2c747293b2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f940f42c-8c21-4146-bebd-f9bbc0bba1cb"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_04de95e3-8aa9-4042-a065-5084a7e5bc5e"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_dd3fcdcc-7920-462f-a228-93ba99fcbe6c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_cf0c1b6a-56ae-4732-a620-5d9ba1831bcd"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_6484820d-b9f9-42fb-a930-205d1d43723c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2c278eef-6589-4074-9432-de30ae6ef82c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f1f188e7-3726-4c3b-8698-bc56a52cd90f"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet. Ook kleur en materiaal veranderen niet.\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_de3dcd3b-be96-406a-bf2d-956907d7673c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_a4712a53-2784-4f8c-9ec8-5ceeb8aceef7",
            "name": "Pad 4"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_3c8a3269-a009-4dcb-bac3-969a4c47813f",
                "name": "Pad 4",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_e7582b55-3ef5-498e-9e5d-a3b127a3fa37",
                "outputLabel": "Pad 4"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_38c7aabd-0738-42a2-b02f-5a834ecbf40d",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_349d81b8-cb8c-43bf-9827-c9d86f86a6e5",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2ff7582f-9596-42d1-b6d4-786ad0eae250",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_68a33d2e-faa6-4df3-b065-b3add96cf0ed",
                    "label": "Pad 4"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_69f749bf-4a7a-4cc2-80f7-0e75f3da9fe8"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_8ad1f1af-f58b-4374-90c6-0af487703e50"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_3b9554ba-cb41-481f-8eb7-2a7f2b98bca1"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_ecea6312-6116-45bf-bd46-fd3338dc749f"
                      },
                      "dmn:text": "\"Voorkant\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_e9c9a3b7-227d-47e2-9cde-1c7357e9c458"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d22825a4-730e-48ba-8ef6-e654c2bf9d4a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b3d113e3-5110-41e6-bee9-0b28adad3804"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_dccdb08b-c4c1-4b13-bb18-bfb8ae7bce86"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a070172f-06fe-47d6-89f1-9ccfb810565f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_23aab157-1215-4118-aa1a-dd3b10ba6403"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_92c35b96-21c4-4ac9-b730-1b68e4183053"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e5f9fc7c-dc86-4198-8218-f6c8ab68485f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_39548d2f-b2c9-4a10-aca2-6f84e1ace5eb"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_57500953-45ca-4d0c-b062-d16f4c18c723"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_8d9814f5-4745-442b-aadc-f8705d9bb91c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9699802d-76dc-4451-9597-02ee2a56be9e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_91720629-e338-4653-8c31-0728b792e88c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37bcecd5-b4d3-42a6-8335-34d4afcb768b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_473b5198-72cc-4a52-ac07-67a1408130da"
                      },
                      "dmn:text": "\"Zijkant\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_2eebbe69-3d38-4319-b932-86bf5f1663f6"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_01025db3-0a2c-43db-a162-5895028488fd"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b0a81178-f206-47e1-8f41-435ec8397a3b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d44a524b-1700-40a5-bbf7-cd260b3244e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3a9fb3de-e2e0-42a5-a85a-e60fc07ee3a1"
                      },
                      "dmn:text": "\"Achterkant\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_3a22d902-4c72-4e2d-bd8b-426f1662f0bc"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_c5db163f-1ca5-44ac-af91-2b53e9ac99ba",
            "name": "Pad 5"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_f0662731-f156-46ff-bd6f-0b77b187dd07",
                "name": "Pad 5",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e097c508-67a8-408c-9e9b-b813eda85db0"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_85b3e5bb-5c99-40e0-9d54-f2d86d95d752",
                "outputLabel": "Pad 5"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_d206f17f-86b1-44bc-902d-a50eb10bc5c5",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6239e604-4b1a-49da-8a01-41bdfd15f046",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ee5e4e8b-1097-4e29-a81b-d4d5457e68bc",
                    "label": "_e097c508-67a8-408c-9e9b-b813eda85db0"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e097c508-67a8-408c-9e9b-b813eda85db0"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_77842a06-8e2b-4c66-a1df-bee01fd46dcd",
                    "label": "Pad 5"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_489a616a-55d4-4356-a8d6-8528267ae5af"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_caa86bdd-1370-4537-9858-01e95cb1b3f7"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_b06ef19f-2d77-4a18-8529-dbd6387cd080"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_59aa535e-71fb-485c-979a-343c8373556a"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_760087e4-dc1a-4b16-8f0a-55cfc3c05188"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f289a4ff-37c1-4f12-aff7-9f3258ade3aa"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ff39ecc1-bd7a-4322-8e01-d12c33b7fd85"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_9008d34e-fbce-48a9-9147-99d9d4df034c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d02d00d8-442e-4fbf-901b-f63ca3f13390"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_01c686a1-d8b7-47d9-b0a2-8bc4a0b8a216"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f871d428-9014-4e3e-8276-2cdfae58aef0"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e99d17bd-835a-400a-aafc-a3b0358d6f7d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_62d3c5ba-3e71-4541-8700-851f2a4cdfaf"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_17745919-e2e3-4ef9-b900-42e8b2724ad8"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ab88e473-e62a-41a2-8be8-cd1f0b49cee4"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_42733959-64e5-4ea2-897f-a41ecf9fc7ec"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ac7cad3c-1f02-452a-80bc-79c3b1199ae1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_994034e6-5834-4590-9a34-8f75b76cb379"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5cd90af6-59e7-4c39-90b3-a04c517d6091"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c37baa91-0e5d-4b1a-85cf-389dfe945d0c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_7179fc7d-82f6-49aa-81ae-efdb1af9790d",
            "name": "Pad 6"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_357c01c5-6a28-4197-88fd-c73f5b0170ad",
                "name": "Pad 6",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__01938ee8-1007-4b10-b672-6ebb050df5bf"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_d80530d6-5da1-4115-98f5-cd841bef5440",
                "outputLabel": "Pad 6"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_269dace1-0feb-4e82-906e-78e569f5d21c",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_79e416f5-2728-46a9-bdcd-9d17027495d1",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9e94234f-b21e-435f-baac-3d2da7b7a583",
                    "label": "_01938ee8-1007-4b10-b672-6ebb050df5bf"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_01938ee8-1007-4b10-b672-6ebb050df5bf"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_8c5dd8d4-1541-4673-8d07-863f3baf8ce2",
                    "label": "Pad 6"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_bbfc554d-3599-456f-86a3-c5b6eeefe06f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_54401027-3e19-4066-b872-8c7eaa8b3768"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_97ffcdcf-aef7-4771-818b-0556d55696ae"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_9043aa33-e877-479a-8a5d-1d96f190838f"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ce4590c6-5324-422f-a585-e359b04d3562"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_acc76e14-a6ad-4d93-ad0d-157696a27ec3"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_35a887c2-1e5c-4cfd-91cc-3f1057e72adc"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_d7d13bbd-e83d-48b0-ac28-d5fcda395487"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_94b54e79-aed7-44a1-a0f5-e782f45c89f7"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_44328b2a-cd92-4954-b403-d6834579f6f9"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_cc89a3cf-4e7d-4ef6-ba0d-2ff55370a11e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_1a47d9ef-9e55-4016-baa2-a354a8b56f29"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5c2dd6b9-b9d7-40ea-ad09-61af9854218b"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_7a6de190-8b7b-4693-9de6-135bbe6a0b62"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_68e42b8a-b749-4772-a07a-45a1cb44231b"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8c89af3b-ab12-449a-88df-1dfba8103fde"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cb38e8c1-1e93-427d-b94c-35631da1a136"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3628c139-e7f1-4885-9a57-f2f7b76334d3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_65a0ff73-6c47-47fc-b93b-551b876b6311"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b563a578-dd65-4d16-bd28-a0abebfcd983"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_ec56e703-502c-463b-9a81-01888882b178",
            "name": "Pad 7"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_38ee8de0-6eaf-4192-8dae-2ea9e02c7f3e",
                "name": "Pad 7",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__4420be2f-e8ca-46e8-9eec-e9036076fbff"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_d2672aa3-e584-41b2-961a-be478f4b0a66",
                "outputLabel": "Pad 7"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_09ccd38b-1fa2-474a-ad68-140270651ae0",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_085efbcd-c14e-4920-a190-f3f03cf2936f",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b7c1f6d4-c6d5-4cbb-87e4-7803ca223f51",
                    "label": "_4420be2f-e8ca-46e8-9eec-e9036076fbff"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_4420be2f-e8ca-46e8-9eec-e9036076fbff"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_17f4c4c7-7138-47e4-a8c4-c8bf7f305c0f",
                    "label": "Pad 7"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_8f164c01-f5cb-46d3-8c9f-bcd64326bd5c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_5472f63f-9149-447b-9bcf-ab318201d613"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_9a3eade4-c05d-4b8d-94d6-96beeb7f955f"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_b6e5082e-321c-4188-bac8-70b72eb2ab50"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_02b1249f-1018-42b8-a9f4-12c402009d2b"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_064f36c4-03fa-4cc4-a72e-61ab8c82de18"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3a010259-96ad-4447-a331-0449e46fc607"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_9559c27b-1748-44ee-bc10-d44d5920631c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c8c737b3-bd57-44c0-8eb7-9d67487d5b51"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_134d3be4-b513-4f69-9be0-5f07018f8faf"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a0aa969c-f01d-4c4e-9436-13c6eb9efd0e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_5fc63d8d-8614-4019-b962-6fa73f94ae79"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_93831454-54f8-4b55-b747-3882108ae9ef"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_30e5ac9e-9e07-4f1f-aaeb-3a56086316e7"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7382c8bd-ea33-4e71-b1ba-9df5945576ac"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b8779244-312e-4434-aa49-a27de24cab5c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3147b964-7f29-4b0a-8c1e-ce074e3b91e1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37f1b287-66fc-4c4b-9254-b7423c48050c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_86227a1c-bc76-441b-8116-06434e3ba5d9"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_9ee217fd-e824-43c4-afa2-e9f32c68eb0b"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_3986f1dd-f848-40c8-95a4-5775b90921a3",
            "name": "Pad 8"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_437776c6-dc85-420b-b6db-4f657907418d",
                "name": "Pad 8",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_d8655f84-53d0-429e-9ac5-626024b65477",
                "outputLabel": "Pad 8"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_5a0d85f7-1444-45d1-b4c7-c629095a5512",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c3b5d624-ba7b-45c0-91c5-5784addc9cf3",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_393a0561-f969-4e05-8330-7fd97ba25ef3",
                    "label": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_ccc6d0ae-9185-477b-96ba-2ebc5b561131",
                    "label": "Pad 8"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_b4cf04ce-7247-411f-ad88-f7904f2b934f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_53bf009d-7ee2-47e4-915e-46bdc6e9f1c9"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_ec31740b-f707-4428-b041-3ff5b691411f"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_1b8c7f9e-f0f0-4693-988c-f2a0a92fc022"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_e393d5c2-e60a-4fb8-b627-97afe2092fa1"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_dae69780-effb-49b6-8057-0cbf8fa2aba6"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cdb95e19-505d-46f4-af06-490239843f87"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_6fd1cdbe-d099-49f9-8d03-760cd091ca44"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1e3524ac-bbd6-4ba3-b665-6550110c3151"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_67477beb-fba1-4899-9354-c70d0e97f890"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5821048e-84e2-474a-86fe-c1cac4afbbc4"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_de4859b2-c30c-427b-9c67-e17b5fc5ca36"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ab982404-9964-4cf6-ba3a-e72e601f3457"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_a768df00-d3c3-45ee-bae1-f718fb66c6b0"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_212e5828-9e6a-419f-9450-3cf2b1bb3d8c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6276c5be-e313-4f0e-8b3b-9ef488c9c161"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_54678876-132a-4445-b413-afa78be6ca18"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_33a0ddac-607b-4665-bd2e-a4fd32d0a368"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b99e3988-ef44-4749-84ec-1f5e1859564e"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_1ba92b62-b2a9-4e5e-a0ce-b2256ff9860a"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_47a525f9-a6bb-45ad-baca-c1f36a45ee64",
            "name": "Pad 9"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_0278bd04-8050-4425-81cf-6be50399351d",
                "name": "Pad 9",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_a981522d-837a-4998-87bf-01568fe3983a",
                "outputLabel": "Pad 9"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_2537049f-4107-41d9-a47b-3c3da73fde2f",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_04fc60a6-ada7-47ab-b2ad-b502ec00d8f6",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2984151c-10b5-484c-b12f-96f9c223a76c",
                    "label": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_626584a3-ea2e-4d10-b65f-81c2d58db219",
                    "label": "Pad 9"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_19383ad8-61b1-406e-b89b-03743aa0a616"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_4f7713fa-ac4c-485a-bb8f-5f1657e09f18"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_7f0f83ba-5798-416a-be2c-5615a70f918d"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_fd07f4b4-630d-4971-8c0b-499b5ebe6906"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c9ac4667-58a3-4ca5-b3b6-dea06f3fe896"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3468a82d-36e2-4c9a-b8c8-8c1eb675804e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_75fb3c11-bbfe-4833-b010-bd45c3833854"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_7776c77f-3542-4ab6-bf7a-c62fc6f88e5a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8943bbec-949e-40da-bd4d-73cf66438619"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_fd2b03b3-1580-4482-97f1-953e2741a519"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_aee9aade-51c3-4ee4-b4f8-1dd33acba9da"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e864ba7d-955b-4650-8178-bd53b20b236f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b09c0f1c-b082-4a69-a51e-fdafa336f54b"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_2dd679a7-f42f-4c27-8039-87e497c9befb"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d37f5fc8-064c-4771-bacd-9f23fdea5b81"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7da3cc05-f0a0-4b67-a41f-14ad41efabdb"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d9664a34-b105-434c-b94b-a518248c3314"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bd43f807-5a7a-4440-8953-a51e1f951558"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b7aae2ed-cc45-4060-aa4b-f7c22e1e7832"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_a096d069-6b6b-4758-9558-4ac954d35095"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_37aae019-e1f2-48d3-b5e8-5e1e27858b05",
            "name": "Pad 10"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_5a02e337-1562-4e2b-8613-dd0c28ba16a0",
                "name": "Pad 10",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_162bb1d8-a521-4a5d-afc5-610db6923ff7",
                "outputLabel": "Pad 10"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_7d3f763b-3987-4389-a97f-0794644aad15",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_40e58384-1634-40ea-b41b-4d096fb36376",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_48ffb860-042a-4fad-a49f-cac5a1338436",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6af64e8b-1785-4328-b19f-07dfd820fa8f",
                    "label": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_6eb1e6a6-24c6-46c8-9ef8-a6a3cc6171a6"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_208a6070-219d-40a0-9d87-c390edb5c7cb",
                    "label": "Pad 10"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_fc7e4bdd-7986-4eea-bfaa-dfe6e4084065"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_08c8cf60-be47-40d3-84c4-726a07def983"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_c7d49b3e-b484-4d14-8fc5-0e42257c10e9"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_c8e1f13a-477d-4781-8ce0-e747772e9d8c"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_b1b26c4f-a426-4dc8-8c23-03826ad17059"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_88036789-d307-461e-8c71-0b45e282ebf9"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_74f957a9-0ba5-4a11-8171-bebb399895ce"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e76d0cee-663c-4bf0-80de-08736f139c97"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_bab3369b-5ae0-4fa4-afad-9f96e75e7261"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b9651751-81cf-4702-a172-71cba9f53e56"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ff8eb9e5-5d66-4a1e-a02a-5ece068345ab"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_da710f18-fad0-4a5c-9786-585dbcdc525a"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6b2853c6-8a9f-487f-ba9b-27b82164a84c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_dac9bb9d-e604-4ad9-8b6e-f552ea33181b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_74a9ecf6-8dc3-4fbd-aaa4-83e9faf3020d"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_f4e77a7f-1b1a-42a4-a578-0e45ffbd0621"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bda89f94-fb8e-4632-b656-8841f2546bbe"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_0eac330d-5b21-4338-a149-06209663c25c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_64c719ab-4d29-4964-9921-a4954e320aff"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_40d4194d-b92d-4b19-8d85-631193e2093b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f605d920-5499-4750-a510-31c2d99e8bc1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3dae66ab-3610-4660-9bb9-9c63a6ef63e9"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_2b67b72e-1846-4b77-ac53-4e56fee15647"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_53001480-51a8-4756-b41e-c3428ad10c46"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2107ffe4-835f-4efc-b911-96b3eb4d424f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9cbd6e73-ee8b-4fc5-8fb9-402b95370fec"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f68980e5-753d-4582-a3a1-501b85fbd504"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a0a3855d-c910-4abf-b519-5e1636ab25a3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f6b88b02-6b31-4e68-84df-26165486e5aa"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ed5e707a-ef6a-42c3-9354-0d819ca4ad02"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_95909e7c-8152-4a0a-9343-f9af35760d50",
            "name": "Pad 11"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_2ca002ef-b2c7-4575-acc0-d88095f28b9b",
                "name": "Pad 11",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__01938ee8-1007-4b10-b672-6ebb050df5bf"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_2a8f1bfb-f1e2-473b-b1fe-74a50ce96b9a",
                "outputLabel": "Pad 11"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_b28840df-2d1b-463d-a2ad-50f3889a945c",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ecb1c1e1-eb1f-4193-b348-c2fa6c5c2637",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_aeb67a76-22cc-4804-ad1e-e340ffa5c4eb",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6b08731f-36c1-4916-87ec-a785cc40dfa9",
                    "label": "_01938ee8-1007-4b10-b672-6ebb050df5bf"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_01938ee8-1007-4b10-b672-6ebb050df5bf"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_4371216d-77e8-4b98-9a07-a6eafadf83cb",
                    "label": "Pad 11"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_221a63f1-3c26-4f1c-bd11-0922bc4388e6"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3d933369-16ec-46f0-ae97-d9fa343ad740"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_0e17d85c-0cb8-4be0-a15c-8c6ff016a47c"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_a9fddaac-6c20-4925-a2e7-fa31b6d41940"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_c4118b98-9e6e-4983-88b4-a09ed3b3f22e"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b9bea337-c8cb-4ace-93bd-2adc37a465c5"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f0a9fb2c-fc8f-4515-a122-7f98b74f6a5b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_76e48320-c385-4e9f-80e8-1ce9fd193e75"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_2f6ddbdb-2324-4d4e-92b3-31a6dad7ef83"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d96c6f8b-4bc5-4784-8d78-313f91986b58"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_df8ce5b3-9b5c-410b-a820-c647c1c5e26a"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_de9d9e44-6d2d-43f9-98c6-3271e27cf4c4"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5d8a07b0-0f22-4aa2-890c-703c3f99b1a0"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cfe1d32b-5b92-4a9e-9f08-56bd77f87bcb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cd2ab33e-e02c-4c34-804c-f8e58eb1c00c"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_67162263-d873-4d05-ba48-ab80da1133e0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_72b32463-12c1-4022-a99a-af13fc713bca"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_4fd9ebcf-4fc6-4617-936b-a8d7ce10930e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5a980cdd-015c-44fb-97b4-c074297923ac"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9fd014d9-5237-409c-80bf-7077b7cf0003"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f405e69e-8f75-43a5-878b-08b5af68fbdb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3b6768fb-6567-40f3-ae53-ba0d2906dc92"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_7b55b07c-c8c9-407e-b98f-613d96f80a15"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_e57b0e6e-ea26-471c-8846-0461d1321a12"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0c7fdac4-3f51-4880-a5bd-6b847305535a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_49c66877-3663-4674-a5c6-ccda90cbc3f9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_65ec9093-3773-4054-9a73-46e26c1b855b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fae578d5-b99b-4a1a-a852-5ebb0c244a03"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b9f50599-bc65-44a1-a993-5ca48568af26"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d643294a-09f6-4a23-b247-d1c19e83b749"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_88cb0c49-e374-41d8-b8a0-60eb2a280b98",
            "name": "Pad 12"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_2c16233a-7926-4cb5-bafa-bb89b82f370c",
                "name": "Pad 12",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__4420be2f-e8ca-46e8-9eec-e9036076fbff"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_fa4479c0-499b-4ce7-b50f-3d20f36d44d2",
                "outputLabel": "Pad 12"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_d809b118-cce7-4416-b8bf-58ea2dbe3eaf",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9e795d8b-0196-435d-85af-4d865d608e7b",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b4ffe939-acbe-4544-8efb-c1e9e7896145",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fb0b7e74-4e5a-48f3-b975-fd6e872422c9",
                    "label": "_4420be2f-e8ca-46e8-9eec-e9036076fbff"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_4420be2f-e8ca-46e8-9eec-e9036076fbff"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_376f8ce7-7fe3-48e8-ab4e-145b2200671f",
                    "label": "Pad 12"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_573b6043-4a0e-461e-8258-b09a387f5286"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_143d6638-d19b-4bd8-9c34-b9f900a4468a"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_d9ab5e3c-4990-4387-bc83-1b3acc49968c"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_7af0948c-f917-4c67-acc8-a38a70d58e7e"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_e5850d7d-54c7-4f9f-9ca9-5917c9e201b3"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ae894700-2e55-451c-a536-740bfe6e9c15"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_81ec42f2-6eb2-45f1-94a0-c57475862670"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7a4dddef-98af-4a52-ab75-dd05af46a6f3"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_7f19af46-11ee-4a8c-be49-2a5fe23131aa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_39bfdb1c-9927-47cf-b8e8-8aa4d141bc8c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bec24337-b845-4ee6-9ec8-c951a5795ca6"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_73eb284d-a78f-43e2-b854-46909c3b1584"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b233b0d9-7e66-4375-a151-69b784213459"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b3f1da46-93eb-4e66-ac56-3f93540a11f5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c11d9a05-97d8-41ff-a75f-4ce584d61797"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_bdd7939e-78e4-486b-aac9-b862ffcf4f67"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a666d49d-58fa-4132-893b-e9dfd2c4ba1f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_4cbd5663-4c9b-4ad6-9817-ae03066180d1"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a76f53ae-9aaf-4a34-b149-004ce93b4051"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7e705b5a-defb-477b-a337-5caf4c9f3c23"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f0c50080-2e40-4e88-9156-a6ffe6bd3f9d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fbbea18c-2be4-4fd1-a960-4bc43eb2b45f"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_ea76226a-0a6b-46d7-b1e1-cb42835e642a"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_26c653ef-bd0e-4863-b860-7824dc7e7cc0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8e820bef-624c-4267-8e8d-c7c5d0b9cae4"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_66120792-6ffc-450a-bda8-4f6021be5bcb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5f717cbc-be8d-4d0a-8069-adb23d1d2a88"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ea5682c7-7f0a-46c6-8a0b-f08e99d1be8e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1d5c79f1-1315-4ca8-88be-c8fb681a86c8"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_bd730b0e-4689-40bf-8cae-26df199c8df2"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_78560a10-1a0c-4772-96d0-176625a374eb",
            "name": "Pad 13"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_d12af0d2-1994-40b7-8414-cece1d87e99f",
                "name": "Pad 13",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_de2f6fb0-794b-45e5-90a3-3f9a005eda1f",
                "outputLabel": "Pad 13"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_fae35597-3695-479b-a201-2e67ef71a258",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_da1867a7-5807-4f4e-8e9c-bdfd0390326b",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_331e3070-5ff7-4f8f-9a9b-09de8e3abe73",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_bd2a886d-8eb7-4bd1-a4d9-7ac23f322a7a",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_9b4867f3-ec57-4901-afb8-37e5ac0cc25c",
                    "label": "Pad 13"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_a37a781d-9fd4-478f-aa40-3560c9a0be4e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_2b0db831-fbcc-45d1-be87-0c4897c79fc9"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_6eb51381-66f3-4652-9a9f-dd198c9d4e4c"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_80295ac9-7a89-4272-af0f-10a0104659e3"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_77ac66ff-7e6f-49e3-9824-32e5ff6f02d3"
                      },
                      "dmn:text": "\"Voorkant\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_90a4677f-2039-4a66-bdc6-532992fc468c"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c93d2a0f-8be4-4c5f-a12b-848f57b15d3a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ddab18dc-3960-4daf-9c3f-6049e7cc1331"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_b48d849f-b75b-4a84-9a8b-53e07e160566"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_68a41f8d-cb05-41a6-9779-5cd5ed2eb14c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_138558ec-9e9d-48c6-b073-096e05f5f0b3"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_526ac4bf-fa96-4279-b1c1-ad95a69d4fbf"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a1af005d-f9bd-49f9-ba97-2ee34403151f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_db137e0f-120d-4c8c-b89b-7652e6877f40"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b7c61579-37f6-4a73-acd6-1dca8f6c3a61"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_be227abb-5b52-44bd-bcf3-ea8c180c38c6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c1a299ee-8a2d-44b3-adbc-4286beac5e0c"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_11bac3b1-873b-4063-b18f-753c476a4097"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_84e57bc5-bbac-41e3-a6bf-937aa0e02b7f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_4276209f-1249-4b21-bc01-e75994cd1ec4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7aa8528c-fded-4389-a1c3-4de3869039f5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_59331dea-ad62-409f-8b73-7c1dc25d4697"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_4ae4c622-d485-4eb8-9859-4168106c6817"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_82b5f719-48ed-4b54-9f42-3f9c31d190c4"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_03678a8c-7093-4927-b083-9c6bf02d8800"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3a0f14c5-8a14-4e6a-a3d1-8879dcf05e5b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d2545f2c-972e-472b-aee1-e841bc098224"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5d3b9b1-d0f5-4dc2-890b-dbc0ba757d14"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5a670beb-1894-4f8c-92a0-421c4720f516"
                      },
                      "dmn:text": "\"Zijkant\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_5b7ecdb4-2e18-44d2-83e2-b3c9c106bd1a"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a7e65e56-ca84-462a-805b-df97e9c385b5"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_1a858f32-e235-4bd5-93f5-8bf895102d59"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37ea4700-d13c-407c-a466-7af6687d310b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_94f25666-e915-4fa7-8b5e-81f2ecedf2f5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_20cc7e07-0bd4-4ae3-a58d-efce36d64adc"
                      },
                      "dmn:text": "\"Achterkant\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_6f899213-47ef-4fef-be99-ed51cd3cca8f"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_892f244a-7f60-47e6-bcdc-cef40fa6e14e",
            "name": "Pad 14"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_50f620d2-b725-46e5-b62b-41447e308b86",
                "name": "Pad 14",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e097c508-67a8-408c-9e9b-b813eda85db0"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_12e7ca17-629f-4d6f-9fc6-8cfaf729e158",
                "outputLabel": "Pad 14"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_4795c26a-6841-4d4d-bcaa-b3ba0d0e5060",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_84b5f71d-cd6f-48eb-abda-81ff3bb2fe27",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e2b1688c-8cde-402b-85e4-ac8b458c0d66",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f3deb070-85b2-47b9-9c6b-b39efbf7710c",
                    "label": "_e097c508-67a8-408c-9e9b-b813eda85db0"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e097c508-67a8-408c-9e9b-b813eda85db0"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_a58628e4-2526-4d54-959a-aa7a2ff056d1",
                    "label": "Pad 14"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_f55c96f7-54dd-477d-9093-b70ae2bb7730"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c8f1b4aa-4579-4102-bffa-b9c5a985e5ca"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_20b3811e-b2d0-4d81-84c8-baf778d55398"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_54b8d389-f0c4-4a14-b1e9-e90ea83b154e"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_ccd2acdd-0b5e-476e-a1f0-cb968b55d656"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_764566e3-c9ad-4d58-9ddb-14f3c69cdf21"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a53542d3-e614-444f-8067-b241384ed54a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_724de503-6513-4261-84d7-5d2ed8c2b4d4"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_c138f4a0-bb54-4238-8d47-fd1a96d1331e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_51f2a9cf-bedf-48d3-a354-73cbca826034"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f8488350-fde5-4dc8-8cff-c82c6ce069fe"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_5466f933-6149-42b1-ba81-736759f975d8"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_563dd6bf-d861-4549-b782-71232f04d160"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_660ec6fd-436f-4995-98bd-1eba60cf9c87"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fde85fec-afbe-41c9-8cca-1f7a6214c9d9"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_fbfe7c98-1d3c-40f0-8c94-e47ee5cb8acc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a2d30625-c8c2-4981-a0aa-68e499c1506d"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_363af16a-4021-4287-897a-8c94a8f6d153"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ec31d036-1756-434b-ad0b-fdf4dc96e513"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_397ee70d-c21d-465b-a62f-9875333d3da2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e162c8de-7c75-4519-8fcf-501b1df31c01"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_584c58fb-442c-4aac-b184-6b1c29d27f0a"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_db95fe45-e3c4-4416-9f42-c5b47988a562"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_1bec00fd-a2ae-4b3a-8ffb-509e41c0bf62"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_56a2dc2b-b31b-4c99-a8aa-3bc698ece350"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9f34aa19-3b20-4ac9-b115-e7ca6eab0190"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c3d41fb7-2e00-41a2-9413-003cf5408e63"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4eb67381-acdf-46a2-ba4d-5b7a3f1a6dc7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_114f754a-70f1-44b3-aeff-d1b492779ee8"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_54c51617-e1aa-42fa-94f0-6c79b84f17d0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_1cd776b2-5cca-434b-b93c-3f8c84c59afa",
            "name": "Pad 15"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_5cf7caa3-3e51-45a0-a7e8-48373b79fb3e",
                "name": "Pad 15",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_fa25145e-e3cf-4bfe-a070-057e4d721e55",
                "outputLabel": "Pad 15"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_e71cf0fd-34bc-42e1-91fa-f6d30e2d2fdb",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a25c97aa-10e2-44eb-aaa2-394b0dab0ff2",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_85910e6b-727f-4253-84b0-99fab4b795b9",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_735de136-e7c8-4eb3-b7a6-a932c6728413",
                    "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_49417166-87db-44a7-883e-4184336ce4d5",
                    "label": "Pad 15"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_861bf435-3b8b-42a2-b263-b47aeb6fa9e1"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ef10cfc5-b52a-43c8-9b1b-543f54ca7199"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_a117a319-8d24-4d27-aecd-b25a63651ca9"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_291b7cb2-c780-4871-a527-9c13e3d78783"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_7eb71578-e6c3-4701-b03c-a1e2f143f414"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_2468b200-c6c6-4597-ba4f-11ffbce03b60"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ce641a1d-40b3-4656-9d8d-f03553052102"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_747e7a65-a48c-4a21-aee7-81d92f1e527c"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_258acd7a-b309-40e0-849f-186687c1993e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e3101286-9b4d-4a8e-bf7f-dfe202852e72"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f1400a2c-e42b-4fc7-85a7-b86be37bf316"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_dcccb068-f2b1-4a59-a838-9798b37521bc"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_179dc837-074e-45f3-b222-814e6fc7e5ab"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_a7e5d50c-0d00-4af8-9e2d-4b3eb40816d6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_74d14010-a662-4142-ab2f-ac21c034a9c6"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_6221c195-5699-477e-842e-52e55bb5e5a2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_83166d77-ed35-49d6-9270-bcf8374df0e4"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b49dfdd2-e235-40fe-b763-b3d62e01ccc5"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_02109ecf-7f7c-432a-81fa-12a4581788f3"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_4adc2184-9592-4196-b1fe-0e3a308fa1fc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fb2e6d02-0fd3-4eb3-9c4b-890f2b9e55ca"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b8671c63-978b-4266-8659-b242211fcecc"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_bc43fd6d-1957-4d6f-8ec6-5fc23be6eeca"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ed528ee0-b5fa-4c88-9e5d-707f2fd9db21"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0ddc2f19-3fb1-41e1-b483-701ad020c9a7"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ac6f555a-a1f2-40f0-89bf-9a836ca685d4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e087d8da-d463-4755-b06f-8d98753273b0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2ca358f1-2765-4b16-85a6-3d7872696d4e"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_6fc067f2-fc49-4f8f-a464-d38243da6277"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ee2d3706-a9e3-4204-914f-58a4927e323a"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_50d13ca3-31f5-4292-a704-f36966e1f3b8"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7dcdff46-e1f0-4218-bbec-6cb0d3dd9365"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_84624136-6d08-4d9e-83e2-d06d9f1168fa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e60f3cfc-0cc1-49cc-a668-e8929e56d642"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9287876d-db70-48ac-9dcc-2770e7539662"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_46678dc0-15bc-4c4b-b310-9c9f6da1b113"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_071fa50d-938a-4faa-86ea-d46f27a3e172",
            "name": "Pad 16"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_72bd221a-61b8-47da-aa7b-57d5670c8c75",
                "name": "Pad 16",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_d73e683e-bcc9-4c30-a118-6e1df1e4770f",
                "outputLabel": "Pad 16"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_54f490a6-db0f-4312-be25-f52f9f63b681",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_12b244d6-42d3-4e5d-8abc-cb3f028b99c6",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_eb593991-a802-4b41-9896-c5952ba754a3",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f4d35c55-0932-4445-b4ef-2ac0d564ec62",
                    "label": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_bbadbcf5-6e57-4ac0-aeb2-71bea7d3432a"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_00a65dc8-2871-497b-b229-e63716a22e0b",
                    "label": "Pad 16"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_6b869eb7-a822-4b26-9641-545d1de4e40c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d9f59ca8-18fc-4d24-8fd0-89cc15b2bf7b"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_ae851aa2-b017-4886-ac47-5eb64b76f9cc"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_76dcb48e-325e-47c0-abd6-0f3008c3f56f"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_d662234e-f3e1-4cfe-b499-000a945470ab"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_11ecd776-cec2-41bd-b534-9946bb753afe"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5d278e12-6616-46c5-80ce-01a3b3d332ef"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d721c09e-71ff-4a3b-b6a6-0c3b3094bbc8"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_6dc83c18-66f8-4c31-b3c9-2be85d7e0490"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5c169cc3-9511-434b-9219-ce00e42ac0fb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0d94a0cf-33db-49ff-9f19-c6d145eb1d97"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_576a4638-7818-4fef-b226-b273f294429f"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_27c14f2c-f8d2-4a03-9dc1-08461143af31"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9b6bef1f-9062-481c-ac44-0a2eca64cdfd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9466ade-83bb-4a6f-98f9-4aec64dc64b9"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_3d4d4b37-92d0-47d6-8333-51ae9802cc22"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d2c3febf-8afe-4320-8148-4223035ae21e"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ac8f66b7-88dc-4f67-9c66-e7a5cd457682"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fa8b58b2-6b56-4f44-a083-851abb03ca31"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_4a29d7b6-bdab-4c13-8a45-69064292c3c0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0793af5d-3937-4f79-b2c6-e33efa76b52a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3ba8821d-fa1d-40bb-af8b-e1df50df497e"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_2f7dd317-b7fc-4084-9813-5329b8f34ee5"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_76dffec3-d210-49dd-b854-29b2ec3c85d4"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_84b3403e-971d-4bc7-b1b1-fa66de246fe6"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d96ee0de-3353-4ea2-a6bb-c7b8a44a7d06"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3b17f846-ad0b-411c-ab5c-1d6fa4e35d3f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b268d34-5f80-4730-900e-a79d9001df69"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a33a0bd4-d222-4a5c-b2b9-8deefb032240"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d3ae0197-0420-4929-8de4-f2f23f022cff"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_5c6ebae3-e223-4522-8e74-1912d758f746",
            "name": "Pad 17"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_1629aad0-6377-46ec-b187-99ff84b3aad1",
                "name": "Pad 17",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_f50b5fea-a8e0-48be-9fe0-d6ceea38e472",
                "outputLabel": "Pad 17"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_da75c3b7-9e8c-4d6a-a933-5a98b441a812",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4b93f692-fec8-4da0-9545-aadd414b326b",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5589828e-b383-4eb5-9c1c-40bef3eade2a",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e3998b0f-02ae-4ef1-ba11-dcb83d0b6312",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0a2fbe6b-dfee-460f-a80f-120ecbab343e",
                    "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_7b6efcd4-51fc-4ec1-9330-9c76135ecdd0",
                    "label": "Pad 17"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_1b9f6f17-6790-4257-9722-e40f83d0c6ce"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_627e5e47-aedb-4ddb-b0e4-d3d3ffe567a2"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_bc85f4d8-8f4d-46c7-8ee1-4c69a7c21cf9"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_6d723936-0093-4286-9a87-0ce654a0d2cf"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_793dc087-db48-40d8-9f36-132ee7c215b1"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_636a7eb7-fd6f-4647-b050-5886a5c93e4e"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ea20dc78-ff5a-4138-b603-8d704f84b493"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_513898fc-b7cd-4668-ba8f-6fdf80e48bfe"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_adfd64cd-3c41-461a-ad68-0095fbf9ed49"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_31652db5-ee93-46b1-bdad-57ff34cebcdc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_141fb913-c795-476b-b0cc-978356df2d52"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f62a1f4c-25c4-4c77-814c-31b65c1f220e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9f00565e-befe-4bc6-bde9-943781030507"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7831df3c-bcfc-40cd-a633-ee4abc0c4a1a"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_53032a9f-b980-4f91-ac47-a27a34286c6f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9e74c04f-1307-4664-affd-750e1cda21cd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_91694145-fc2b-4a34-b651-ba1d04f0ef78"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_c0b0b904-159b-47d4-928f-539e17260671"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3957ae3c-215e-4354-8b88-8531c5b15349"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bf7a19ff-18e3-45b0-92e2-a898e28ff45e"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7c4f9c7c-4aef-41ea-974c-f31e5a6ecee9"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ad6b8c4a-3feb-4d2b-9948-04e010666098"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ea26b5df-7e1a-4dac-bbf1-8d522cbf146f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0700f197-6228-402a-83d8-bd1aaa7e21b3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b21f7ad-b31b-4fb9-8fc7-2a727f0a2d6f"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_202d0415-ed41-4897-ac2c-5782c43c72cc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8b41e908-79ae-49bf-a3b4-9c4d4e2a2de8"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_beca8e84-c29a-43a9-8a38-6d5b9ba1113f"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_99ea3a69-6a18-4da0-a29a-3c1f85fcae34"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_0c569e00-2188-406f-a26d-1643254c2163"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1fcd4e32-4312-4828-8fa9-21bd23b5b4ce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eb2527f9-d43f-418a-b8aa-84bf32092049"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8ca0da6f-f0ab-42d1-a715-8bcaf861c4b9"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_59183c43-671c-44cb-8089-22e4f3f7992f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_5ac7eb5f-db09-4ce5-b859-e23f95ecabb1"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d95f943f-4aef-456d-86f2-f32b93dc1754"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f3574df3-42f4-40a3-9033-fc217334dddb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6d5fd4fa-0eb1-4f18-a19a-dee81fe10889"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_da0558ee-ed92-4045-852b-89b9e9cd302a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_93832993-6a0c-451f-9929-def6c5d871d5"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_b56cc806-839d-42d6-a693-4803079bb609"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_92bd6f35-fb5b-4490-b629-8bdc0ed5dc5e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8de1a31c-1542-4e17-b5d8-9cb1d7f5893b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_38568882-3705-46a4-91e4-aefa58cc6106"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_75a55361-966c-44e3-9180-a471b6a15b17"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5f01e11e-4ee4-4456-ad95-713ac02a8204"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f0a7590e-4770-4afa-b11e-496e7d2e7076"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ac7ca0fd-f324-40d2-90a8-51cc6c2106a2"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_abd212ac-4d2a-4181-9e60-9c4329a94109"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_4df053a7-f2d7-4712-8725-57785797a741",
            "name": "Pad 18"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_a470ac43-a666-4250-a5df-9f79519e8e7b",
                "name": "Pad 18",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_9fe353f1-a4bd-4f30-9d18-7c5f08b8ff21",
                "outputLabel": "Pad 18"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_4f7ad096-0e88-44b8-88ee-d74f7552e98b",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9e1b36f8-9951-4c81-a492-d1a9228e9d1e",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_1796dcaa-9978-49f2-91fc-b49069ab215f",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ddeff628-1fc0-4769-bb1a-4c18b40d84b1",
                    "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d0e19ab1-4ec9-4071-9272-7913e274eebe",
                    "label": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_d8a4c67a-a6bc-4877-8116-98672aeb136f",
                    "label": "Pad 18"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_9fbcad7a-f0aa-432e-8b7b-47f731c64f92"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_442e149c-f7e9-447f-acb8-8727656a25dd"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_703af098-a238-403e-bb85-112ffaf2c8b3"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_f2682360-d6dc-4436-ad15-047b0159e1f6"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_7ed6456e-8aee-4cb4-a7ce-deb6d8e8803f"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_c1298437-3718-4044-863f-7b63b4120c42"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_bc6e4ec7-bb50-4bb8-bbb3-9bfe9670cd1a"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0488ea91-4b09-49be-aac1-fde498dd32bc"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_6d1e5615-a571-47c5-8b9f-aa6fc7d7aa5f"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_cfad04dd-6332-4a6c-9d64-330388498014"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_012d16d9-12c9-4f1c-9012-9961ce290d20"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9eb87118-9ff0-479c-9776-dbdec8223f34"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eebc7eb5-df64-4f9f-9dea-00daf8a5d36d"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_db013135-fe4d-432d-8e95-10b110d6ce83"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_bd9299ac-8b11-4477-b4b6-64a053bc4879"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c96d344f-980f-4040-bd30-d09af2ddf603"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7530d66e-d1ce-4aa4-bc31-2144e2f76d44"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_04445811-2dda-4579-9d0e-48c4cceaad8f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3f2ee1d0-083d-4401-b474-f9ae0fd1fc06"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7f22f209-0772-4344-ad0d-c090f2e9ab72"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_17579dc3-fafd-473c-9403-a908946b96ee"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0b51f47d-c4a9-4c47-8363-f0dfe96763f1"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9662b92a-d7fb-48ae-9dec-c31c7e29e736"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8f44599e-2b36-43bc-a967-4f43c1365752"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_08196d7c-7693-473f-889d-349fa4190115"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_05ebd996-d2d0-415d-81a3-7a9ce65c2d0f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_987f1422-1f68-48d4-bf2a-216902d62197"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_3e49de30-d66e-4c20-987b-a1dc37432245"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_cf575b36-c7e0-44d2-88eb-da756f4445fb"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_97ca7ac3-ea3c-4d7f-8f05-e7d0a05d5501"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_33f8e0bf-5378-4cbb-97d2-111eb21331bd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d8ef2e11-d994-4e52-a3c5-1ba1c1c26364"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_198587a0-01fe-47d3-9942-e0c766c06071"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7d1718f1-0689-42d0-9142-f6827d8930b3"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_df649b57-3c3b-492b-b3a0-f5a9c923a980"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8ba9866e-08de-45a0-8be8-6074a57fd44b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_24c8a0ac-cbc6-4830-addf-1416e3b3477a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fe91bcad-7d28-4770-bcb1-2d930b1bba2e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1ed254c1-c924-4165-951d-cd1e21e27fb5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8d3f6ef4-a916-49ea-9c88-ac377bb1a944"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_af64819b-6398-44e2-a277-041e963adf11"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_e130c7fb-70ed-42f8-8324-fabd09d381a9"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f29aaec2-b6ca-49e9-b4aa-62a3ef3506ec"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7fbccb5c-3315-46f4-80a1-cb14d6b74468"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_145463e4-08f2-4d67-add8-3d5dfc4b35a2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5c03b77-8d5f-4ea0-8d6d-50916267d9f3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0daaf371-ff91-4345-ae23-6df73d87dff4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_75ecdf9c-de5b-4c36-8b36-f784b453ffba"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_851aadac-0131-40a5-bbff-c5ef181eb2cb"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_51320ec9-6468-4cc0-8753-d660aa10a6d6",
            "name": "Pad 19"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_62aa7551-a785-4f59-a697-a9cecce08a67",
                "name": "Pad 19",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_27ec5f7c-d67d-43f4-a43a-06f13307449a",
                "outputLabel": "Pad 19"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_02a71d42-3c62-4f93-a9f8-5839df7c3cc3",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5fff4716-dd86-4573-a28b-ba11e92ec49b",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_03ae0875-6fe3-47fd-ad63-06df18576154",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_28acb9be-bde8-438b-bb7d-3d50442968d8",
                    "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_57998eb7-d0f0-4033-86ae-e0b3490bfd69",
                    "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_4a7a2c10-7dbc-497c-91f1-7adc8e0ff37f",
                    "label": "Pad 19"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_17cc9d84-f3a2-4790-92d9-f665d58ac399"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_42817e0d-aabc-4c2b-b8de-b7a8d5d41f48"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_b04fdbbc-1014-4103-8d16-afed8f0846c5"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_dbfd7edf-20b6-4ddc-9f28-9780764ed0e2"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_c7bc6503-05b1-4de3-9176-245306d41e2a"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_764cf2f9-eada-4134-8c32-2bb03cb08827"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7a4c47c2-f420-4680-ab7f-a316eeeb74c7"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0ac93c8c-d52e-4b0f-8fb6-a3bb676fe27c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f1f38682-4239-4da8-9cdd-47e4e9108800"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_ccca482e-9793-4e2f-977c-d484b0c8de4e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0ad2ef28-0157-4f05-b5fa-401778a731a8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5c9a753a-29b4-49dd-92c9-860156c87d13"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_05f033c0-4dcc-4a0c-a981-705ef805f01a"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c48dc8b6-9d02-47d5-b92c-b954824f6cfd"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_dae099bf-370f-47f0-8165-0e15d7cbe74f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_20167c82-56ba-4226-bf7e-872aeb6c48b4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_63fa1f0c-9da0-419b-8ecf-782db20f09e3"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_a5b51053-3ad0-4a7c-a671-a96b34b7de84"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_59153ec5-ef1c-400a-8496-0b45657a45d6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e3cf5de2-b4b7-4e50-8a9c-7b77477bd4fc"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_93bf245a-406d-4e0f-893f-b1fb9fae86a0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a60baba3-6ecd-40c7-bee6-7f21b54e113a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d4824ea6-6502-490d-86e4-61c689751892"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_66e6a14c-c991-4167-be70-7b22f3306aae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_827d8cce-5276-4ace-84ec-d08929481fa7"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_0371dec0-5106-47c7-b327-f2e240b1dc91"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e09d5282-9fa8-4a07-b1a3-7ab1494188ab"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_f4a2b412-053b-43eb-a7b8-d15c5a808391"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6325da72-fb84-40f4-88cb-8cb5d605bb11"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c23016ee-b2db-4a03-a6af-206ede830a2d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8ba86af6-5ed3-40d7-a7a7-0892a5f69ffc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_63a7605e-b1a9-4348-8647-8c263bc60abd"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_5e1634d2-e12c-473c-b0ae-39064a921454"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_af7b221a-f923-41db-9042-66beb9964cef"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_bf1be913-6fd9-46e4-a9e3-d06ae56aae57"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9e78b320-3a70-4039-a81f-be604caa7209"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_57c9d5f6-a163-4ec4-99b3-f42d96c9c5b0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e007ce80-c3b8-4ed0-b22d-fd13fa789d7e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5e9ceb57-62a4-4bda-9523-d07bcc993c3a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e131cbda-d896-48d2-9a36-cf25c7ab2d0d"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_dd0c7205-823d-4bd7-9681-f3630173cd88"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_8b572ea9-b95e-4445-8570-766fd0db66cd"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_842ac4f0-a064-4a73-a691-08b3110ae06b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_5a8e7d9b-9b9a-4ad8-b6d4-31e67dd4316e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1fca60a8-caa9-4d8a-8fd3-841a66a08a0c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_23bef83a-e283-43d7-8401-8c4ddae9b761"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a9666c5c-7862-40fc-970b-4de71601577c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5426baef-e281-4d14-aac4-cf571233b6a8"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_a34adf71-fa84-41ee-8a58-020d33295742"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_2b0e5009-ce05-49a5-b7e5-d572ee0f458d",
            "name": "Pad 20"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_f6272daf-ca0a-4ba1-ab07-b05dfbd410b5",
                "name": "Pad 20",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_53ba3a0d-9485-4926-8bb7-48a8a04640a6",
                "outputLabel": "Pad 20"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_3fd74a5b-ff07-4ffc-812c-a2590cd243fa",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7450b3f6-102c-4f7d-bbfc-4239d4f8c9c7",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c6d7cd05-85f5-4232-a7fc-1c651be4e53b",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_45bc4aef-84f7-4e00-9bf3-f9afd96ffcd9",
                    "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0dba5dd0-2c98-4ceb-ad86-3ffe7e422b6f",
                    "label": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9f38bc4c-1580-42fc-9bcf-2d2c9f6d91ed",
                    "label": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_6d078c33-870c-4dd8-873a-ae7357ef51c5",
                    "label": "Pad 20"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_63c1bbf8-c48d-4065-8b0d-f87c6c6c893d"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cbd8b705-fcd5-426c-8897-da5e4ae89453"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_2ac24f27-e07a-4c21-8d17-f0d2a38b5c05"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_c61cb62b-3aa9-4183-9bab-488dbe459cbf"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_8c769d9c-80a1-4fc1-b5dc-9f1319d086c4"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_02a75eb0-ae7c-47b5-bee3-5ca61f94e401"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_263c09ff-011e-4d0c-817b-1b9a6d44b5d4"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_f3305516-0896-4c23-bbcc-3cc28ca87e78"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_81f60a9f-7150-48e2-91a6-154faa2575b9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_a0714cd0-d63f-4c09-b477-e0f055826b5a"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_a1afa9a5-d496-47f5-8050-9cbac48fb815"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_256265ec-d199-4c60-9089-233f958255ac"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cc3adecd-571b-4b13-96dd-3d9cf213e14d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0465cdf6-a954-4a88-aa9f-5e6c33f9fe7c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b7e20b30-2b9f-47e2-b1b8-f20e223476ba"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_14828e0f-fde0-417b-be12-8624c0fd253e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ce771ecf-e99c-415f-8f46-4b1e89d9a882"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9d0f45bb-318f-4644-8cd4-a1eae79f5c50"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aced63e8-0cf6-4fed-8414-39c643b6c57d"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_aec03692-3ff1-47b3-a539-cd1d21ed5244"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a88358d1-3b2a-428c-b8c6-0fc21f499e91"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ac06bd33-8c2e-4681-bf26-cad9d2078c59"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8de56092-f3aa-48a4-af0c-36485250117d"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ffef64ce-3565-469c-8cc7-ca179f6f0a46"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9cccef97-fcb2-45b1-88d4-140b1c93506d"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b60a5a29-9d9d-439e-ae15-941a31e6a963"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dfd51b07-ebcf-4253-890b-b6663bf4f3e1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f25f55b7-3dbe-4866-a91b-e9759cc66247"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_6840f4f3-2ba2-4cf5-8ac8-89c950af0978"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_04857d65-4e97-4fbc-b9f6-3d683bd840ee"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6795db48-259b-452a-b0a5-012b6ae8d4b0"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_fd1cfd25-1dd9-4b7b-9997-dce630f5a846"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3b4d9ef3-6144-46d7-b06f-d5b299b0248f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_399fc792-08b0-479b-a2c8-7ade6a757ead"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37159c6f-1964-4ab7-a6a9-9401d06d2aab"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_07f5fb4e-d68b-417e-9b1a-f4cc3fb1f4b3"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_5d73cd8e-7aa6-4137-bd00-8fc4098787ca"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f6b78cf6-2b51-4605-8a42-335c1f0a5069"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_97fe4e39-052d-45a9-87ed-e651f9ef4654"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_dde04f4b-1c01-4c6e-ab54-5e4a1ed78fc7"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_da5a3397-5f21-4b9a-a4aa-3366e639cede"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3516f8aa-b02b-4cbb-91dc-93fb76a8de02"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3ec8ac01-c64a-41a9-afeb-daa7d14bb2c1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9de1e4c-8341-4d80-ab3d-23c4211092f4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c31016b6-26a3-47df-908e-d97c737072e3"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_b6dab41a-108a-48e2-ac1a-f3a6895b5fac"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7d3cf6a8-50a9-44c5-b470-a131a67236bb"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_91dcd294-70a0-4673-9626-77fe1adf9051"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8431190c-dc6c-4c45-b0f5-7ac8491da3aa"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_6ab52207-6195-40da-bbbc-1229360a410b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dc44139e-909b-4882-92c7-9a8254e7b901"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ed200a94-31c4-4c65-8bd6-24dec8863460"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_402e2eaf-657e-4c48-89a9-195580129979"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fec2e812-dcd0-4ea5-ba93-b79a15855824"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_b49680e2-ff41-4fac-8355-4634379780a6"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7d2c635d-f68d-4e16-bcaf-bba7c44e686e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_14275ca3-cdb5-44d1-915b-37b647e4ae29"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_03148d8e-3823-45ec-9310-988850e38eaf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_081d6524-10e3-4ec9-be28-0444eb044916"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5de6cb1b-b0a9-4563-86a5-03b8fc4bfeb3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eb773ef3-83cb-40d5-a251-dad7b18bb1bb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3e489f4f-138a-42fc-890c-997677a8de44"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e4245ed8-3491-49cc-9cd5-77ce7229928c"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_5017ff33-7232-4d2a-b22d-34a62b4c343e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_9f13ee69-963b-47f2-9954-8a3d12a33c16",
            "name": "Pad 21"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_71f6ec32-d776-454f-85fe-5e3bf04b3364",
                "name": "Pad 21",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__1c4854f4-ea25-450b-a7f4-734203024943"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_1098d3ff-3fed-4e53-868a-4acdbdd397d3",
                "outputLabel": "Pad 21"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_efa253fe-69b3-498f-bed5-c03f0872f179",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0e2ee997-1e09-44a0-a670-40ef77e6f4d2",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4e1ddf19-c7c2-47ef-83d8-00475a1bde2c",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c236fa89-9ccf-4024-9964-3548bb5d34f7",
                    "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d5401092-9ed0-4571-bf3b-3fecf5bc6e78",
                    "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_625ac6fb-8c24-482a-bb4b-c61a6cfcb9bc",
                    "label": "_1c4854f4-ea25-450b-a7f4-734203024943"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_1c4854f4-ea25-450b-a7f4-734203024943"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_01e9cddb-59d1-4c2a-98d2-5edd3a563844",
                    "label": "Pad 21"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_0adce0b3-71bc-4e3e-95a9-222788e76910"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b0c2a77f-7869-429d-bc0b-2bd632723e77"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_4064c011-933b-4ff2-9287-6146410bb072"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_ddd9c18a-e6a5-4aa2-8599-fa0937a3d598"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_779d3da9-4f6d-455d-aec3-a27a80919b82"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_ab274bf2-9482-4f73-a882-0fe697256154"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_e8589f3d-6867-4eea-b4df-1d02df903836"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_750027aa-2a57-4fb9-b694-02f83c082ec7"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c86f075c-2bc3-4cf2-8543-b84adfc0ff72"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_15bbb8f0-71cb-4265-b7d3-5e352f2ed1c5"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_30ef2f43-0a9a-4c5f-8cb8-c427a664eef3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a016b4ae-e9f3-4fe7-9301-4a1f1a4ec8cb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2be31ac8-0e61-4672-be03-577a7b01cac9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dd7fd104-ba11-4683-b466-e1883601d243"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a0e0e071-6c09-4cd6-8d47-4d9d63c5433f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7b2264e8-4148-4cdd-a0ab-7a1bedc3aa17"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4258a964-0891-4cf6-8e8a-7c6d1bb2ef89"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b211e347-0fab-4ee6-9c07-c6d089e3514b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3c302c36-bde0-42ee-8cf9-c9a4135d03ee"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_f9f34b08-89e7-47b3-b60b-936300acc09d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b60cb9e6-c1ea-49ac-b8c1-4c68526899a8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f6028648-8d35-4c12-bdd7-c2f299029290"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_77a5ffbf-da09-4ba0-a00e-6358cf04069c"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_bf0ad858-686b-4a2c-ba21-587c5904a54f"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_95a9ec60-5255-4665-83f7-b06cb05d2530"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_212d1807-63d7-481b-a2fe-4701a41a414b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6cae86b8-7bde-4ee5-90f1-fafa45fc9517"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5a0c1651-f197-4012-bb4e-1ceec860da57"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_895bf81b-0acd-48f7-acc6-eea9b57214f2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e61aaa89-da27-400a-b193-86afd1036dd4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9da82639-bbea-449c-841b-2304b2b4d639"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_eca76aac-8705-41c8-af77-63b72806306a"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9b8208e2-6be2-4a11-b028-6a8137edbdc3"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_a9f7a4d1-d944-402f-8d34-8d3391d5b43e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1de7b99c-341c-4439-9d78-dd7e69f11463"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f44ce79b-ca32-41d8-b585-f33228858005"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_a770954b-8f51-4265-8bee-795f7a53f8a1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ea4befc8-e17b-4018-90e1-2621b8e38912"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cd357dc2-1101-4078-9eb1-98626eeb8cd1"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_fea92fb0-bfcf-4ec8-823d-4c1f218e46a1"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b2f26a65-c636-44b9-98e0-880095799f32"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7ac0ae55-2ef4-4dd9-84a4-8c89e2a1a60d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ffa27085-286c-47c9-b298-f8f629a574de"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_056dbd46-628f-4a07-b53b-744a608254c7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_49b7ac6e-0536-4a05-ab64-2a57e27f6c44"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_6c273163-6b25-4f65-af5d-aae0d1ffe898"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c9ff495e-9e92-4a33-99d3-d62693a2fdd9"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b1459d19-4609-409c-bd60-09a0dd6d87ad"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c0f34a13-1061-4707-9cc6-82f749ca4f17"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cae0a349-1f0c-44bc-9fc9-d45b74913c76"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dd3d2b24-4916-4bb6-aaf7-6368638fae6f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_01336512-0521-4ad7-b28d-54c5ec0565d7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_40b8cfd3-cc25-48e6-9e6f-9dda39a68b3b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_90cdf0af-05b2-4b86-a8c3-1cc0fbb67391"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_758b9383-e168-4e37-9e3f-2e0545cbf6a8"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d47418a8-836f-4e2f-86a3-cdc1a6c7b20f"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_cfc76a92-0882-4972-972b-231cd6f39cd7"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7706ec6e-9415-42ea-98d2-797753f8fe18"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7dd6bbb2-9a3f-40ad-a31d-4500afc61f7c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_83d02cef-00fa-45f7-b6d7-fa1c703e119c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9a2fb38b-f0c2-4f5e-8849-9236d4b7f70b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b1b8049-ba5f-4281-a731-70820541003a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e2f99ea5-48ca-47b0-b1ba-baa5c0b4bd62"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_0ee351a0-1788-4985-b8c4-05773cee426d"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_eb3ea33d-58ba-40a3-a23b-a8f2a7b1e95d",
            "name": "Pad 22"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_b2b143b7-4ff9-4c1c-a554-e1e79a8a14ee",
                "name": "Pad 22",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_3f8dd6e7-a567-4041-ace6-99ec2bc95b66",
                "outputLabel": "Pad 22"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_7af527c8-bc8c-451a-9ea5-8eebc7b22e4e",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_72f09f39-4be1-41b1-b99a-46491b08ab0a",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_22608fd0-d108-4ca3-b4f5-2289b300caad",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c32d7193-dedf-4a18-971f-ef1645e26b46",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e95833ae-8522-4241-bedc-7e0c07a65751",
                    "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ad792415-65b1-4941-8138-f7bea742c925",
                    "label": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_a253e711-cbf2-4155-9c9c-ae51f054e550",
                    "label": "Pad 22"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_2c3fcc7b-42ce-4004-9a7e-d47af6080286"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_66ccff45-4d73-45a2-aec2-a082e617b835"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_5c033f01-a916-4198-9098-636e9daf4ae9"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_6e802bdc-2901-440a-98f2-b8200c77a2eb"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_a2b022ad-9644-414d-a3f8-8310642043d4"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_212bfefa-fbbf-4545-b84e-67152a62a6f8"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_80d199dc-35e6-4465-b8ae-23a1c6fe82b7"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_eebfcf36-4b2e-43b4-92c4-d93ff4559d79"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a9ec49fd-1e53-4fbc-aba4-1c37e816cba5"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_99c98665-a4a8-4658-b481-9aef4c75fbb3"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_27aafe65-12cc-4e12-b04d-dcdbe83516d7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_87f21aca-b073-4bbe-b6cb-377076f2f806"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f353d1d3-cae7-4247-a7af-77165d9f08cd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_563a42ca-2a95-4894-bda0-1204cfefc3ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2d62b754-0802-4d2d-918f-1bd7a45a0d2d"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_f45e07e8-a15d-4438-8ad8-864334768383"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8d41df1c-e98a-4275-b275-6aa9852d7aac"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_fda63b1c-6cfd-4233-b624-5878201aba25"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9ca0858d-96ab-4780-becd-66133b1023cb"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_572a9f35-82d4-4c54-a7c9-eec0a753e432"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0a0d348f-c64d-45af-a6c7-668e3d96a32f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ef53e4c8-04fb-41de-8c13-b31085798007"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_29b7b788-b333-4754-afa9-a07e6c3e2c4f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_5a732524-12dc-4dfd-88fc-e05c90de4b69"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7cf8546a-9120-4296-9f22-b81cc597948c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3092f9c3-4226-4b18-8b9a-4b13600e61b9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_68d9e62a-9ad2-4340-bc29-0b51e8add2be"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_40f0fe13-57c0-429f-9732-110a14f3c118"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_2fca3262-752b-420b-bb31-8e51bc79527c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a15ae8a7-f95e-46b4-bdc4-b6c284b96d83"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4a62baaf-be50-4e49-9be8-b0c96011132c"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b75a52ce-023e-4822-9b28-a2659ab9ac7b"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_021f17a0-1d06-4577-ab89-9ef923671afb"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_2a63d246-bd74-4e34-a9c7-a1bcb3479aeb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cdc6369b-22a0-4f80-8faf-77da6d8ef826"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9bb35433-7640-4559-abf8-05f4c381a164"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a673b792-648c-4d82-b8e5-b6218d3cdec0"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_f32f5387-8281-4e03-b114-3ebcfe9ba0c3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3eea57db-6e5a-43a7-a44d-fb05bd5ff836"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c3e6dce9-2b4a-4d24-aa05-9b8c3abc2e81"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_168ead56-dcca-4d86-a47c-858d950276da"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_50d26284-4b8c-49f5-8fc9-6f8e73a624a6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ce04f438-a10d-4bb0-b35c-bedffd0424fc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_add3f4d4-0e4a-476b-b8e1-6ccf0138d0ce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9aaaa065-fa94-4865-9115-a5aa2d92702b"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_1a51aeeb-dc28-442f-8835-0b57799750f1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f5adcdfe-c7d3-44b6-b52f-3b5896215cae"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_1e155f01-5417-4cbd-adce-190597e02570"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9887190a-cf3b-40b9-af0f-065b5d25d10c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_12d40f23-591d-4e79-9cec-6b3b4d075ba2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1eee1c8d-7f5e-4673-841f-6779bd0e37f2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5fe3f0ea-358c-4968-9246-6db6164bff78"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1c37ab59-801a-4310-8ec8-bf89eb45771c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1893ca6b-743b-40a5-850d-6ab0f293a9c1"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_762cc3ec-d2c3-4c27-a1e0-5d82ce661371"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c2be4912-6be8-4043-9ff7-517ee9bb4819"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_79b059d4-9db9-4efb-8bfd-5b97340f6e57"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_320c90ff-7cd4-420f-9630-c64c81e09be0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3b064b97-29f4-49fe-853f-454d80fb5f29"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ad8b5467-9ce7-4d44-8ce6-28cd454e3b9c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_80f3435d-1e51-45a8-b3f2-8e4f4ca86f35"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b5a5cff7-4ffc-4162-b06e-9f15b0399397"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_61ae6962-1f76-4b3a-a984-3a6ee848c81f"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7b8aa4a8-cdbe-44ed-a4ac-03d53849c998"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_97bc1286-e868-4453-a3bf-fcf677284a51",
            "name": "Pad 23"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_b20f452e-f2e2-4af9-a18b-080f9748e6b6",
                "name": "Pad 23",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_edef612e-d095-4dbf-83a1-ddb4df098873",
                "outputLabel": "Pad 23"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_fc5a2033-3ebb-44a5-98d4-d5f9bb1a4c5b",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_07395b58-fe29-4d92-9a07-e23d75709290",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_cc8e0d09-4bbe-49df-8830-a23dbab36ce4",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_85ac2105-10ec-4e51-97e8-d91624de640e",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_695cacaa-b530-447c-9af7-56a8816b20b8",
                    "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_009a607b-2c0f-4c10-8282-5086efd68264",
                    "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_cec976b9-d704-4e8e-81e8-cb5bac7c2f9e",
                    "label": "Pad 23"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_73147fa5-51e7-4aa6-9889-4b025d441c34"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ca2a944f-aadc-46ed-9eb7-3efd2fdb1ef4"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_c888964b-2716-4036-9201-9fd3d438ce0b"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_bdf24ee4-1181-459d-a2bb-4af7ced4310e"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_e7deafd7-6880-40fc-8579-7a86a8c5a385"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_24f7a6e2-6d45-4bfe-ab8c-78452ad06acf"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_6f60ec9a-d4fa-4636-b011-c3976dfd5c2d"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_9e6ae118-30d9-4429-b565-d1e1e5d09bdf"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_591893ae-054f-4cde-88ff-dfdbb0c075a8"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3733de40-faa7-47b9-b5cb-c6e384096257"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_95057a21-fdfa-42a6-8e72-01141b46146b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d72f9267-e376-4cde-8185-70ba6f750665"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e5ff2169-74cf-402d-889a-a48d48bb8437"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d4d86791-461a-4c1a-8a9a-3d85118c36c1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9cc85a55-02c5-4205-bd9a-6a9de00ea80a"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b4cdefd2-1443-46ba-b5b1-89a41b61dc0d"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d31323e7-c735-445e-8fd0-4b0984a92174"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7e6dc55b-c087-4b13-ae86-0954d0eb279d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8abf914d-0194-42fe-81a7-8c1f4a98469d"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_0b82c315-2732-4905-8251-d53912580df7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_efcfadb0-a011-4e57-b943-e4b232e52dc6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_083d09b4-228e-4496-a177-0c12a9ae937b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_97e77f34-bb4a-4006-8b21-5577252c9555"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_625f55eb-9489-4008-bb73-c2734579e7a9"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b2b6c3da-4ef1-41fd-a211-d9e722f732c6"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_fad1b90a-c0f0-47b3-b251-edae85585f6e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_45ad92cd-abdf-419a-aff5-ddee1fb3d7ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5c7cf3d4-71fd-4eb8-819f-210c88da8731"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_4b0072c1-1a7a-461f-b23a-b585376d0232"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b10bb5cf-a050-450e-b0ec-f945d37fbd2a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a08d834d-94ca-4789-a5a4-5e4f607c065b"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_53abc4df-4405-47da-91d1-5555b96c698e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_eddcd5db-3653-4fe2-a1c2-dc6ae28744a7"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_9f156169-1464-4845-aae7-a3c1b6345193"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5780c78a-0a52-48cc-ab75-a54363810ea8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fe319ca8-7bf6-450a-80d1-8823e130210f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ac02891f-8929-439b-88cc-626de1821354"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_cec333fe-b8eb-4d1b-9a18-102be349df28"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1711cd39-69b3-491b-b6e6-475810b7781f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_55a28342-de01-4109-8b1e-e86b446083d4"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4d294fe7-f1eb-4ac3-9a74-ed7e0c34012b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_85e757ac-66e3-4266-b32e-d52512e10e02"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6dd405bd-14b4-4460-acb3-c2365a26e5b7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_45101d3f-aaa3-4d39-8267-d334a383dc91"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0863ee49-4158-4b18-9189-cec13a0eab9e"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_d2a15a59-4528-4bef-a141-286da407022c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_91219943-bcb1-4d73-9fd7-d489ed250d65"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_72340b75-a37a-4063-9655-e5d1bcb623dd"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_75e3e267-22f4-4ddf-8984-d6a4b2c17e4c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cbae24bf-77a4-43cc-896e-8dbf50195dcc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5467370f-85ee-4327-be02-1b6a40e7f198"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ac6a7c0d-f543-48fd-89ac-5e4ae3e2bc14"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c792022c-a9dc-4fb3-9d79-2a8c47a9e6da"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ebee9848-7f79-4471-b3b9-34d5f95b49ca"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_a8510016-504e-4a97-833c-7cf4afeb9b3c"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_975aabd7-5711-4b5c-b595-f9b9cc49672c"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_aad891fb-3dbf-4b8b-b9fd-fb89b831526e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_2e4d3ebe-0b38-4151-a43a-e0fb97c31edc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_57660374-d55c-425f-ab1c-88693a651693"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5e060482-a30d-4722-8d4c-27e98dfb7873"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_904f0c53-f96c-456c-8d7d-3b88f2c8901a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ecb780bf-1237-4085-b8d6-3a5ef9ca2459"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8cf5c014-430b-4151-ba95-10bf4029ceca"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_59160d45-905a-4def-879d-2ff9608528e0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_91785705-48a2-4389-acd6-8cf7170fda42",
            "name": "Pad 24"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_2207d10c-6326-4fd4-ba3e-8e395c360ba4",
                "name": "Pad 24",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_b65f6561-b7c5-493c-931c-bccbabb757da",
                "outputLabel": "Pad 24"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_184ab6ee-9736-4223-a3a4-c4fdee66f5b0",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_90dae547-8457-4a1e-a5e2-fa564789724e",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c2f93ddc-9a1c-4aaa-a941-7848b4aa92e9",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3f591690-6127-4e7d-beb1-243fb11274bf",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5cfadb98-3970-48fa-943d-6bad0cd5796f",
                    "label": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_8aa1d6f9-95a2-4d57-81ed-d4f2f73f1705"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8cb460e2-bfcb-4805-8707-cbe180f60423",
                    "label": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_76fea73f-9000-4c9a-92e3-fc1003f6de60"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4b729959-ca9b-425e-ac33-1a2f430afb5b",
                    "label": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_2cf98565-883d-4eb0-9bb8-175ed6fc2f24"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_54122f4a-d0fd-420c-ae97-747660f52478",
                    "label": "Pad 24"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_673cd1fc-7eb6-42ee-8264-87fe8079d9e1"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_84e4d202-e644-4520-a005-8918ebc828b6"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_cd17d043-a9e2-4027-bfa3-e81bd07ce6be"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_e9d3b300-6cd1-4237-ab0b-ef9e783d19c3"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_adb70150-a826-49ac-92d9-9fe00487d583"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_7c29a1f9-cceb-48c2-b1cb-f60f878f6c64"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_324b2720-b770-47f6-9116-f3b028592574"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_8c38f7d0-8d7c-44be-9d93-8a2b1d8270f2"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_666641c6-1857-4b89-a9dc-b8a625a0f784"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f41a7c81-0285-429b-9833-1b6155526b20"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_bf9134c9-50ca-454e-aaef-7885825fc059"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_483a4d0e-8ad9-4ac6-9741-7442f1f6acea"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_633f3a77-97da-4017-bc6a-690c25be1c7b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b6f9c297-173d-4e5d-85b9-6fa272da611f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dc2cbc3d-3597-43d3-be46-31932dfbe24f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9d6c9fb5-7996-4e3d-9c0c-c91a7f062129"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a05ec15e-86f5-4d7e-963d-19ab7f6ab899"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_661d0765-08a4-4f8a-b5c1-13538f6ca20e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2376b6b9-0130-4fa8-be2c-a210dfe464c5"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ce73438b-17c5-4b62-a666-6906048ec8fa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dd299448-1bbb-4741-b20b-b1170c3b2913"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_2f631678-26a1-43b2-88f7-929b9b0c4a59"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_878d0129-7386-4c05-93d9-c5a6effe7e4c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_343f1d32-8597-428c-b0f3-52a825767c58"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_815733e2-a89a-4520-942a-8e4d53b3235e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6f535181-b95c-47ff-b614-e8e5623df820"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_56f2a016-18ee-465a-8ba5-36cd96b96b27"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b4dd6f53-e50a-4a92-afb3-776a03c1ee5d"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_2bce4ced-0151-4ee4-baa0-3331cbb6ddb7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_93862286-bc3a-4999-a3e4-a77a84c2b6f4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f34533b2-2e39-4f76-aafa-7274c19201d8"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_30e95e38-dbba-4814-9e07-31cf50e5d68d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_062a1ac7-8fbc-44cb-93c7-49d1b6c76d69"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_017407f0-3f4f-452d-97bd-d24a834842bf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_654110b8-1e47-4c3b-84f0-a452eca14337"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_22bbfc18-e84e-46ea-b592-40e39afe7fd0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4ef10244-eff7-4b0c-94ac-bbf564c72b6e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c40db364-c84f-48aa-bdbf-b9a1d88b3a59"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c8060a69-7732-48a3-be82-5852394be2cc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4fff11bb-97fb-4e48-bed7-cc1b5aceda15"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c9f8e5a3-d740-4ef6-ba28-f4b47e84ca7c"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_0520aeb1-8668-404a-a871-9a34f34beb77"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_57e37a81-59e7-4d12-8c8d-742e8dc737e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_016eb1a3-8622-4ba6-8c62-8f8650ad1ec6"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_844feaa3-9908-433e-a212-ada3d4e63f7b"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_88d9d22a-5b2e-4f53-8d26-40445594b875"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c6315ebe-bf22-4183-9ab7-ffe35c3b4d74"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_39535905-4a36-4bf5-8094-f21d6a4972e4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e572f06b-ac25-4a35-b217-c6834480c097"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c8634c8d-b74f-40e5-ad05-bd5ef6d9578c"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_6f0b51c3-9200-4e83-a5a3-f759335804ce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7c078258-1e50-4439-b4ee-73aa8872f393"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_49126f9e-0787-4b6a-81fa-1bfa800a9aad"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_0b9f0215-44db-4de6-bb08-873ae693f673"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e95889c7-52f5-4dc4-9653-e2f929c88df5"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_134b4cc7-66d8-470c-9a9f-be53dd6dd26a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_886af307-a160-41c2-8d05-95bd9c25e1a1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d740912e-d88d-4195-8af8-14c0293b4283"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_10187e03-c193-4644-a1a5-e279824f6891"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5561e904-9a46-44c0-a546-2b3477f7ec09"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_992d7dd0-127b-4f79-9bd2-5957d75cfa2b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c138979-f17a-4e14-9eac-b3310cfe1f93"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ae9aab82-3727-4f26-9809-f780acc34735"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4e79ca93-0414-46b2-ac57-3406bbefd3db"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_8ffbd0b2-375c-483c-a6cf-985e3a81addf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fbfe63ab-82f3-43eb-b2e4-e77c87ca4ca1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c50e3002-c1e9-47e4-a05a-b925c8422183"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_012585fb-9491-4cc2-b090-f4c6dfd500bd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_14e5ad2b-2c52-40e6-854e-ebdfef4bcbf0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_75d81d46-623f-458c-b4b5-46ca262496b3"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_37c5a2b5-252b-4443-a5d3-519be0ee17a4"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_711d0a8f-c06b-4980-a47c-03b6a43f4c79"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fe699fd1-236a-4acd-83f7-c7129cbf7314"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_da44f5c6-2cac-4b24-ab85-0578854fa63d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d7758262-6789-4131-9e88-45670ed255b7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_22e18cec-7ff2-4e58-8d59-0f14a7263595"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0e9069e5-4ce1-4a40-9d14-66e0fc7409a6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0503366e-9fed-4f22-af8b-d4aa0a235da8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_19a176e2-0b16-40a0-985b-8e4441a32ddf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_58eba34d-5e81-469b-b358-dff0be254892"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_039ee8be-4471-443e-90da-401cee28abd9"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_31bc9fe7-13cf-4570-b470-81064ae461b3",
            "name": "Pad 25"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_237f0d5c-4bc3-48aa-bb59-e8dfc55c352e",
                "name": "Pad 25",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__1c4854f4-ea25-450b-a7f4-734203024943"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_f119eb30-1d61-43f8-969c-b22f923cf404",
                "outputLabel": "Pad 25"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_1191ed74-b4a5-48fd-8b2b-6eae4a30018e",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b90cc978-9620-43ad-a89b-f5f6c963eb91",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9579fce1-0354-4d97-bd96-0cb811407ba2",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_23979fae-a528-4d88-902c-cfe8f9925ae1",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2e5825f7-26c1-4c9c-84e8-fe0ce970641d",
                    "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fe214c3e-373e-4beb-ae9c-de6edaf207e0",
                    "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e4ae8411-ef8f-4267-bbc7-f7704eeb6c1f",
                    "label": "_1c4854f4-ea25-450b-a7f4-734203024943"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_1c4854f4-ea25-450b-a7f4-734203024943"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_36692de5-aeeb-4c53-bf18-6168ee8d5032",
                    "label": "Pad 25"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_013575e7-c706-451e-871c-1b2972386efd"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_8a7d395e-a7cd-424e-bebd-802164c7410c"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_0b94cc9c-6873-4285-be7b-167450540c5c"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_3335dfb8-2d48-48f9-b65a-bee8ef787973"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_fa96457d-ad48-4244-96aa-013d46cb6d53"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_b16d075a-42de-44af-8cf4-c6d28c490741"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_d5d19b74-a7e0-4427-b9df-c406b9f2ab62"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_8f17927d-e787-46c0-a169-e24322d9791a"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_bb3c4221-f998-4f12-8c73-409625415058"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fa662f17-7097-451a-8389-c35abb8fcf88"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e04c7467-5dfd-4879-8be7-dca98b1ecc61"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_d1b99817-6fad-4a86-9f91-544746dcf873"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9eeac2bc-9b16-428a-8dcd-cb59e763a4ed"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8fe3c6c5-eba5-490a-bc22-8a38ac5488ea"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2f695d3f-219e-4ba4-b1b6-6e1d923042d2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_178daaa0-9d93-4c53-aa57-d7e0306f74ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f60982ab-f19d-45b9-97d6-c579d352e9fe"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_45f2757f-4356-46e9-a793-1cd1bf421b52"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_be7a6647-8812-43e3-8f9e-9aa034e51ff4"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_424814b9-15e1-4ad7-8b4d-2529fb2f61d1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_25af4679-0efe-47c2-9439-21f3aa330ca9"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_1f237100-a65d-4f44-8acc-b657a172241b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6af63937-5b4d-4798-8e2e-daa0733efe5b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a467c6c4-74e6-487b-a0f9-c3377b2633ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d5044acc-8a6a-49fc-8877-3696951a4d4e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c808dc4f-c3d0-4241-a4ca-952bbe82ecfe"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_b6952129-5410-459e-8963-b4da5a7daa57"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_30d8b390-1318-432b-9ce5-b9d42b71530e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_244deb95-596a-49df-91d6-c1fe6a662010"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_08a0a589-6066-45d6-b602-e3ffe3aab766"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_41ab79b7-2b1a-4a06-88ec-e44feb9a75a5"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_8369dbdc-5081-4e43-8d2e-d096c5b026c3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_35a2958b-06ab-4ee9-bf90-9081b8109b50"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1fc64903-8079-4a74-90db-f55f1fc26b2b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1ae31bae-c36b-4ea1-8cda-c5d748d9ee12"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_dd83285a-1015-4072-9dae-96fa6774f737"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b81fba90-6105-4347-bfe7-266ff23f93c0"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_038bc895-35b8-4daa-8668-32de6148ea07"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_07185b63-d34e-434f-b09c-a040d95bf3e1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_36d7b0ed-fe41-4bd0-94e7-849a8e646cc6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6b4650e9-757a-4eb4-8f6e-27c2f904ca19"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_51841a47-2504-419a-8536-54cb1cb93cd2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_80fae9a8-d4b4-470b-a38c-ca2c39fe8c4c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_73239d3d-076c-482e-9b97-609a2d473ab7"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c825c5c0-14d5-4cd5-9b4c-a32918caabfb"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3b85f2af-6f58-4e20-94af-927e57657630"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c918b65d-a6e2-4dc3-8f37-0046318d54cc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_194b90f3-ae73-4cfd-9b21-bc965a7043f8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c3eb2efb-223c-4c0c-b1df-4ce2f3c5b4f1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_12ac760b-8c69-495e-aaab-831c530b3b77"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_dc9b5efb-5800-460d-9111-c3e0bfdaa02e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1d6ec984-ec8d-449c-a08a-2a61e883e600"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f09adf33-6d5c-449c-9adf-270c3b162bba"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_8c20b007-a4d6-4b04-baa1-06d6f3b65999"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_aa7ba30f-7bc7-4d51-8241-c1bc6d501439"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_da81320d-131a-453f-a4c5-017f86058107"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a9d8e4ee-77f0-4416-95ed-3272e14a0dd6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d74444c7-abe1-45aa-bb25-7f4a8b286aa5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_51281eda-4f14-4976-af8d-0d3d99a331fe"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_86d92830-ff20-414f-a7e4-6b56d248e8b1"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_0f01e650-4cf2-42f6-a2f5-f68b9b6edcb2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d565ddb9-0a62-43f3-abf7-7799f2ce2e3a"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7056d5b9-0d52-48c7-a52d-08f1508cce8d"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7902313f-c14f-4572-8500-890cb60d40a9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ac95e774-7097-4a26-a405-e31c6b0ce7a0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3da76f3b-047c-4402-a9b3-7236babdf1d2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5a071f7e-c395-4492-9f4e-189b026344d9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6d4db119-3e1e-480f-ad92-1f6af024fe2b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f67f21fe-70a2-49c6-9abd-02995bb303f3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b04e99a7-2b19-418b-a84e-f1351681e0d4"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_ec3a8fba-bb6f-4b8a-92cf-b32c4da9055f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_5c4c2d76-6da6-4dbc-97f4-4dc72da48303"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_49393273-6d5d-4922-9124-74f6c933cdee"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_1b7e1d43-d78a-4491-936c-ec4e7905885c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_91058934-4c0a-4148-b8db-d097a05bd1a3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cf90ae89-cbdb-4177-bfe3-845ca5b46771"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_16d231d5-11ff-4ec9-8545-bc6d90152fde"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_12082427-2570-4e4f-9180-433fb41bb0c2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9712338-dfbf-493c-a825-919d961329ff"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5d307e1c-089f-4bef-823e-5405625b7f43"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_af7eef4e-7a2d-4d3f-971f-6991d8159881"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_d46c47be-b491-442d-a82a-0785eeeef6cd",
            "name": "Pad 26"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_83d6eead-418e-4008-a295-e5a0f9185fc5",
                "name": "Pad 26",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__1c4854f4-ea25-450b-a7f4-734203024943"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__69f71c11-edb3-4949-8951-1861308beb03"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_b27f33c2-24d1-4d4b-8460-c550b8c3b56e",
                "outputLabel": "Pad 26"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_e3ebab8c-6f0a-4969-a6e0-ab4f5c3eda53",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3d7a3617-5430-4c4a-9dac-10efe12caecd",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3d2c6557-84c6-48a2-afba-3f153aa9396b",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_1c300034-8203-47c9-91e0-3ffc32d57e63",
                    "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_da3b9ffd-e7ed-4888-8934-5fc400f505e3",
                    "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c424f578-5ee5-4b15-a869-ec223843ded5",
                    "label": "_1c4854f4-ea25-450b-a7f4-734203024943"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_1c4854f4-ea25-450b-a7f4-734203024943"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_13ee3cfd-33fa-43a9-a3ef-b00c80b941c7",
                    "label": "_69f71c11-edb3-4949-8951-1861308beb03"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_69f71c11-edb3-4949-8951-1861308beb03"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_0baa7e76-0664-48c8-be80-f1fb106fb98f",
                    "label": "Pad 26"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_076e2158-bb31-4354-9063-ef4ed74821c5"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_e450ab24-a73f-4897-bbc7-794de58b5ba3"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_1ee9d70c-83ac-44e7-b147-e1c1dca50250"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_5bf234d2-87b0-4735-928f-6701378fed83"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_46de45b0-2554-4305-ab45-38064a2ac02b"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_7deb2847-f3df-4984-8b00-65552428a21b"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_1aba5f65-3692-49be-af62-65ef23154122"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_29550840-a4aa-428d-9d30-faf225d09e52"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_434b9f2b-11f9-4086-afba-1e647d65227f"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_917900c6-916e-4011-8b8d-da88f7dc76c9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_1fb96f41-7bbb-4e03-9a33-ec113edfc090"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_9fbca0b7-a82f-4616-9467-d3f998d9c9eb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5e5363c9-7740-4952-9f0c-74a3783d0d8a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2b936717-8164-42a0-9667-a8fc78dd8288"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6aedc711-8618-4fc8-a11d-eb4bb4450021"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c8b68f4-3917-4b5f-81d5-9fad74f01aeb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_10f914fe-af1b-4fab-93ae-d2ceed44f9df"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_723f2d14-851e-465c-bde2-863837b0c5fb"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6495541d-1157-4961-a29a-42310a86d62e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ed7c546b-1b92-429d-9c57-3da5935d3be5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3499a135-166c-4fa9-a54c-60c3b603604a"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_09d66abe-3cd1-45ef-9e3c-a840bbcbf0ba"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_243956a1-7b6e-42ac-a9e4-3383d966fb3c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_804a685b-1af1-4cb6-9ee0-c02dc5697c09"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aa1bef38-5d68-4f87-a5ea-e9c9f005f7e2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0ae22d53-04fe-46df-8a8e-59134a45fdf1"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c1f07cc2-ee59-4744-b46c-91e90e418143"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_db3c3682-82a0-46eb-8886-d15807aaeefe"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_7ec5c812-e25b-4802-8f19-d13e60e2834a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c3562643-583a-4118-95c2-cda26436f088"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2d5153a8-100d-49e6-b118-20a893292be9"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_293391b9-dd16-44eb-a716-4acafaa05f2a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fad530f1-69ef-4458-911a-ba85654df4d1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3b9d4f06-ad7e-4d67-bf15-a4da31665db9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a01e6da0-21ee-4912-a1cc-9bfeda04692f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ae63dbf8-fc44-4cc0-a0d4-821ad9905b2d"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_098e1247-7f86-4d6b-b464-d7443519a812"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_721c78aa-697d-4f36-b53f-3917e47aa795"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5d38f64a-4a98-42fa-aad0-cbf73a96b057"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e4ce6d6d-af8d-4274-aba8-a698e3016da7"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_49002090-9290-4f34-ac8f-d25ef5d8e82b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bc085f09-c1d9-4fbe-8816-20d69efa79db"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_46125d6d-6ad3-43b8-8059-069fb114ccce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4cab3f15-5e2d-416f-b0c4-298acb47426d"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_a5760485-49d2-4c31-ad57-caa3212cc7db"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_bc6e2ebb-003b-45aa-a0ac-aade48d8de40"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_34f92957-c8bc-4e7f-8cbd-48549e9f59fa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_adc52a67-36ab-443b-92c2-006b9325d154"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ffc8fd54-fa6d-45e2-9672-739230e4588e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_57b7b3b1-64c2-436b-8f77-746a89b616a3"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_c49e88db-a5cf-4ab7-bbf4-6b84909c3f98"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5a6456f-bd42-40aa-9763-ffcb21715562"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3ff9d014-4778-4b23-a3f1-73c081d1afbf"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c3038349-67c7-44a7-a114-692559160688"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e01269b3-1744-4939-bc18-9c163f44f93a"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3cae20a2-220f-4b17-a89f-134168eaa1a2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_714c0aec-520c-45ba-aedb-5bc007a67bae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_71f1eab2-e7b7-4bcd-a7fc-47fecea37981"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_03afbf4c-36a0-4b6a-af13-ca5885b9c05e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6adc7f12-ae92-43e8-ac15-2b4af83ca1d8"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_029649be-ff38-4ab1-8ff4-aefa4b8dc9d0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7dcd810b-7450-4294-ba05-1780f3892c9e"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_be1223e1-cf8b-4666-a3a9-81b60987abab"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5ae0e1bc-ac90-4355-8d6e-27f4f7ca6ba9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f125048a-8e28-4735-94bf-b959b14a0461"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_544fcbf5-e76d-45ff-9ebf-f45a993c67d0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9a4093a1-adaa-4481-ae2c-23d7f5c96bb1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fa14b571-5571-462a-b70d-c7e50b384af6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_44df887d-f6d5-40a4-a503-15093698bb43"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1cd0300c-2806-4d90-8694-05a539e94ea0"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_3d8a3f0e-2dbb-4ad7-b3fb-60da237a50b3"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_267bf3c8-6b9a-49dc-b550-57eb8f5f4723"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_de229dde-edc1-4cc4-b3a2-abd1936c38f9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_38835c63-2ac8-45b0-8533-5b4dcfe7ad11"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2fda64cc-ebb7-4856-a3b6-de20bc99c859"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cc796174-8768-4400-9041-a0534d5e9943"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_121ff672-d8c2-4996-a756-f2c6b316184a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2f088028-26c6-4513-87f9-54efd7098ed9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_90c9177c-b0be-443a-9f93-e5ccbc512a96"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2175b8f4-e794-4b65-9413-6ea2cdb2ff2f"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_9c65e9dc-d4f9-4b06-8647-1c10c38adfe0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "_8cf533ec-d664-4092-96aa-957a71d255ee",
            "name": "Pad 27"
          },
          "dmn:variable": [
            {
              "attributes": {
                "id": "_03c701cc-75a1-4f52-b8bf-005049e0240b",
                "name": "Pad 27",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__e3f23320-186c-4507-b6a6-84170426cc0a"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_fc74c97d-266b-4b96-b618-99910669e546"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input_bb2328ac-a595-4311-9beb-1934469d6245"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__2af9eafd-fd78-439f-a06c-bb7566c21154"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__1c4854f4-ea25-450b-a7f4-734203024943"
                  }
                }
              ]
            },
            {
              "dmn:requiredInput": [
                {
                  "attributes": {
                    "href": "#input__69f71c11-edb3-4949-8951-1861308beb03"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_18c786b9-4223-4b42-b79d-a70e227ee947",
                "outputLabel": "Pad 27"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_837e9034-9afe-47f1-b5d2-8205530ad7ce",
                    "label": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_e3f23320-186c-4507-b6a6-84170426cc0a"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_85b9423f-dd9a-4090-8878-4fc49f7bfe0f",
                    "label": "fc74c97d-266b-4b96-b618-99910669e546"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "fc74c97d-266b-4b96-b618-99910669e546"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d41ce7d5-8acd-4801-a20f-5d47095d3283",
                    "label": "bb2328ac-a595-4311-9beb-1934469d6245"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "bb2328ac-a595-4311-9beb-1934469d6245"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_58a42a56-e513-443f-92e8-4c0c559185ee",
                    "label": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "_2af9eafd-fd78-439f-a06c-bb7566c21154"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d3766e8e-3f8c-4d2a-b119-168f21081284",
                    "label": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_81fd4cd4-0dfb-4e98-8c26-69db1ce88fd7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a5918138-7a95-4ebb-93c2-a98777f73f91",
                    "label": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_d1d50b2c-29d4-4d80-af46-d7d9d57cceb7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_05102a0f-487f-4cae-8122-19b42deca6da",
                    "label": "_1c4854f4-ea25-450b-a7f4-734203024943"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_1c4854f4-ea25-450b-a7f4-734203024943"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_bdfcdac0-f9c5-4a78-94b7-fd40f2e34d1d",
                    "label": "_69f71c11-edb3-4949-8951-1861308beb03"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:boolean"
                      },
                      "dmn:text": "_69f71c11-edb3-4949-8951-1861308beb03"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_fd63c789-f42c-4060-949c-203e97054492",
                    "label": "Pad 27"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"Vergunningplicht\",\"no hit\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_194779b1-c820-475a-ad48-88ca987ed715"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_a39e7783-afc0-40b3-a53c-bc9480adb907"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_b1476b6f-d497-4b79-b6c3-c182f201be1a"
                      },
                      "dmn:text": "\"Ik ga een dakkapel plaatsen of vernieuwen op een plek waar er eerst al een was.\""
                    },
                    {
                      "attributes": {
                        "id": "_7b8a1398-cc0a-4cfb-9e84-44b279fa0e6a"
                      },
                      "dmn:text": "\"Ja, de vorm, de grootte of het profiel verandert.\""
                    },
                    {
                      "attributes": {
                        "id": "_85803369-e560-4188-ba17-79ee5d3632e0"
                      },
                      "dmn:text": "\"Achterkant\""
                    },
                    {
                      "attributes": {
                        "id": "_cc15e2cd-53af-498d-b7e0-f7d6ad4a8ab4"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_91e4fbe9-63a2-4eed-9e36-5415cecbe42f"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_aa4dc5b1-6233-4caa-b25b-36c3cdf4d89e"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_e396e462-fd23-4d80-908c-76f415e17d9c"
                      },
                      "dmn:text": true
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_795652b7-9610-4311-b311-ae264a1685f4"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3ec594d9-65fb-4cc7-81ec-2031a1bfaf41"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ffadc315-2836-472d-8174-87cd79a6a314"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_ed40e7e5-0a35-42db-a976-d643cb5e181a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6aba650a-31ea-4db1-8856-55d39990c4f8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2fb803f6-4563-4bc4-af6c-0e95a88087d0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_60eb1535-b693-4805-9dfb-5395103e701b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f6b12c86-1d3f-4c6a-9d00-53ccfd13d079"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_322da9fa-63c8-4842-bf0e-6b792e2ba0d7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8a129056-c0d8-469c-a4cb-f78815647f39"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_4663e9f7-6cd9-40d4-b685-f2ddb251a582"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_62cf6a55-bf18-48ee-b913-cf9fb52323a3"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d6298a1d-f093-4f4d-a83a-09f164912bb2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0b4f6ed3-f0e0-413f-8a82-19dc8d426ecf"
                      },
                      "dmn:text": "\"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was.\""
                    },
                    {
                      "attributes": {
                        "id": "_2e8a7ff1-feb1-42ab-944a-35780684cffd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_62472fb1-e84c-4aaa-ab26-088d0b61de73"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dd1cb1ac-611c-4039-a9a6-3a0a21cfbe0d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c188c549-0e06-46da-b2b7-57d18681a8e3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e1312d60-2541-4a37-8753-62db1cd03eb9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dfaf7cb4-a0d5-4bc0-9faf-f0f5d495e040"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d8cd52f0-7a65-4e6f-bd93-050a4b51f3b0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5e59785d-ac9a-4ef3-ba17-9c20d6b5bfe6"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f4d33f96-86b3-470c-8bf2-573d40e6aecd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bbb813bb-088f-400d-9d04-2941ffe98ed0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_72180e60-a534-492d-b1cb-89d22b1efeb8"
                      },
                      "dmn:text": "\"Nee, de vorm, de grootte en het profiel veranderen niet.\""
                    },
                    {
                      "attributes": {
                        "id": "_a14f7f1c-5d02-4d76-8c5a-0cc7e226960e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cf8c2d78-febd-47e5-84dc-d5d8bac1ac99"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_20437286-49fb-4864-a475-d74d67f088cc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_77c1aba4-f0a1-45ac-9472-8f93720c8f47"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0e9457d5-cd28-4a14-9242-5068c249ea27"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ce903641-e520-4f24-8177-43bfd1c386a6"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_ea601c44-3b66-4a57-83d6-b0519eb123ac"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f533050c-5046-45f3-a842-6cfde47a5962"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_45e4c367-5fa3-4731-89c6-8fa0170d9e49"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_419b71c6-1c3a-4b64-b2c4-cb53381a7887"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9394f504-73b2-44c7-841e-95f247b92cb5"
                      },
                      "dmn:text": "\"Voorkant\""
                    },
                    {
                      "attributes": {
                        "id": "_c47048ef-c327-4940-b9f5-e2d2e5966b90"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eb34d4c6-b5bd-41d2-a696-664555f52fae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a617cb7f-e983-478c-9760-fcfda5ffd030"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ecba3edb-7ffe-4bb3-a720-2416470529f7"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ef91dc6b-1e0b-41cb-995e-bbca8575afb8"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_1b53bbd6-dcc0-4615-8aa1-0cd7c65c7f2f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_ac3b45d2-15c9-4664-8c69-a965f9895017"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4bd95b11-6422-4cdc-a222-8aab0b95afb2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1c6b9495-0adf-4ab1-a79e-cc65824f4901"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_56583b23-045b-4439-9c01-dbda2b9215b4"
                      },
                      "dmn:text": "\"Zijkant\""
                    },
                    {
                      "attributes": {
                        "id": "_79c93c3d-6e6e-4100-a6d2-dfd40253d818"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_52b56e0f-2fcd-4856-b3c6-c6ce06c56607"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_defb8374-7d5f-499a-a1b8-ed4c7f5b665e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_93acc7cb-9547-4cb4-a5ef-eb6f044dd962"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d2e94a29-6186-402d-beae-a259d1b5911d"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b71928a4-6906-4c2e-a66c-c84921f9b29b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_b7904ccb-9b9f-4709-94e7-0c0daa3d2119"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c861311-1d87-4850-b9f6-b8e08cab84f8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_65b702d8-2a1d-465d-b3de-78baebc242aa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_92fdf0fe-f905-4afe-bea6-2742bc968765"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_36dcae0a-9f5d-4abd-8fed-0ed1d7fd02e5"
                      },
                      "dmn:text": false
                    },
                    {
                      "attributes": {
                        "id": "_41ce0071-030a-405a-8588-ba36aa10f5e9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7457132a-e2c0-4966-ab26-510dac90a2d0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d5e50333-f221-48d9-8295-fdd7803944bf"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_32cbcdb4-a5a9-46ee-9f22-7d418fb10084"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9c624e67-04f0-4093-8f62-80e769621427"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_1e89b86d-7a5d-4bea-809e-d3beaa00716a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d2d6aa45-3708-43ec-b555-9a0f96f8da94"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1d369595-fba2-43c8-8adb-fa67d98e8449"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_362581e5-d4c4-440f-a812-159021a910f1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_20de176a-d4f3-497c-a0f5-bb6bbedb50c2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1a81b342-c55f-4daa-a615-a03c94d30863"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_bdad2f15-92fd-447f-a374-dbc9ceaacf6c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5561ac4-d7db-4b03-9879-93b2ffeb1def"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7cca1bd7-4d74-43f3-aef1-52440514a1e9"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5c5cabc0-1110-46c1-b9ed-2601e1f58457"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c7cc3ed7-0b02-4754-8b9b-c05275d8708f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c977994b-a56a-4014-ab39-f8072fa2fc80"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d4f54be1-4776-43c0-96fa-595f25f6750f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_217e5ce7-a645-451b-a96d-6719975e8783"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e8c35f1d-52d1-4ae2-9a28-0e42a91a2d35"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4f3bc047-5d9c-4722-a45a-319c18d014c5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_908e6c82-fae7-449f-9074-f26ad0d08858"
                      },
                      "dmn:text": true
                    },
                    {
                      "attributes": {
                        "id": "_ceec8ef2-4e10-468e-b487-e281b48e0a94"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_1977b76c-7dfb-4edd-bbe1-52fba4d22113"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6a7a440f-3b83-4a51-9cd6-53bcadcd86ff"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_5d3210d5-98c1-4b70-87db-fea76639f49a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9b403619-09b3-46ce-b161-19ed7e51dfe4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2af46907-bf65-425c-bacd-5e69de830f1d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5b4b526a-d8f5-42f3-883f-b96a2aba6f0c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c2aa6a87-dbcb-4981-956f-0eec979173c6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_19cd5500-eb25-4b92-b59c-0ef9b9480685"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_df2d43e4-ecec-4d0d-8f79-8e93758af737"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9afc41c-128b-48d8-b9c5-f10a065ba383"
                      },
                      "dmn:text": false
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_de3f2ff9-ce82-47f5-9125-fd06a342c7d0"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "attributes": {
            "id": "dummy",
            "name": "_Conclusie_dummy"
          },
          "dmn:extensionElements": [
            {
              "bedr:functioneleStructuurRef": [
                {
                  "attributes": {
                    "href": "#http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000/id/concept/Conclusienl.imow-gm0363.activiteit.OEFDakkapelbouwen"
                  }
                }
              ]
            }
          ],
          "dmn:variable": [
            {
              "attributes": {
                "id": "_999afc6b-fa8c-4b7f-a959-ac26cc14dd24",
                "name": "_Conclusie_dummy",
                "typeRef": "feel:string"
              }
            }
          ],
          "dmn:informationRequirement": [
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_768319cc-9fea-4927-bff9-6a618d4b4857"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_962b6469-bd47-42cc-8292-a4e8bc1e50d5"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_72a2fe65-b1d1-4281-b7f1-3e4cf1efe35b"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_a4712a53-2784-4f8c-9ec8-5ceeb8aceef7"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_c5db163f-1ca5-44ac-af91-2b53e9ac99ba"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_7179fc7d-82f6-49aa-81ae-efdb1af9790d"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_ec56e703-502c-463b-9a81-01888882b178"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_3986f1dd-f848-40c8-95a4-5775b90921a3"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_47a525f9-a6bb-45ad-baca-c1f36a45ee64"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_37aae019-e1f2-48d3-b5e8-5e1e27858b05"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_95909e7c-8152-4a0a-9343-f9af35760d50"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_88cb0c49-e374-41d8-b8a0-60eb2a280b98"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_78560a10-1a0c-4772-96d0-176625a374eb"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_892f244a-7f60-47e6-bcdc-cef40fa6e14e"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_1cd776b2-5cca-434b-b93c-3f8c84c59afa"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_071fa50d-938a-4faa-86ea-d46f27a3e172"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_5c6ebae3-e223-4522-8e74-1912d758f746"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_4df053a7-f2d7-4712-8725-57785797a741"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_51320ec9-6468-4cc0-8753-d660aa10a6d6"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_2b0e5009-ce05-49a5-b7e5-d572ee0f458d"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_9f13ee69-963b-47f2-9954-8a3d12a33c16"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_eb3ea33d-58ba-40a3-a23b-a8f2a7b1e95d"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_97bc1286-e868-4453-a3bf-fcf677284a51"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_91785705-48a2-4389-acd6-8cf7170fda42"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_31bc9fe7-13cf-4570-b470-81064ae461b3"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_d46c47be-b491-442d-a82a-0785eeeef6cd"
                  }
                }
              ]
            },
            {
              "dmn:requiredDecision": [
                {
                  "attributes": {
                    "href": "#_8cf533ec-d664-4092-96aa-957a71d255ee"
                  }
                }
              ]
            }
          ],
          "dmn:decisionTable": [
            {
              "attributes": {
                "hitPolicy": "ANY",
                "id": "_c3893736-b33f-4e3f-8592-b8a7db74abc3",
                "outputLabel": "Conclusie dummy"
              },
              "dmn:input": [
                {
                  "attributes": {
                    "id": "_ff2fcf94-bd40-4868-9ee0-21b697b9527f",
                    "label": "Pad 1"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 1"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7ffa9172-0ea5-4ed7-b786-294c759d2c58",
                    "label": "Pad 2"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 2"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d7e38bb2-cade-4919-b5b6-16bb6477b881",
                    "label": "Pad 3"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 3"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_bd7860bc-1dc4-4de1-a98d-b6083738a532",
                    "label": "Pad 4"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 4"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2b1a0995-98a4-4231-836b-276f057a7d40",
                    "label": "Pad 5"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 5"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2822b792-50d6-45ca-8386-af53fbe29459",
                    "label": "Pad 6"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 6"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_1a411e62-3f34-429d-9931-c9c258dbb876",
                    "label": "Pad 7"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 7"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_eefb6388-521d-4777-9d2d-90cc08e8e4aa",
                    "label": "Pad 8"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 8"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_44e8ec88-29d3-4653-98ba-05e65959e97d",
                    "label": "Pad 9"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 9"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8ad30d47-f1c6-4099-9714-ea63767155a9",
                    "label": "Pad 10"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 10"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_69a314b2-9da2-4bda-9966-ec7ef9197245",
                    "label": "Pad 11"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 11"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e345d0ee-0dd6-4900-848d-f666e2fac78d",
                    "label": "Pad 12"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 12"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_b35028c0-2968-4470-b546-221adbb2c5f6",
                    "label": "Pad 13"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 13"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4464f7a1-2f3e-4694-a529-266a12e8a873",
                    "label": "Pad 14"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 14"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3ba18b09-ede5-486b-a063-9cfdbd3ac196",
                    "label": "Pad 15"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 15"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6f3f75b2-2d0e-4452-bca2-13d3a6651470",
                    "label": "Pad 16"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 16"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0e7c7498-20c9-4b9c-b34d-7d10cae11334",
                    "label": "Pad 17"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 17"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_81d581d3-ca0f-4d91-a78e-9056847c746a",
                    "label": "Pad 18"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 18"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_47091b14-3c63-4175-887a-92a80892c2aa",
                    "label": "Pad 19"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 19"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_54bdc44d-1040-4ee6-8085-0c79d784139d",
                    "label": "Pad 20"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 20"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_e729c036-71a8-4a57-9c1f-3ff3eb75be96",
                    "label": "Pad 21"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 21"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_940cdd74-c998-4e67-b547-7f4dfa47832e",
                    "label": "Pad 22"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 22"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_1e58414d-37de-4abe-a612-eabe373b59ad",
                    "label": "Pad 23"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 23"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_43f312b2-564d-4e63-b314-f064090967cd",
                    "label": "Pad 24"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 24"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_3703a2bf-5c91-4fa1-8cfd-1832fbdff65f",
                    "label": "Pad 25"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 25"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_645a9c8c-f920-4805-b7ba-0446d89bd16f",
                    "label": "Pad 26"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 26"
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_d32f93eb-fb6a-401e-9533-f01e66aca9a8",
                    "label": "Pad 27"
                  },
                  "dmn:inputExpression": [
                    {
                      "attributes": {
                        "typeRef": "feel:string"
                      },
                      "dmn:text": "Pad 27"
                    }
                  ]
                }
              ],
              "dmn:output": [
                {
                  "attributes": {
                    "id": "_db33eda3-fc3a-447b-b43f-277f5f77932e",
                    "label": "Conclusie"
                  },
                  "dmn:outputValues": [
                    {
                      "dmn:text": "\"NeemContactOpMet\",\"Vergunningplicht\",\"Toestemmingsvrij\",\"Toestemmingsvrij\""
                    }
                  ]
                }
              ],
              "dmn:rule": [
                {
                  "attributes": {
                    "id": "_cd41f54e-faa5-465c-bf24-d3b752353077"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cc3debe5-0499-4bad-b8e5-efb2d3120380"
                      },
                      "dmn:text": "\"NeemContactOpMet\""
                    },
                    {
                      "attributes": {
                        "id": "_071db3fe-1716-4e1c-a674-03b5d872f94a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8c2117fd-c00f-4c26-9808-7fa07f106e62"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8918ae4c-8e85-4d02-b19e-80096abeab80"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_019aef81-b48b-4b49-bb6e-3f5522799d40"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8e052042-0823-40e6-a755-e99bc4cd7a60"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fdfc086d-2d13-4901-9ed2-134fc498363b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cc6e86ac-fe08-4950-b341-932462691814"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4a6c639c-bb7f-4b7c-a429-890b7ff367c7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ddd845f5-c029-4f0b-becf-9aecaa03c23c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_01b34441-62ef-4773-b253-ff58581b836b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1f7a73cc-d6b5-455e-b40d-7e4f9b9bfc1a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e9011977-0b6c-4872-8b0c-5e3c86b05cce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e530accf-f10c-4a5b-b168-dd2fba4f6cb7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1960cbb2-74b7-4262-98a1-14c4b6d90661"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9304ab94-756b-4de3-9670-8ba647707860"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b37544b-3f37-4f0b-a9b6-ce61bf42eedd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9cb4ed74-69fa-4694-9ea2-fb65d9aeac18"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d6106589-9899-4a51-8f87-1d49e0e87692"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6e50a07c-d90f-432a-b30a-681fe3ee660d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b8f0b18f-0645-44b9-901d-bcae317865cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e708a6cf-0a85-44aa-bbbe-733893f3ce49"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5380cd28-453a-4760-89c0-f57ce9f2f265"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_96fe772f-5208-419e-b4cc-d4775073ea89"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dc9b2645-f926-43ba-8765-f1db1bc6fd50"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1f696cc4-f5af-4dbc-b57d-bf6bc785df78"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e7defc40-336d-45ec-9a2c-0ba00656d095"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c44cd96c-ca09-44bb-a7be-12593339839f"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U woont in een welstandsvrij gebied. Daarvoor gelden andere regels. U kunt hiervoor contact opnemen met de gemeente. Bel [14 020](tel:14020), maandag tot en met vrijdag van 08.00 uur tot 18.00 uur."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"NeemContactOpMet\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_2a150e50-7889-464c-9893-ac298bf8050e"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_5be345be-9a40-4acc-a116-ff5d9d818bc1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_020f4233-ccba-4257-941b-5b96c14ed76d"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_b50cb153-912d-4327-aee8-7bf3ca3bdcd7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_22e53647-4ee3-4f23-bc2d-6fb170cf4e8e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9aad2bcd-4137-4a8c-8b49-25bb5adcfe79"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1554a130-3fdd-4f57-9ff0-23159180555a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1ac17cd8-f0be-459d-a65a-f871d446f46f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ab9716b2-2656-4c44-af6b-47aba8156f47"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a3fde230-f7fd-4191-a72b-0903bc3baad4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_121ea479-4028-412f-98eb-95cf31e8fcc9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1a6612b3-7574-496b-98dd-600ac114ea0e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2114a715-1b90-4994-a31e-dde6b74bf49b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_33856b4d-22ae-438c-b0e9-e0e5d549fdf9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_001c6538-51a2-447b-9b8d-90dab1e1fad4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_94cc3f23-afc7-4f52-ab6f-6133f9c11912"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b8d95495-e3ad-49e6-9053-feb3226a79e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e1e3b0b5-6c5b-4bba-ad3d-8a21cf9b48b9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c6af8569-f1d8-4bc0-a348-d4fadad64641"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_86af803a-3d29-41f9-8bf4-b5a7891e6096"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_809105a1-4b05-4b11-a6cf-0d01c731cf2d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ee1a8c99-ed20-4121-aef6-cfe3880561dd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2bd6ba87-6200-4a58-8522-52038ff988f7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9cd740a0-269a-487b-b756-25b098f5039d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_23adc11d-df72-4b0f-9e4f-351e1cbc06d4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0f5e32aa-af43-4c2f-a373-5c984518f306"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ab0bd911-4499-4974-9f08-928d8c74de52"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e74841b8-471c-47aa-920e-eaf9d494f3e3"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_98e00482-a5e7-43ec-90fb-6e89e1c723cd"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_905f93c8-5eb1-4619-bbd5-93ded002608c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_8c65dd68-3f59-497f-81ed-1d7bbb1d72ae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bc174428-a456-4195-9934-62f21427d13e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e693fe80-0b4c-4053-9c63-1028c7e79729"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_879bf6e7-9d9e-4919-a56d-71f2b986252c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_426425d7-a8bc-4b7b-97c9-fd7d65dc2502"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f78fa425-7a6a-4d84-bb3f-95881838b9a5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dfcfe40e-5809-413e-85e0-97c168d3354e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ab801ed1-1fd4-4395-9936-4d8007655b11"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c8bcde61-a63f-4dc8-9ee3-a5b4feab8d3a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_85beb30e-9cff-4b5b-9af1-0bd798540c74"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c14dbdc7-b4bd-49e6-ae1d-c677c67a14c7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2de0b9c8-c1ff-432e-9752-0caca87b8b2b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c6f2229d-2864-43aa-a5b8-11579ed41d11"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4aa5cb8d-53e2-4bd8-8ffd-c092c8df5771"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d67a1611-fff6-40bc-bbea-01858285838a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f5879e71-48cd-4b6e-a594-2f0a3dc6045a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4f5497ba-e3bb-41d2-8ac9-97a6048a5b5e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d22c76e7-24d2-48fa-9c28-99cd35b06da6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8c1805f1-8d93-4f91-b374-20535cd938bc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6c365623-1262-402a-b661-34cdbfbb8ae7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_813992b4-f043-4458-909f-203395a27b6f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_40bd3b7a-5e12-4d83-bd5e-0327e2ef76f0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_535f04b0-6a25-40ae-8443-78a379cf16e3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_82723248-79f5-4357-afd3-bc24c46da709"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fb88c9a7-bb6f-4b6a-964a-5306cade4ea3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_19c3060d-73e1-4a6a-9bd8-7224230c2788"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b7168bf8-a573-40c4-ac66-71d6b7034fa9"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_a27fd18f-bcd0-4ee5-91bc-28ec14dcad8d"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fa52935a-e57b-4faa-adce-edafe15b89fc"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_adf1f8f4-9b39-40c4-8cfb-fc035bc90aca"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9bd1e0c-dbf8-43dc-b8a0-3b9003b7f8ca"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d6d1398d-7eb9-4017-b8eb-11f976d732e4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5634ffd5-2bfb-4c54-9703-5941efb0f620"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_4f915fe2-b68f-4b2b-bc0b-8dce7b3aed0f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d99aa260-2c9a-4137-94d0-8d60f33ded27"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7d0840b8-9067-4ed2-8df3-7b26a42dff3e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_abcf16bc-67d9-4e3c-8e4e-200bcd60c5ac"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5b52c7fe-f4f4-4c58-aaf3-fcfe53edbfee"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4e08a122-1338-4d9a-b647-161e77126ce1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_52836d5b-bb66-4fe6-81b8-c5159a0d01e0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37e15eb6-360e-4a45-920a-4144aeb24410"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2666b6f1-2e32-4197-8947-146952fb601e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fbcfe77d-e2d6-4840-8214-8184e27f3799"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_017ccd1c-5d00-41d0-b7fc-e07ba8cb8eb1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bcba9940-eb56-42d2-8efc-c30aebd1943e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37ab5397-6645-42c3-bca3-18a8df5bce4d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_13a503e8-6ace-45c8-b4ee-9d7aefe46195"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_09517d3c-ec96-4446-ba19-59733aa97bbb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6bacdbea-38c0-4d06-812e-7667d2a48c61"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ed9fe173-aa02-4ba6-8b1e-b88bd0fc2a11"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_855d4feb-db60-46c2-9795-b16060952674"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4400d9f3-d810-4f9c-ba0d-97e02f3930df"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bc9b72ed-f5f0-4f73-bd3a-5689047fece7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3f42607f-505d-470c-b92a-0d3270899648"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b3b32403-0449-4fb5-828e-136318a92107"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5bdc0e35-77f5-4bd8-bdeb-8f078cd2881d"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_22c535f6-4ee6-4509-8726-e9795f8ba283"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f337a1e3-dae7-4658-b904-4401007494cc"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_48863e9d-5ab7-4b22-b294-218961bf2634"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a85debf8-11f7-4c0b-8ba9-1df52d6e841c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_706efe08-06af-4021-ad71-9d4b6b89d4bf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ba5e0fa2-6822-4ef3-90d7-7f62fa3769f1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ecd338e0-2cda-4e02-81f2-ea4a856a722b"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_f94a58d1-8256-4c96-8979-e6253db8fbed"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ccaf7220-ab8f-4d12-9de6-1cc7674703b6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e4c191f5-6cad-4911-b839-0a54ec261083"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a93db46c-6e2b-4e96-a20b-34f8ab3e6ea2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a0cf6d96-fc26-402f-b15a-87f535ac9bfc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fd820526-0094-4868-8e9a-bd776cca9f25"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fe4f047e-ae0b-485d-ba89-fb1142725280"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6a4fb7df-591d-430d-96b2-f0e3799c2fb3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a3f15194-9590-4353-8020-90a4d9902ba4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_569434e9-3fba-4b5f-a45b-7e0f77eb2dae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_164e03f0-b4f7-42b4-8611-f62eb81bfa6e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_46fb9245-11d2-4616-a592-ea5eeafebfdd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2601d5e6-51c8-4ff6-8a71-9eed97d43e49"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_05027b33-4a81-4dd8-8ee4-6258bfa1e035"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_22179c6a-a8ac-4ce1-8fdb-871bf6229903"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_08e306c2-d6f9-4a5c-aca0-a0734ee6be6d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5f7b8358-2ebd-43e9-91d3-96c78e4b2c4a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bc34c1b6-d06f-4a16-9474-94e313f62708"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_49ae3d8b-65b0-4d68-abfc-e6da64a9d6c9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8b4f4d6b-a563-4081-ada0-fa178767f5b9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_067f0a4d-ec55-4afc-86c2-38f00ea8dd4f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b511f66f-5769-4036-bdd5-9bdb3003eebc"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_eb496c22-7f5e-4670-b0ca-b8b71c9ed44c"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7b5e9437-5686-4e88-8d35-b5f33da2ccde"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_8b0d68a6-dc45-4c5e-a537-8bf0ad228137"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_caf77704-56df-4e73-9db2-9c0deebc6f0e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_71022996-b893-4863-a057-6fa0061b828d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a853d9e9-5b4c-4e06-a0eb-b8b61df415b5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7746a220-6480-46cd-9c82-38bf88240db9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a8f31312-e99b-4527-bf48-4dea47df7794"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_38c253de-7fb2-4fa9-a65d-4ace98a15973"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7650eeae-eb07-46da-a2e1-122287db1812"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2410182a-afcf-41c4-a803-360a11a75b74"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7658642d-5dad-49c7-bea5-0a341e17e317"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c0fd531-dc0e-4186-8a18-a6984bb33d20"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4dcf8654-5c17-47bc-a8d9-482c29fe410a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b3f0f54c-1e38-45a6-9f1a-379813648dae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_10512a44-7028-4c32-89b2-a4062c5c498d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c67a6f54-5aac-45ab-8183-3d83d81c0747"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_24689fac-978f-4fa5-81c2-acfce1e93cec"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ed1ab47a-8311-4200-a668-50c1b3945ac2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8c42d556-4fcc-4f74-aba0-a34425ff5c3e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_49828fe4-22eb-4f6f-b02c-62e84e76377f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0c53bc53-eee0-451b-8b87-6493f180295e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3c85c61c-3be7-4310-80c6-606b99ef0d7e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9638a5e4-01ae-4313-9bd7-7357145d463d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_76d1c85d-cead-4782-b85b-c76d678e7918"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_980807d1-f563-4920-be07-6f58387c7380"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d9821544-91c5-4084-95f0-0a52e5537029"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_07ca6a9a-6cec-453a-82e7-da4fbcaa00ec"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_94c4139e-d2a2-4b66-beb8-6b9284323828"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_3309d71a-b1a0-4f82-857d-9d2dde6cc5cc"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6a5ad5f6-33a2-48d9-af44-1cb193eba8f9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3e8e1661-6070-4136-95e9-98950a48985b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_39dccc71-2967-4c83-9fe0-ea6fdd514a56"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1fd15375-f306-4e8d-b79d-5bf20fe5dca4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8258eb4e-1d07-4392-8458-897bef65d2b9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_721d4093-a6fd-4d81-a54b-e343ee79174d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_363d7df1-498d-4c3e-89c9-6d27685c5ef1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cd0d210f-e015-428c-b421-28720706e52b"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_79e98b04-20db-469e-a0b2-d51cabb4c3da"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a726773d-b2f2-4cf2-bd29-809b78380012"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f1c25c7f-e460-46f9-985b-31dd9efe1579"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1d7ba95a-e14f-4f21-b1a6-fa63489f2800"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_45cbfe34-db99-4aab-9c17-0814100a11e2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_78cd0048-a40e-4967-b433-23db4540afb1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fee3ad9c-91e5-4474-b4d0-5bcc24015db8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0083d21c-a4da-4ff5-97dd-e14270157d8a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7709e7bf-e8d4-42c0-b993-04ed14baffb7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_08abb166-30a6-4382-a25b-e345d4427a75"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_82eaf799-e490-428f-b4c4-3693d2f5e262"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f160a684-3b67-47f7-a13b-b9adf0dd3224"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f8a11481-410d-4351-9db5-fdf738377d06"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e9ac1c82-6d41-492c-87aa-648ae4489b5c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9e5b4282-e454-452f-8d77-7d7936abb1fc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4748aa89-61e8-4126-afae-b30ba7ec4273"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6cfab627-f7e5-4a6e-ba4e-ad6e06999c37"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_43cd9bb9-f55a-4eed-950a-aafe4e726b52"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d4b6eadf-b0f1-461f-92e1-6e2d287c6606"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c6077b8c-31e3-4718-9523-2a9229bb9eee"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d6685f62-fb4c-499a-9463-1e0ab1d66151"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_6806c500-d335-45d5-88d6-de4443ce8548"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_3e8bb184-114c-4bc3-9ce4-ac9a7524905f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_43c43850-d04e-4a57-97f6-b014b2c49d06"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ada8a523-7461-4a78-9c08-4862a80954a4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4096fa2b-08af-401c-9563-504c26c70ec4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_024a5ed2-0ec9-4f3f-a6d3-57294554964d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9a120d62-8dc7-46f8-8eb6-1f391172ffc2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_291bc86c-0352-457e-a8a6-6475891b52a0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d3ef84e5-2d1c-4f7a-8739-dc96052fe364"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_0755c231-48e9-431c-bcf3-419fca427dd9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f686bbe9-fbc4-4027-9b69-e629206af88d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6e587053-b1fb-4758-88fb-ebebab088eb9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_79f66ac2-a1e9-4f7b-8356-e9a7c8739c6b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fd5251c6-fd5a-490e-8c94-5e5edf499941"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eb93fa9b-e06d-4179-acfe-1a173962ad43"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ab5a5d8a-5702-4fcc-b962-bf995e7394dc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_72ef6fc7-1ebd-417f-a5f1-a449c5498f89"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6b5daa35-202b-463a-9c28-0cd107319292"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d02ffb7b-fc61-48d9-8fd7-1e117f8b41be"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_94bda8c8-b49c-4fb7-8534-ecdd5402808f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_938ee8fb-3b05-4c5b-b79b-d2f962553f16"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_78fffa34-fc98-4705-8aa0-97d8659ba546"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4295171c-0f26-4ee7-a23b-c99818e53175"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6a3b883a-afdd-439d-badc-c4a4d576d666"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b6ee5d64-9639-4d67-808c-9b7cf1e3be9f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6c0a6ab4-6ee7-4d58-8b76-1a29ae2c64c2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5ef24fd-e321-4be7-9cbe-ea83cb6b26fd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b4878e7c-bdbf-4712-bc8b-82f026c238ea"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_71bd9fd4-3419-4404-bf6c-f3e2358272c9"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a4c83295-0b65-4469-93b5-e6aeafccd023"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cc5a049e-946d-4d05-885b-7c04c5126fc9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_560b98e8-14ee-4051-aa23-e05c38b81bed"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_02111345-c66e-4522-b5dd-7fd2b5fc28e8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6276465b-c909-4d70-88a5-653ec727a854"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c134bbcf-1d6e-4fe2-b531-b890b173f919"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0532ec5a-c749-41fe-81d6-7fea57300105"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d24b7c97-e785-4356-9081-c0b70e461ab8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e03f2815-83ad-42d6-8453-4e7542a26ae3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a92ca772-4050-4abd-8202-6a1227893a11"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_a83b87a5-3d47-4361-84d1-7bbbacc8a38a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8e71e793-0415-4555-8eec-6990b75abb1d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a050377f-b5b8-469f-a20c-89a0d876344c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bec17665-c895-436b-8271-dd45188c5da2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ea55f3e2-d26a-42f3-90ab-615cc8f53765"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_90764e6f-e3f1-458e-b6ab-99b88e639e6c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fb14fbda-8a4e-4113-98c2-f14e1201b4d5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_02b6c781-bb7a-418b-bb63-295573d221d2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e295e657-ba79-4a78-a66c-f323c6d50823"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d5d5dfec-731f-4aec-9300-a71773077548"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a461c7c0-4ede-4846-843d-8bb01f783046"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2c54abc6-dc77-44de-a1b4-b956dcf6388b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7112d838-c82c-40c6-8c42-622aa464968c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_414b252b-055e-4cc1-8d92-bcbad6456cab"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7527452b-09b5-4b59-9955-2b86d0bfc687"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f2ec0ae2-5601-4ceb-8d28-85fe49151ea1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fc140a62-2423-406d-a4e8-d4e0c8150f42"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7296a3d3-f107-46a2-8536-e68c7786f2e5"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_2b961ff2-5b76-460f-bec2-cc1e1d4f4382"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_c2f4e1fc-1451-4ca0-8bbd-86f139542e20"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_a562eec5-7e54-4564-9433-71f537150b51"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4c6c9187-a169-4d25-ae01-23c5492b7658"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_37a3f785-b115-4cd6-9af9-c14b7a137a2d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fe825255-ccd3-43a8-a33a-e6a57df7feea"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c882e6c7-b594-4b94-9c99-b5071b592d48"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7bc6f83a-3182-47ed-b1dd-5e5a2b080665"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_96f42c34-97e4-4922-b7f0-a839eabc6c98"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c0f7856-0238-445a-a17e-ff00ddf19123"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c4701f93-53ba-418e-85e4-501a64d62d3b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_10291cf3-c70e-4233-bf36-c21716f0beb1"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_2bbfce1d-feb0-4d33-9c93-f2ded88e004c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0068cb5e-0f36-4928-8265-860eafecad6c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fa5dd92d-ec3d-4d8f-82e6-a16ac67743a1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2d9acd5b-6872-4d0a-973e-831a2a46f364"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_74777a99-0849-4e3e-a605-5b75f06bd528"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_079e6b31-dce3-4829-b1b2-4315b5bc98f7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3a7afb96-30cb-42fe-8a8f-1a13c3f1b13c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_caddb647-ca73-4fd4-9ee2-0cd9c7bbd272"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_093d2ede-4bf9-47e3-924f-2e2837426632"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6b015cf4-7661-4ad5-8e05-cece752d0eaf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e95b43da-34c3-4009-ad08-3470adee9162"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a2d69229-23e4-43da-ab93-d3bbdd74e747"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cb49029f-21f5-44fa-bc5f-c6fb011a3170"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_53576b42-327f-49f2-8b55-386a47331ead"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_046937f0-717f-4895-831e-1e5edd7bbe03"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_551ffc0b-e7a5-429b-ade9-786296e9b1a0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2021be45-f985-4d5d-ad6c-1bfa1e6e77dc"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ee09b152-d633-4da3-a8e9-426d8c4a5d41"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_bb753c69-bd6a-462d-b038-64a10d4ef3c1"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_bccb7421-67ff-4dc7-a38b-4907e80276ac"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c4d4c61e-cc54-414c-8088-eebc513345c0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_87924c2e-1dc9-4f7e-ad91-30de61465690"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_09d2c6c1-c65b-482d-9572-a0cdc8511874"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f476fe58-6400-4dbd-b2e8-8e7cc4b5e75d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c46626b-a678-446a-932a-5a5289fec11f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_20ff7dc2-e1c4-470b-8e13-98a0bcf0c2fd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3797fd33-a5c6-41f4-85b0-7e8c2653b998"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_26fc3e43-abf3-40d3-a0c8-a171e94851b6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e22e6785-c559-4833-9f9a-6b082ba01f6f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ba14403a-cebd-483c-bad4-dc7d77429a69"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_bcb84a7d-885c-4a35-985b-08e4d56d8b36"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_500b7020-6fc4-48e8-9ea7-5b5666c8f83f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b014a03-e033-4bc1-ad85-d5d435ed8460"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7ee0ec11-1819-4b60-a66c-af79102ecf0a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4a7c638f-3692-4fed-b0fc-31578d2387db"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_54f9c1be-cf0c-4f9d-9348-13bb5caad131"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0819e2bb-b0f2-44d1-b1f8-2ea6ecaced54"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_083fa02c-39fc-479c-8a99-bb29b4ccd21d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_05ecc46c-1cd2-4f39-a4c2-c21046f06696"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3020464b-a795-46e6-acf2-45ba8af05e6e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_65256dd0-6f1f-4909-91c1-c358b3cddc5f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5e4ae56e-885f-43ad-a614-66ba46a5c31a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1566c5fb-4217-4d55-8968-2e6575f5b5f0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8836c48c-16a5-48ab-b0e4-e4839a0c4a60"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5766ccb9-a8d2-404f-b436-423a85eeaf20"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3192fc0d-4c6a-4ba2-a5d4-7d59edc2b3e9"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_c59e7c1a-5652-428e-bb78-df46d18eda17"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_1947fb46-ef4f-4cbd-aa89-69de3319ec7c"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_f3552b81-3fbf-4230-a0b8-a16f6b8a407a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c84fde76-4c0a-4d86-8281-33725741ee27"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8b265d40-4e79-4f81-9943-679cdf5473f7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_794e0574-de4d-4116-afc7-131d5d345688"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5c978f3f-9a8f-49f3-9139-162daeeee728"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f461d5d9-4824-4307-8b0a-9da56cd4f5c6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_75400559-a359-4306-8ff7-2d1e33798791"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cbf89c2f-4ace-4a28-8f8b-9e963515deac"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_003a280d-6bc9-4215-a11f-3e5f691bd0de"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_35f5fa81-7c9b-4725-b0a7-97c73a79ad64"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e2925b20-fcea-4d9a-9f17-ba54a4c0b3c4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f585255a-4fb3-44bd-95d4-dc6d6c09df99"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_715f7fe8-cf38-4f3e-847b-35e3a3270ecd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b32cb1fa-cb23-40e5-bfea-345cd57e00ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ea5ab169-88bd-47f4-8002-17cd56d730a3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d21d3b88-9de0-452a-86d7-4881b26841ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_421b7a8c-83c4-491a-a59e-bbe0ceea7949"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_705e2a3f-0f7d-4a83-8f6f-ba7c88c4e1cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c504b716-3009-4148-aa74-91901c236da0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c1c036e9-4611-45d1-9a4c-d9d87a76f89f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7f3dd56e-8424-4f73-80bc-e317890bbd66"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cc7dfce5-93c3-4874-a91d-d46f6abece17"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_896cd657-fdfa-48df-a77d-56bf0ed53367"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6909af84-1572-4e9e-8ec9-5fda0500cd41"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_27862398-c3fb-4b00-a4d4-0df259b5b875"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1e2ad304-18b2-44cf-b868-b67a2b0e89e0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7b817d1a-ef4b-4472-a1aa-64924c964694"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_bb4f813f-f01a-483b-bcc4-0d2600d5512b"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8662ef9f-c632-435f-837d-003a524f8cc9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_839847c3-cc78-48a0-8c68-5cc68f06824c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1158d1e8-ebec-48c4-be51-cf2c3d514741"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b920d5b0-9e5f-4309-8fe0-dbb0279d46b5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_51622b53-5bd3-460f-9a15-540617ba08a7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b9d94c54-3959-4435-ad82-e6ccfcd6847b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5e8e7696-b9b5-4ef7-a8c7-6fe99be00804"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c57af1b2-8548-4798-94d6-8168fbf1981d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_83b96bc7-5cef-436f-8d99-b03fb8be82f9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fa150888-31c3-4fe7-adf7-93bebbed292d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_276405f6-17f0-49d7-a89e-d44df4efcbfd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8eaf631a-d2e1-41c3-8fce-187dd5ac4d1d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1ba518b5-c19c-4793-a400-8859f4fa11ff"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_57273d11-92bb-48bb-8e26-ca7974b79f4a"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_19656a60-d767-4122-8ff8-48da438d741d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9ff893c3-39c2-4582-a02a-8fa4b70a62ce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4f78d9b4-d42a-4ad7-854b-04dc5abbe8db"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_31052d39-926b-4cf4-89eb-e960d58970f2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1faf5eb0-5436-46ec-94a6-c3fb2c94ec25"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f64a244d-8bc4-4492-b331-a13ad72e793c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cddfb80b-6c55-416f-ae8c-ad77e1a0efdb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f6a7eea8-b407-414e-9708-af1351f18db4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_05d31e9e-600b-4815-a8c9-6a4134983386"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b2c34879-9adc-40e5-8572-197bc9febc78"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_49a73c5d-76c5-4c32-9b84-f855e723a598"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_04b5c9cb-a737-44ba-be47-55190b8f4aae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1bdfc6ef-d62d-4320-b851-dcbcd3b5e818"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c23114d7-23da-4b1c-84c5-f5d4f11a1ec5"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_87c93210-b2d7-49e9-83ef-23817359ce1d"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_5ed3c53b-9313-43c4-8af9-adee5578990f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_90373d35-d331-4d7e-91c5-17afa4537885"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9fd18bec-fd1e-4380-bac9-d126b3fc0eb4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ca3b8769-2a7a-4ad1-811e-5bafd330ba2e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9f769384-ce31-4ae3-bd73-1aa71710cd32"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_16f229b0-0fda-4fe1-ad31-b564775b5373"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e9d24781-9752-4528-82cd-f83b9cfa5502"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d695023f-96f2-416b-bd39-38aa5cc81f69"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_72dd3246-f446-4210-9d4b-e14cd91fbfc7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e78c01d5-7ba5-4cc8-9647-51f0c80db911"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_88fd73f1-a862-4845-8e15-deb30b78f7e7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eeae3027-d95b-42db-96fc-9654468f4fc3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c4fc1453-587e-435f-bd2f-2b00d809b0e8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ed5d12a2-4f07-4512-bf1f-9631e77f9d9b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9e0ab042-2552-4c08-bbda-cc6e655a41d7"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_7f0fa75b-10f6-4352-9347-d2c5183916a1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8d329985-ecb3-4dab-a9ad-5818e27c75b6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fdaa7a6d-3680-4532-982b-d79ea5b6c454"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_38b421c9-c79b-43df-aaef-31f86b76debb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_46f9ede5-7fdb-471a-8954-68025b5be356"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a9a148d9-635f-476c-aeb3-f61332d3f474"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_389ef8fe-b7ba-4f43-86e3-129f154a8c86"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2328b925-a073-4a4c-bd69-938c55413fce"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_854cfaa5-75bd-4f0c-8efc-1b5c04d85ce7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6c7d6d34-230a-4ae1-a231-60a6903f6bed"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2cb05d43-6604-4686-8ed9-ff301108e58a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_295c4707-07da-479a-b8af-395804015d39"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_09dfafd5-f03b-4d5a-bf6e-09c49ca9733f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_caea4a2b-58cd-4a50-a441-b1df03edbad9"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_8222b589-52a0-4a58-85bc-6d6362b5c4bb"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cfab492e-e1c7-4f30-bdf7-af51155175f0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_26e055ba-d7dd-4261-8e4f-c69aac399720"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_defcc56e-7082-4cb4-886e-a0d89568d483"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_21dff900-fb3b-4b29-bb5e-d4db768cc382"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a12257af-dabc-4a54-ae48-5c39c7980ac1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1f7888b6-acfc-4e25-887b-89ac433268bc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_08dfc542-8d22-4e95-9a9d-c411abeab96f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b86255fc-df3a-49d0-b2a6-a0c1f945fd74"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_879c61fb-a7f4-44a6-b075-2772fee5c276"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_28950ca6-41ef-4184-97b7-9998f5a6985f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b563788-c7f1-4f0d-bb2e-e4dc10eaab71"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4a232770-05f4-4e0e-9454-43b97341b42e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_20bcc2ed-464c-4a3f-92ab-fbcd470eb7b1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6b897de4-d866-4976-90e1-5d41780bdf1e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d55ed3c8-6182-49db-bc86-58b91468801e"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_e5600298-9de2-4419-9f6e-a2b9ea3b5884"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_77b2b1da-1e0f-4d0b-8e1d-04b01dc9e19d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_42ade9f9-1b8e-4a25-b43c-11ed50b2517a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aba96658-cfd9-4ccd-8f38-f46ae366ba10"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bb370f40-9f85-472e-962f-64a11aed1483"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ce3b3eca-a301-47c1-8102-b5c742057187"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2c080e4c-e834-4458-8862-95700e34bc26"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3a0b19f8-3496-4707-b818-56c268980cb9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_73100f9d-bca9-46e4-b9cb-3834b1da5818"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8da6c424-8066-4c57-b347-66824e305c0c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f2955b63-0f90-4917-ab1e-759b1bbc8d80"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_88e1d065-794b-4cf9-bcbb-6f8bd46f056f"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_fe7c2c4d-ea62-4dbd-bdb8-074f695ccf40"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fc8226cf-690a-4af4-9fcb-0bbb19aebe36"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_915cc544-36d0-42b5-b546-92be676c21f6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_643e4c8e-d368-4996-8b17-56f2e953a3c6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9ffaa3ed-ac7f-413e-994d-e3f7c2ef366a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c87e8583-0278-4315-9e0d-b30c7014930b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e2be6242-6fd1-4d03-80d2-0fbaec4ebcc6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ce1ac5f3-5087-4b36-a350-89579049fef8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3d0b1489-2880-4609-ad75-f17b53de50e8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3ae7b06a-1353-487e-90da-439a3f182185"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_86328233-8e5f-4d31-b166-ffdd158fa1b8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_42d75752-0aa7-4780-93a9-629b069a39d6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1279da42-d57b-4e14-aa46-366dc633a865"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3718d09e-9fa5-4cb1-83d9-8c5a1128cc1b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4d22d286-3978-4c45-90c9-94c71b3d12c0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a0791317-96de-4b27-b390-f65ccc3419e4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4bc04aef-d7be-4dee-9bab-af7f0c0e475b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_27febe82-d1be-45ca-9d7d-b03753c48cb5"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_7e10e57d-cdf1-4528-b1ba-cc48d3c7b834"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_91950fb8-2adb-46a0-9e27-cceba0a71f0d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6a5d4d08-4946-45de-99e5-b3cf0f30db66"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a1959d1b-e799-4325-a3b7-c685fa75b2d8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_15fe53a1-b7f7-42bf-8ded-3edd79b68854"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e67ff6fc-ebc5-4540-9939-2611c444e127"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fdb9a93a-1680-4a44-9624-5c28ccecad36"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3eeedd63-5357-40ba-88df-bf18a690d037"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7011caff-01b3-4e00-b400-273089a5fcf3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f058720b-1abc-4c1c-a359-29e1d1e5093a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0d3d8616-2b4b-4335-b906-b7a9855cab1c"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_4cdbb97d-6590-4a6a-a732-42e37c03e333"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_4af0d14e-10cb-4edd-9fe8-8d4217df877d"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_bbd95981-25a4-459a-abf4-c4fcde54b8a5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c512ccf2-798a-43a3-b277-437f530f9757"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2be491e8-9d22-4486-80f9-4671eb615ceb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4c0238a3-75c1-493d-b24f-7734fde56748"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c748ffc2-9a6b-44af-b531-7e6e2c6f0e0c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b2c951d3-2f70-4bf1-b79f-b51d36cccb67"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4ce11f14-b571-417d-8161-9df610cc8a91"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cebcee0b-09a3-487e-bfff-139ae3da1033"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0dcdf3a1-0728-4ce4-b992-0f96015753b8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_64f9d9f3-4c54-4776-9584-e564bc1c9d97"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2032554a-0206-4853-adcf-555cd80a928b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6d1ede09-dedc-4897-b5f9-ca1e143cf202"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b26bc3a3-46d0-4120-ab81-891e20efaaf4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b78b9fd2-fbcb-4abb-8ce7-7d7ae75458e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_56fc8783-da5d-4bd2-9a10-e8f76bc80d4a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_641a47c9-31ef-48a5-9934-265f1db273ad"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ef019baa-62ee-4bb8-b9a0-6891aa84f55e"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_9746069c-25da-4321-bec5-6a6a9685a92c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d287fda7-c3b4-413d-a36c-e81c10edfcb4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_389c9eeb-7e8b-4820-b7fd-60e37777e581"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_53811400-8bc1-478e-95e5-9ff5b2cd01cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a21c9e9f-e9f2-442c-a841-8de7a79ffebf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_32182212-90fc-4e7d-b6e2-0fe2c2e9e4c7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9bcdc395-e759-4ef9-87c9-ae81fa13a051"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0b6d3193-bd4e-45ee-b0de-a112b460028e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d076b091-4b4e-4647-b8f7-3be62c9d026c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9c6b47ac-e485-4213-95c1-e4dc30f16238"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_df8b0824-1862-4cf7-b7d1-5bc82ba78f6c"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_130bcbb8-c3b2-4798-9f50-928173a881d7"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_c649ef7d-d47e-4ae2-9eb1-6de0bdd59ee1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ae253fd6-f76d-45f1-9735-e832dfe17b28"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_27e75848-5cef-44e3-8d46-d1aeb705b48d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c7fe3c67-ddf5-43ef-9d42-e85dc3e63d63"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9303f599-7e44-410f-8bf0-622e7e3c954c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cfaff772-c4b5-47f0-9e75-31c4ecabde91"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dbb7d770-a0ad-4546-a7ca-c17a5f9c1c7f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_18841667-33e5-4b6a-8b4c-370bf79843cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7d5a74a9-b34f-4673-81d9-cdf039aad74e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e4e2cbac-4d70-4b21-a608-815889caaa58"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1e3f8753-d70a-450a-a44b-74f618a07c38"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_36e9ac13-2c2c-4833-b17f-8d7d338a172d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d06c3250-6f08-4c10-8c60-23e809d97173"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_905ce5ad-c0fc-4c16-97a6-fec8e11c2dfa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e71f682f-ef52-45cf-8fbc-73e9215b2f40"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4d2c3fca-f118-4597-bd57-b9ea747f6558"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7a421b80-cdbb-4da7-9974-c6b3fadc014a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_782cf440-c5af-4e51-af10-bc8d6616557d"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_eb3c4ae3-6905-4046-9231-248df936795d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5ebdec70-66ed-4dc3-bc83-0ea0e1b24eae"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d39fa4fe-ad0e-44ab-9532-c8193662c9e0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_802b46d0-d5f7-4478-9cb7-6ac2e395d0cb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ecda3898-9c1c-4c25-a69a-59c03e53746a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_02ae7157-0dea-4076-be9f-cb0d44fbd69d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ce6ac6f6-6023-4df1-b0c0-0b13ff74c21c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ec52670f-5c77-4daf-b33f-1a5871b88ee4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0665bba6-ca50-48c4-9717-16dd2cd3caa8"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_0f3607bb-448d-486b-849d-30f16bd9d230"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_7f6ffcef-8e42-4367-8e3c-a13b19d64fe9"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_11125754-7454-4dd5-89f4-79be057d7fd2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_42684393-42b5-48f6-aa29-44864fe7bed8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8644282c-71b5-4952-bbe1-cddae2d798a3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2b71e712-3c96-4b13-a918-5712867f722b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b659b49d-0c68-43f1-a860-8a30f48f498d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6154be5e-9d4d-461f-b8f5-f579d9b58ea1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f4f77c72-8fca-48b7-9576-a2aab2c4676b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2eb2f657-5c96-440e-a229-4873a61c080d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2467d6fc-7640-4cbd-b0c9-501fd531d90b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dc79fd0a-4967-407e-b47e-5ee76ecbcb7c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c3ba2727-74fd-420a-a254-aef6ccc1ec45"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4d2d6ccc-7b54-4686-9ce0-fd160cfcb974"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f7db63d7-4b36-444d-9e8d-80510186201c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_48d4042d-9faf-4a52-a09d-b3b77949cd2b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8c89f4ac-6680-4528-9253-9cb9cbfd7454"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f77d6c26-9888-48d8-b9cb-206314afd1b7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0c79f3cf-e8fd-403a-9638-d52187df6e4a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f2bea390-dd7e-4b06-919d-6343b8e7a6e6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_11a6e28a-3b26-4027-aadd-07a62914f2d2"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_db9c2544-0a38-451b-a2fe-816988c2184c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_81c6a607-1d69-4c30-995e-460aaf1567d2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_667718d5-1f96-44e8-92bd-da9c0ecb8aca"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2ba50907-a2d3-4ed6-bf32-dcbf124b681f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_362720f9-1dd6-4d0a-b5a5-a2bf6b48ef23"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a1b10c86-0ba6-4874-9df1-c5aba7e4292e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_19a5bef2-b7e1-4418-94da-b8aecd8bd995"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_54b9b5ba-0cc8-422f-b46b-f15953840c59"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_1c52d001-eed8-4099-9802-ea25eb38b53b"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_0f83c732-42a2-4aa0-aed5-0ad496c11f43"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_703c2ab1-80ef-40a6-a405-0207925401d9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4db0f7b7-b91f-4767-bd67-13a875edf2dc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a8f367fb-1954-40f5-92dd-92846ac391cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_add3b2f8-d2ec-424c-9e78-c04ba23fb2f8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_38bc9515-ef1b-4fbd-babd-819ec30e7f74"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c9963ccd-0324-4b61-90f2-47cc9a63a97e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_af50f6a7-f662-4c58-b76a-c7539b5cb947"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0eef4700-ad31-4279-b087-589c6a75f945"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_35e5b47c-c625-4db0-ae1c-68677485d1fc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d008c86e-599e-4b9d-8f72-a9654bff23a7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9e51b3f1-e8f8-4261-ab09-25e39e95ce2a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5e63d95c-b8ac-4e27-aa11-7893852b051d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b5646e68-7b3e-43c3-9818-6c47731fa8b4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_be50e566-27ca-4b92-8ca9-8a3e3ed9f642"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_408ef2d6-2659-444e-aa7d-36b3b4d2c6f3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5ed24100-1d4f-4947-9025-0114d5970a84"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5b450b72-e6ac-4f39-8f3c-bf791030c836"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_335ec7ef-3bf1-4d0e-9670-612ba490527d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d6654e17-79f9-4000-9c17-66caf5776d28"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dd7dece9-db3e-40ec-98a5-45b1273a8ad8"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_e2963a48-4552-4436-9198-5125c87f08be"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_279efc78-7fdd-45fd-993d-1fb42de5d0d5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aa1ff8b0-056e-44d2-9655-7691dda50b90"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_26e9e0ca-2b44-4074-881b-45e0ade8a76a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_afeabab2-c0f8-4f5e-b461-14e658ac83ef"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f477ff32-00d1-444e-beb0-7352bf29e117"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_32c86306-ad10-4b76-bd09-397f0442d083"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ff2db179-205c-4f29-a39e-73ff63d568f5"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_a163c2b0-317f-4f69-8f57-69f3ca1fa0a0"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_cd3af7fd-f485-4daf-b582-fbdc44c6cb32"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e8a94d31-c84f-4749-9ec7-ff7cffa0e1f2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5786714c-5513-49b6-93e4-6d6937b72bc3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5ec07a8f-96dd-44cc-830d-c30331f33211"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c118c01b-0b4a-4945-99e0-19f1792bc849"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_383dd15c-5dd9-4e5e-8072-7f6d0bc85249"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b577d24b-4b90-4469-92eb-c750a790f8bb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4c987d92-9cff-4a15-a1eb-351ed43b9869"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_48cc78fd-acb3-4baf-a9b6-2c3b02607ac4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2c69050b-f543-409b-9b19-8b05d30b1d48"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c27162b5-7f96-4f84-ae81-b40e4a6a2979"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5af0c47b-e19c-43e5-b3ef-cfea0ea7d801"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_98435648-d2fd-488f-9c9f-3bd3209e130a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f423eee1-9357-470c-af56-f3d6b0c882ec"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4a4f3706-07c9-44d2-a9bf-922935d9856b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d375ac62-b8d3-41dd-a8b4-084fa34bb953"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_895bc425-7ff9-4de8-b9ef-11fff8f4ff84"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dbf05f05-18cf-4884-b952-3ccf5eeb2d1f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dbc39545-5466-4007-9b21-3142a61665fe"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_db07c03d-4dd6-4c90-8311-a1631e37794d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ccc3a429-a71a-4762-a5d4-a695b771768b"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_7bd4ffc1-e91e-4a69-b1e7-7d6696938c2a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_44eff375-a488-466d-8072-5e480ee14bca"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_de1acd7c-6bb9-4bcc-83b8-5ccb5a6381e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d1dd9d21-856b-4a1d-a317-40e7afb1726c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_46d5ed38-4796-444b-8917-b9aa0db2dc4c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bffedc47-4af9-4f11-bd8b-3d6d4a346798"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_712216a0-653b-4556-a46b-c39bc2fe89d9"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_912c4687-3462-474c-81e5-137b676882aa"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_d591cbf6-f199-4a58-927e-d6f34798cc92"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_929504f6-28c8-476d-b7ce-a33c8fd369d5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_09718b19-58ca-4be6-a73d-6b8ac8b2308b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_83004555-3fa7-4f09-8a1b-773742e4bc5d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9930d33-3fcc-4ef1-9b49-ea7d74ba741a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4142062f-a63c-4184-a9e4-3ee064d76003"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7b002081-f2de-4197-b6e9-a7f2ebd8ca90"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bf557835-1e65-4e90-8acc-704c6bb03b6d"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d2850e2d-c32a-492b-8b56-54037bb08738"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_976c8f4e-d121-4afa-8bf6-f0ccdc17b1f8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_403491f8-64ec-48a4-80af-65b85cb9c8f7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_94043ccc-44dd-47cc-879f-ad726890810f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2b5f1aba-0d14-4def-95c0-257d7e444040"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_36a9ff43-b48d-462c-8e8a-392fd077c017"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_165e9877-a0f0-44fe-a889-84e7c2ea1b14"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ff82ffd8-cd90-4f76-bdf2-4567c03189d7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d8078385-b639-4c18-bbf8-a2f045a4c3db"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2c43e643-670c-4150-8fd6-1db38e662438"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_76bd6357-19af-47a1-b7f0-0ee116b7ab30"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6029d6bf-9ec1-4780-b4e7-f273c1d1e824"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aef95c84-6fb6-413c-8b2c-99bc4f637d8a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f9975277-181c-4080-bc6a-fd523943ac05"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_54629954-0bab-4d14-a118-262d6493eb91"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2b635e91-4a66-4dbc-8cf1-08f9e0af1a3e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5d727017-4444-4adb-94b3-68e227cac264"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_5256d3fd-72cb-423e-89c3-e6beb4b01884"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_29c68246-d190-4ae7-b3cf-c6278fb2bc29"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_ab938560-c5e7-4bde-bab5-bd56ad290b73"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_60592e7d-c63f-4b38-bb43-a41ed7a3a943"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_60d8c9cb-ee14-4651-b50c-207769e9f6de"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_01679861-2a97-4e26-8eb7-43d68a0ae5c9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ea808397-e3ec-4e24-907c-7084ac245e79"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_19946c24-0dbc-46a9-952b-10f0ffd057aa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1d98929b-6b06-4b00-a762-07f2b366e6f4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8a8cbc24-2f5c-4e87-91dc-070021948cd0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c8aa3723-e03a-40c6-bcc4-91435f871686"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f1684ad9-f866-4aa8-b435-72188359fcaf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bb361016-257d-4d21-8745-bcf34e856259"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3081ebc0-5a85-469a-be71-fe9f7e8d0278"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_73570ace-4cde-456d-9270-f2da579d16a2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2b093cd8-5431-442c-b05c-82f8ae75632a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a6c274da-3fc5-4238-98c0-ea61d6dac8be"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7ac8d856-9471-43ff-8bd9-073378360450"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_654ab028-870a-4b16-bac9-af8f2c8db186"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_703fd900-ec79-4e65-b957-496542d480b5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0e5b53be-5ba2-4470-872c-3e12e57235dc"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8b159948-bbde-4579-a50e-44e008d831f1"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_644fcc00-824e-4bfb-9c89-a3b0ebf1af35"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_664f6df1-4b80-4fbd-8a76-5bb0f8e61844"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1f300f72-5f55-4b44-9ff1-36b21b639215"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8a5822bf-1e33-442a-b243-4c4b9eb5d706"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a2f8579d-6511-45a9-a544-8bebde96d8ff"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_f9e9d700-2969-4faa-94df-fe06b4947ec3"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f7b5063a-dbc9-4855-888b-57eaeb55a20b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4629a764-e6d9-43c1-a864-b31fec671661"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_483e51f2-be6f-463d-8b58-34ecdb2e10fe"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_7b55dc01-ce9d-4f0e-8b82-42af3f74b0f0"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_fd6eddd2-e082-4b5a-a4a0-2e7ad5fd4ed8"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_0c481d05-66b8-44f1-9b7c-ec10534a487f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_15eecb8f-34cd-4958-9d47-7b84664e4da9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6bc214bf-c595-44b1-b6cb-f06bf5bf94ba"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c474e28c-57a2-4368-afaa-9540d9568b84"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7f1705b9-f128-4bfb-85ca-b2286cd089d4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9aa49a67-2a85-49a5-bb7b-685f63a22683"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_40cdafec-6160-468e-9aa3-6cb2e74e13e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3ac71a51-0637-438a-abcf-4b88c146f262"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c9ff73bb-2f16-497d-bb52-b32e9a1ad1f6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a1ee244c-5177-46d1-8c98-96fd6f520cc6"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7608f240-15ce-4022-99aa-9d04be4329b0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a1ad0767-b700-45d2-a378-c09851fe8a31"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f7d67f7f-81c7-40ba-84c8-04d150448410"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4c39fe69-35fb-4594-8113-24287cfe4358"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_57794f61-4b72-4f67-891e-555b393d0a26"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a15dac51-59aa-42d6-b6c5-37118a456f9f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_70a4c9f9-6248-423c-9ee8-550c37fdd558"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fca6477d-5a0d-4726-a1e7-c71a9c3c6221"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_969f4e17-35c0-43d6-aacf-5430a28b4ea0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_67e84bf8-d01b-4846-8a61-dcc0462b0495"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6264b258-5ca3-4059-84d4-350d09db3cb2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_24e5cbfc-2c03-40ca-b2b6-9bd70a335d34"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_689ff617-10d4-4e29-a404-d233de2ff250"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e07c7978-9ec4-48a2-b029-93bd2549478b"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_98143cb7-26aa-49db-b5ec-10a9f4e3109b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a2b411b5-2914-4df7-88e7-5f51be07ba18"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cf2af6a9-30e8-4ec9-8ce2-235712438d64"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_8119f94b-b71c-4ed8-bb01-5e521d264a14"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_f1972138-db31-464f-94a6-42c05294da67"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_70d9f9ac-59a2-416e-ba67-2a4df365bf4a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5091260-5b34-4864-bdbb-e04303cf5a22"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_87bf757b-9f0b-4d40-a984-1697e86278db"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_34a157dd-810c-483d-a528-f061f6141720"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_99604a6d-417b-46e1-bea8-e880ae3bb183"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_219f94bb-c4bb-4b8b-a4ab-0adb4b69ef16"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_12d18926-8c93-4e47-a441-25e4a4c1bcef"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_564f3016-d830-44c6-98c4-e54b9fd15b95"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_53f549b7-6062-4239-9bc8-265d722c4cdd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_348b3fb2-415f-4333-a5c1-b8cf5eaf608b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_2503d2e1-d07a-4f9f-8726-5d74cb9684e5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_101d66dc-6186-44f9-b1a9-5ad88be299be"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_54cd575d-aae3-4de6-9908-1d16ea20759e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_4946bcdd-a9c1-4761-ab26-14d9759c5005"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_d472a10d-1c3e-4dd5-87cc-c63df964d435"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1211d551-c049-41e1-86c9-53a826642478"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1b6c8dcc-2ca9-43a8-a7b5-be02db1d8e74"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_59e94238-782d-49fb-a6b0-5865e0f6a611"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_cd192655-604b-43e4-b63d-f92335fac37a"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9627c3fc-b042-42f5-b737-c1905c46ca01"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_29623689-b3f5-4808-816a-81597d2585ef"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8accb211-dbfe-42fc-b5c7-e68af28ae1b7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_7c52ebd1-49cf-4853-93f7-ea784ee06b69"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_daa65b9f-460d-496c-9bb3-66a97e353a44"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eff1f8d6-b223-432a-9b56-ae7f3be5b841"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_b9a7f730-b726-42a9-8e8a-274a34bda135"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b371eea6-7cbf-4c55-9620-8599fa207857"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_700596e3-2e9c-44c4-84df-beb189e2285c"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_be958f98-5482-4f00-a84a-59fb6e8f624f"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_a81692b5-b6d5-4047-8878-b663973ac878"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_861dc534-2d7f-402b-bb88-bd703f2ee5fa"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_537a3f2a-03ae-421b-bdb7-9566323f3019"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_54831d10-5ef9-4389-a89a-8b74dd069233"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0002aafd-33a0-4df6-b962-79d475a86a70"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b908100b-b211-4e3d-941c-8260f98e4957"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c5caec3f-33a6-4feb-a578-313baece9826"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8e4746e7-2a24-47cc-83ac-3312806799cd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1dd03bed-8b5f-4af3-a377-b520b307d46b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3b5d0e67-246a-4c0f-8434-7f9517f9f4cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_dc635f32-34f8-435f-9345-0f856db7373f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_def22bb8-c2fc-41e8-974c-710ae4a714fb"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aa94a43d-ed53-4180-ad44-b26208d2157f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5581510-d9e1-465a-b322-2b1b1d079cb9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ad17d01e-85b0-4c99-b642-e46a8f43ff4b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_aa2157b4-9954-456f-b416-027cb83f0ed2"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b606ba1f-3132-4df0-ae91-804ed0757a0f"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9ca34047-b23e-4e4d-b6c4-52c83f18c352"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_057c51cc-b34a-4c3c-a5bf-dc9ac770b5d8"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_58b41e5e-7da0-4875-b646-4d54121b3cbe"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_e2de915c-6cd4-48fc-9f21-87d82c090136"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b6d82e95-cdaa-4058-9e6a-4e35c14d4b84"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6041cd9e-af5f-4236-91ef-91e21e804117"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_697126c9-5d70-4f54-9ec3-5fb1ee398dd7"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_74aa869d-d760-472d-a755-91748d7106c0"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_16ec53ca-cc77-4895-8dad-882b94fc0927"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    },
                    {
                      "attributes": {
                        "id": "_2091d688-a548-4f00-bf1c-06c86ca9982b"
                      },
                      "dmn:text": "-"
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_a8a265f5-09f6-4bc2-a229-c986cb5aa800"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "_9164c282-6504-4a11-b4fd-dcd16b79cb3b"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_4c1d8ee1-e66f-4361-a286-d4c12404f761"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_1aeefa7d-6047-4d97-84e2-52b20193eb21"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ec52544c-8c55-4862-85c9-be2c1df2ce47"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0644ae7f-9981-4a89-ad27-3d2a014e20cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_52b1f5b6-e0c7-41af-86e2-c2756f52b76c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_474f6bc3-247e-4369-8f3b-e358616f6003"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_6ff7b06a-6a05-4d77-b187-a3e0c201b410"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_0c62dfa8-c832-4187-8e2d-0f735b832e1e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_b6db89cd-a566-4b95-82fa-2531700b3888"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_a5d8f034-2b80-463a-a542-46a48725b41c"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_eafa7ca7-f939-4e48-a6f4-8de3bf6b24fd"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_65eb00d5-fdc3-4736-83ef-e039cf19bf5b"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3d52d28f-ac32-4589-9f9c-b8dbb716ac3e"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_ddb0fe12-1f51-4820-93f5-00721dd844cf"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_86ca8b30-0e1c-49be-b52e-e7ada3df91da"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_fb4ebb1b-64a9-4a7f-a8f0-dcd7df96e053"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f07144f3-ad18-43a8-b4ef-65499748de93"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_05c6c3f7-95ff-4a65-8d22-4afa365fdf47"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_702cec09-3bda-42a9-94cd-024ed0b3bd35"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_8b1534de-ba77-424b-a212-aa0e219bf260"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_bf2cf4d0-c3b6-48bd-ba67-da70a50d4d69"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_9ed9d593-1991-4871-bd9d-dedc00a13a61"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_57043d76-0656-4141-b5a0-8454fb9316b5"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_f5994dd7-76a6-41f1-a5ed-4a3766456dd9"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_c2cd45ff-1919-4270-afd4-31742f7209c4"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_38a056d7-3f91-4e02-bf1b-39ca86124f47"
                      },
                      "dmn:text": "-"
                    },
                    {
                      "attributes": {
                        "id": "_3eaaa1c4-effd-432c-9f0d-62656df80728"
                      },
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_14ce86de-2934-4091-be36-abb855c8e198"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt een vergunning nodig voor het onderdeel bouwen. U vraagt deze vergunning aan bij het landelijke omgevingsloket. Klik hiervoor op onderstaande knop."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Vergunningplicht\""
                    }
                  ]
                },
                {
                  "attributes": {
                    "id": "no_hit_rule"
                  },
                  "dmn:inputEntry": [
                    {
                      "attributes": {
                        "id": "_68c04652-29ee-4b76-be6e-60badf62f7dc"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_80946d9f-9d50-4c09-9ca4-9c75ea619752"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_8eff6f9b-78d4-49bb-9831-94382f26bf0b"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_cdf26b65-4c37-4c32-8ad0-ea7338a09b02"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_dbaa84e7-65f8-4473-8724-6ba34bd4e4b8"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_d7e369d8-122e-4cac-b828-ba0a6e8bbb6d"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_4dbf15e6-464e-4e7b-b55b-a273535a8302"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_99875b2b-6bc8-42f3-8b42-606b08a56910"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_15011e09-49b5-4403-b36c-8c5e0ced8e9f"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_ea65dc90-2d4f-4101-9f91-7fb9b66cb763"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_85478a3c-61fd-4a4f-a768-a1440b45739b"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_de8d39d1-49c6-4dee-b93e-226ad979ce6b"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_bcfdff37-1712-4dea-a3f9-171499837e43"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_191fb3a4-3e78-46db-905c-616792787bba"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_c4183868-de61-4c8d-b4ba-1a52c15b604d"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_a52d475c-9e36-4475-917e-960e3b58b359"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_7f07edc7-f933-44fb-b9f1-1a76d9e02504"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_079f8f18-ccef-425d-86ef-cb28f5c54f8e"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_88131905-4e0a-45a2-bcb2-b742465e1dad"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_0bed9f5d-20b1-46d9-867b-40291524a015"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_75f7cfcd-fe39-4461-aa68-8a807548e2f6"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_3906b058-64fd-42d6-86d8-9ff40da32d49"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_2754ebf7-ee00-4e7a-a6d8-5c4ad36f6e89"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_ed7f42a9-ede8-43e5-9bd6-f1b47d63205e"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_cfd024a1-6e3f-4216-820e-0d9dff8cb6c7"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_95a336a7-171c-4745-b1f1-7eb026360bd2"
                      },
                      "dmn:text": "\"no hit\""
                    },
                    {
                      "attributes": {
                        "id": "_025e0efd-1323-46c0-9e69-43670395650e"
                      },
                      "dmn:text": "\"no hit\""
                    }
                  ],
                  "dmn:outputEntry": [
                    {
                      "attributes": {
                        "id": "_d1d25bfc-e732-4cc1-bdd1-bce43f9952c0"
                      },
                      "dmn:extensionElements": [
                        {
                          "content:conclusieToelichting": [
                            {
                              "content:toelichting": "U hebt geen vergunning nodig voor het plaatsen van de dakkapel. Wél moet u op een aantal dingen letten voordat u gaat bouwen. Uw aannemer kan u daarbij helpen.\n\n**Waar u verder op moet letten:**\n\n*   U moet voldoen aan de eisen van het Bouwbesluit. In het Bouwbesluit staan ook eisen voor de brandveiligheid.\n*   U moet rekening houden met beschermde flora en fauna. Bijvoorbeeld een nest zwaluwen onder de dakpannen.\n\nDenk ook aan:\n\n*   Het plaatsen van een hijskraan of container op straat of het reserveren van een parkeervak.\n*   Het afvoeren van bouw- en sloopafval.\n*   Het risico dat u asbest tegenkomt.\n*   Het burenrecht. Denk hierbij bijvoorbeeld aan uitzicht op het terrein van de buren.\n*   De gevolgen van het plaatsen van een dakkapel voor de WOZ-waarde van uw huis."
                            }
                          ]
                        }
                      ],
                      "dmn:text": "\"Toestemmingsvrij\""
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
