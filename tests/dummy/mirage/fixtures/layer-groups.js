export default [
  {
    "id": "amendments",
    "title": "City Map Alterations",
    "titleTooltip": "An index of alterations to the City Map. Alteration Maps show changes made to the City Map and, when they are the most recent in an area, serve as an official record of the City Map in the area they depict.",
    "legendIcon": "polygon-stacked",
    "legendColor": "rgba(174, 86, 31, 0.4)",
    "visible": false,
    "meta": {
      "description": "NYC Department of City Planning Technical Review Division",
      "updated_at": "6 April 2018"
    },
    "layers": [
      {
        "before": "place_other",
        "tooltipable": false,
        "tooltipTemplate": "{{type}}",
        "highlightable": true,
        "style": {
          "id": "citymap-amendments-fill",
          "type": "fill",
          "source": "digital-citymap",
          "source-layer": "amendments",
          "paint": {
            "fill-color": "rgba(174, 86, 31, 0.2)"
          },
          "layout": {
            
          }
        }
      }
    ],
    "legendConfig": {
      "items": [
        {
          "type": "area",
          "label": "City Map Alterations",
          "style": {
            "stroke": "none",
            "fill": "rgba(174, 86, 31, 0.4)"
          }
        }
      ]
    }
  },
  {
    "id": "arterials",
    "title": "Arterial Highways & Major Streets",
    "titleTooltip": "Designated rights-of-way shown on the Master Plan of Arterial Highways and Major Streets (not an exact copy).",
    "legendIcon": "line",
    "legendColor": "rgba(245, 147, 80, 0.6)",
    "visible": false,
    "meta": {
      "description": "NYC Department of City Planning Technical Review Division",
      "updated_at": "6 April 2018"
    },
    "layers": [
      {
        "style": {
          "id": "citymap-arterials-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "arterials",
          "paint": {
            "line-color": "rgba(245, 147, 80, 0.4)",
            "line-width": {
              "stops": [
                [
                  10,
                  1.5
                ],
                [
                  14,
                  10
                ]
              ]
            }
          },
          "layout": {
            "visibility": "visible"
          }
        }
      }
    ]
  },
  {
    "id": "citymap",
    "title": "Street Lines",
    "legendIcon": "",
    "legendColor": "",
    "visible": false,
    "meta": {
      "description": "NYC Department of City Planning Technical Review Division",
      "updated_at": "6 April 2018"
    },
    "layers": [
      {
        "style": {
          "id": "citymap-mapped-streets-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "citymap",
          "paint": {
            "line-color": "rgba(51, 51, 51, 1)",
            "line-width": {
              "stops": [
                [
                  10,
                  0.1
                ],
                [
                  13,
                  1
                ],
                [
                  15,
                  3
                ]
              ]
            }
          },
          "filter": [
            "all",
            [
              "==",
              "type",
              "Mapped Street"
            ]
          ]
        }
      },
      {
        "tooltipable": true,
        "tooltipTemplate": "{{type}}",
        "style": {
          "id": "citymap-streets-tooltip-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "citymap",
          "paint": {
            "line-opacity": 0.001,
            "line-width": {
              "stops": [
                [
                  10,
                  0.2
                ],
                [
                  13,
                  2
                ],
                [
                  15,
                  6
                ]
              ]
            }
          },
          "filter": [
            "any",
            [
              "==",
              "type",
              "Mapped Street"
            ],
            [
              "==",
              "type",
              "Street not mapped"
            ],
            [
              "==",
              "type",
              "Record Street"
            ]
          ]
        }
      },
      {
        "style": {
          "id": "citymap-record-streets-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "citymap",
          "filter": [
            "all",
            [
              "==",
              "type",
              "Record Street"
            ]
          ],
          "paint": {
            "line-color": "rgba(51, 51, 51, 1)",
            "line-width": {
              "stops": [
                [
                  10,
                  0.1
                ],
                [
                  13,
                  0.5
                ],
                [
                  15,
                  2
                ]
              ]
            },
            "line-dasharray": {
              "stops": [
                [
                  10,
                  [
                    6,
                    4
                  ]
                ],
                [
                  15,
                  [
                    3,
                    1
                  ]
                ]
              ]
            }
          }
        }
      },
      {
        "style": {
          "id": "citymap-street-treatments-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "citymap",
          "filter": [
            "all",
            [
              "==",
              "type",
              "street_treatment"
            ]
          ],
          "paint": {
            "line-color": "#545454",
            "line-width": {
              "stops": [
                [
                  10,
                  0.1
                ],
                [
                  13,
                  0.25
                ],
                [
                  15,
                  1
                ]
              ]
            }
          }
        }
      },
      {
        "style": {
          "id": "citymap-underpass-tunnel-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "citymap",
          "filter": [
            "all",
            [
              "==",
              "type",
              "Underpass or Tunnel"
            ]
          ],
          "paint": {
            "line-color": "rgba(150, 150, 150, 1)",
            "line-width": {
              "stops": [
                [
                  10,
                  0.1
                ],
                [
                  13,
                  0.25
                ],
                [
                  15,
                  1
                ]
              ]
            },
            "line-dasharray": {
              "stops": [
                [
                  10,
                  [
                    6,
                    4
                  ]
                ],
                [
                  15,
                  [
                    10,
                    6
                  ]
                ]
              ]
            }
          }
        }
      },
      {
        "style": {
          "id": "citymap-street-not-mapped-line",
          "type": "line",
          "source": "digital-citymap",
          "source-layer": "citymap",
          "filter": [
            "all",
            [
              "==",
              "type",
              "Street not mapped"
            ]
          ],
          "paint": {
            "line-color": "#AFAFAF",
            "line-width": {
              "stops": [
                [
                  10,
                  0.1
                ],
                [
                  13,
                  0.25
                ],
                [
                  15,
                  2
                ]
              ]
            },
            "line-dasharray": [
              0,
              2
            ]
          },
          "layout": {
            "line-cap": "round"
          }
        }
      }
    ],
    "legendConfig": {
      "label": "Street Lines",
      "items": [
        {
          "type": "line",
          "label": "Mapped Street",
          "style": {
            "fill": "none",
            "stroke": "#000"
          }
        },
        {
          "type": "line",
          "label": "Record Street",
          "style": {
            "fill": "none",
            "stroke": "#000",
            "stroke-width": "1",
            "stroke-dasharray": "3, 1.5"
          }
        },
        {
          "type": "line",
          "label": "Street Treatment",
          "style": {
            "fill": "none",
            "stroke": "#a1a1a1",
            "stroke-width": "0.5"
          }
        },
        {
          "type": "line",
          "label": "Unmapped Street",
          "style": {
            "fill": "none",
            "stroke": "#a1a1a1",
            "stroke-width": "0.5",
            "stroke-dasharray": "1"
          }
        }
      ]
    }
  },
  {
    "id": "commercial-overlays",
    "title": "Commercial Overlays",
    "titleTooltip": "A commercial overlay is a C1 or C2 district mapped within residential districts to serve local retail needs.",
    "legendIcon": "polygon-line",
    "legendColor": "rgba(220, 10, 10, 1)",
    "visible": false,
    "meta": {
      "description": "NYC GIS Zoning Features February 2018, Bytes of the Big Apple",
      "url": [
        "https://www1.nyc.gov/site/planning/data-maps/open-data.page"
      ],
      "updated_at": "5 March 2018"
    },
    "layers": [
      {
        "style": {
          "id": "co-fill",
          "type": "fill",
          "source": "zoning",
          "minzoom": 12,
          "source-layer": "commercial-overlays",
          "paint": {
            "fill-outline-color": "#cdcdcd",
            "fill-opacity": 0
          }
        },
        "highlightable": true,
        "clickable": true,
        "tooltipTemplate": "{{overlay}}"
      },
      {
        "style": {
          "id": "co",
          "type": "line",
          "source": "zoning",
          "source-layer": "commercial-overlays",
          "paint": {
            "line-width": {
              "stops": [
                [
                  12,
                  0.1
                ],
                [
                  15,
                  2
                ]
              ]
            },
            "line-opacity": 0.75,
            "line-color": "rgba(220, 10, 10, 1)"
          }
        }
      },
      {
        "before": "place_country_major",
        "style": {
          "id": "co_labels",
          "type": "symbol",
          "source": "zoning",
          "source-layer": "commercial-overlays",
          "paint": {
            "text-color": "rgba(200, 0, 0, 1)",
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 2,
            "text-halo-blur": 2,
            "text-opacity": 0.9
          },
          "layout": {
            "symbol-placement": "point",
            "text-field": "{overlay}"
          },
          "minzoom": 14
        }
      }
    ]
  },
  {
    "id": "special-purpose-districts",
    "title": "Special Purpose Districts",
    "titleTooltip": "The regulations for special purpose districts are designed to supplement and modify the underlying zoning in order to respond to distinctive neighborhoods with particular issues and goals",
    "legendIcon": "polygon-fill-dash",
    "legendColor": "rgba(94,102,51, 1)",
    "highlightable": false,
    "visible": false,
    "meta": {
      "description": "NYC GIS Zoning Features February 2018, Bytes of the Big Apple",
      "url": [
        "https://www1.nyc.gov/site/planning/data-maps/open-data.page"
      ],
      "updated_at": "5 March 2018"
    },
    "layers": [
      {
        "style": {
          "id": "zoning-sp-line",
          "type": "line",
          "source": "zoning",
          "source-layer": "special-purpose-districts",
          "paint": {
            "line-width": {
              "stops": [
                [
                  11,
                  1
                ],
                [
                  12,
                  3
                ]
              ]
            },
            "line-color": "rgba(94,102,51, 0.6)",
            "line-dasharray": [
              1,
              1
            ]
          }
        }
      },
      {
        "style": {
          "id": "zoning-sp-fill",
          "type": "fill",
          "source": "zoning",
          "source-layer": "special-purpose-districts",
          "paint": {
            "fill-color": "#5E6633",
            "fill-opacity": 0.2
          }
        }
      }
    ]
  },
  {
    "id": "tax-lots",
    "title": "Tax Lots",
    "titleTooltip": "A tax lot is a parcel of land identified with a unique borough, block and lot number for property tax purposes.",
    "legendIcon": "polygon-line",
    "legendColor": "rgba(130, 130, 130, 1)",
    "meta": {
      "description": "MapPLUTO\u2122 v17v1.1, Bytes of the Big Apple",
      "url": [
        "https://www1.nyc.gov/site/planning/data-maps/open-data.page"
      ],
      "updated_at": "5 March 2018"
    },
    "layers": [
      {
        "style": {
          "id": "pluto-fill",
          "type": "fill",
          "source": "pluto",
          "minzoom": 15,
          "source-layer": "pluto",
          "paint": {
            "fill-outline-color": "#cdcdcd",
            "fill-color": {
              "property": "landuse",
              "type": "categorical",
              "stops": [
                [
                  "01",
                  "#FEFFA8"
                ],
                [
                  "02",
                  "#FCB842"
                ],
                [
                  "03",
                  "#B16E00"
                ],
                [
                  "04",
                  "#ff8341"
                ],
                [
                  "05",
                  "#fc2929"
                ],
                [
                  "06",
                  "#E362FB"
                ],
                [
                  "07",
                  "#E0BEEB"
                ],
                [
                  "08",
                  "#44A3D5"
                ],
                [
                  "09",
                  "#78D271"
                ],
                [
                  "10",
                  "#BAB8B6"
                ],
                [
                  "11",
                  "#555555"
                ]
              ],
              "default": "#EEEEEE"
            },
            "fill-opacity": 0
          }
        },
        "highlightable": true,
        "clickable": true,
        "tooltipTemplate": "{{address}}"
      },
      {
        "style": {
          "id": "pluto-line",
          "type": "line",
          "source": "pluto",
          "minzoom": 15,
          "source-layer": "pluto",
          "paint": {
            "line-width": 0.5,
            "line-color": "rgba(130, 130, 130, 1)",
            "line-opacity": {
              "stops": [
                [
                  15,
                  0
                ],
                [
                  16,
                  1
                ]
              ]
            }
          }
        }
      },
      {
        "before": "place_country_major",
        "style": {
          "id": "pluto-labels",
          "type": "symbol",
          "source": "pluto",
          "source-layer": "pluto",
          "minzoom": 15,
          "layout": {
            "text-field": "{lot}",
            "text-font": [
              "Open Sans Regular",
              "Arial Unicode MS Regular"
            ],
            "text-size": 11
          },
          "paint": {
            "text-opacity": {
              "stops": [
                [
                  16.5,
                  0
                ],
                [
                  17.5,
                  1
                ]
              ]
            },
            "icon-color": "rgba(193, 193, 193, 1)",
            "text-color": "rgba(154, 154, 154, 1)",
            "text-halo-color": "rgba(152, 152, 152, 0)"
          }
        }
      },
      {
        "before": "place_country_major",
        "style": {
          "id": "block-labels",
          "type": "symbol",
          "source": "pluto",
          "source-layer": "block-centroids",
          "layout": {
            "text-field": "{block}",
            "text-font": [
              "Open Sans Regular",
              "Arial Unicode MS Regular"
            ],
            "text-size": {
              "stops": [
                [
                  14,
                  12
                ],
                [
                  16,
                  18
                ]
              ]
            }
          },
          "paint": {
            "text-halo-color": "rgba(255, 255, 255, 0.5)",
            "text-halo-width": 1,
            "text-color": "rgba(121, 121, 121, 1)",
            "text-halo-blur": 0,
            "text-opacity": {
              "stops": [
                [
                  14,
                  0
                ],
                [
                  15,
                  1
                ]
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "zoning-districts",
    "title": "Zoning Districts",
    "visible": false,
    "titleTooltip": "A zoning district is a residential, commercial or manufac\u00adturing area of the city within which zoning regulations govern land use and building bulk.",
    "meta": {
      "description": "NYC GIS Zoning Features March 2018, Bytes of the Big Apple",
      "url": [
        "https://www1.nyc.gov/site/planning/data-maps/open-data.page"
      ],
      "updated_at": "April 5th, 2018"
    },
    "layers": [
      {
        "style": {
          "id": "zd-fill",
          "type": "fill",
          "source": "zoning",
          "source-layer": "zoning-districts",
          "paint": {
            "fill-color": {
              "property": "primaryzone",
              "type": "categorical",
              "stops": [
                [
                  "BP",
                  "#808080"
                ],
                [
                  "C1",
                  "#ffa89c"
                ],
                [
                  "C2",
                  "#fd9a8f"
                ],
                [
                  "C3",
                  "#fa867c"
                ],
                [
                  "C4",
                  "#f76e67"
                ],
                [
                  "C5",
                  "#f2544e"
                ],
                [
                  "C6",
                  "#ee3a36"
                ],
                [
                  "C7",
                  "#ea2220"
                ],
                [
                  "C8",
                  "#e50000"
                ],
                [
                  "M1",
                  "#f3b3ff"
                ],
                [
                  "M2",
                  "#e187f3"
                ],
                [
                  "M3",
                  "#cf5ce6"
                ],
                [
                  "PA",
                  "#78D271"
                ],
                [
                  "R1",
                  "#fff8a6"
                ],
                [
                  "R2",
                  "#fff7a6"
                ],
                [
                  "R3",
                  "#fff797"
                ],
                [
                  "R4",
                  "#fff584"
                ],
                [
                  "R5",
                  "#fff36c"
                ],
                [
                  "R6",
                  "#fff153"
                ],
                [
                  "R7",
                  "#ffee39"
                ],
                [
                  "R8",
                  "#ffec22"
                ],
                [
                  "R9",
                  "#ffeb0e"
                ],
                [
                  "R10",
                  "#ffea00"
                ]
              ]
            },
            "fill-opacity": {
              "stops": [
                [
                  12,
                  0.5
                ],
                [
                  14,
                  0.3
                ]
              ]
            },
            "fill-antialias": true
          }
        }
      },
      {
        "before": "place_country_major",
        "style": {
          "id": "zd_labels",
          "type": "symbol",
          "source": "zoning",
          "source-layer": "zoning-districts",
          "layout": {
            "symbol-placement": "point",
            "text-field": "{zonedist}",
            "text-size": {
              "stops": [
                [
                  10,
                  8
                ],
                [
                  14,
                  16
                ]
              ]
            }
          },
          "paint": {
            "text-color": {
              "stops": [
                [
                  15,
                  "#626262"
                ],
                [
                  16,
                  "#444"
                ]
              ]
            },
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 2,
            "text-halo-blur": 2,
            "text-opacity": {
              "stops": [
                [
                  12,
                  0
                ],
                [
                  13,
                  1
                ]
              ]
            }
          }
        }
      }
    ]
  }
];
