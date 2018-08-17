ember-mapbox-composer
==============================================================================

# Introduction

Mapping applications occupy their own niche within the broader web development ecosystem, and ambitious web maps demand an framework like EmberJS. 

MapboxGL, a powerful GL engine for beautiful web maps, and [ember-mapbox-gl](https://github.com/kturney/ember-mapbox-gl), a bindings addon for EmberJS and Mapbox, lay the groundwork for ambitious web mapping applications, but leave gaps in:

1. Layer composition
2. Complex source management
3. State and the Single Source of Truth principle

This addon fills those gaps by providing a few components and models:

 - `{{labs-layers}}` (component)
 - `layer-group` (model)
 - `layer` (model)
 - `source` (model)
 
These chiefly allow for "config-driven" map applications, where "adding a layer" to an interactive map with numerous layers is as simple as adding a new entry in a JSON definition. 

# Data Schema

This addon uses an opinionated data schema to allow for layer composition and source management. Generally, layer-groups use the following data scheme:

```
[
  // layer group
  "id": "aerials",
  // ...
  "layers": [
    {
      // layers
    }
  ]
]
```

Here's an example of a full JSON response for layer-groups:

<details> 
  <summary> Example data structure </summary>

```
[
  {
    "id": "aerials",
    "title": "Aerial Imagery",
    "titleTooltip": "Aerial Photos Raster Tiles provided by DoITT GIS",
    "meta": {
      "description": "NYC DoITT GIS Aerial Photography Tile Layers (TMS)",
      "url": [
        "https:\/\/maps.nyc.gov\/tiles\/"
      ],
      "updated_at": "n\/a"
    },
    "layerVisibilityType": "singleton",
    "layers": [
      {
        "displayName": "2016",
        "style": {
          "id": "aerials-2016",
          "layout": {
            "visibility": "visible"
          },
          "source": "aerials-2016",
          "type": "raster"
        }
      },
      {
        "displayName": "2014",
        "style": {
          "id": "aerials-2014",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-2014",
          "type": "raster"
        }
      },
      {
        "displayName": "2012",
        "style": {
          "id": "aerials-2012",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-2012",
          "type": "raster"
        }
      },
      {
        "displayName": "2010",
        "style": {
          "id": "aerials-2010",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-2010",
          "type": "raster"
        }
      },
      {
        "displayName": "2008",
        "style": {
          "id": "aerials-2008",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-2008",
          "type": "raster"
        }
      },
      {
        "displayName": "2006",
        "style": {
          "id": "aerials-2006",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-2006",
          "type": "raster"
        }
      },
      {
        "displayName": "2004",
        "style": {
          "id": "aerials-2004",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-2004",
          "type": "raster"
        }
      },
      {
        "displayName": "2001-2",
        "style": {
          "id": "aerials-20012",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-20012",
          "type": "raster"
        }
      },
      {
        "displayName": "1996",
        "style": {
          "id": "aerials-1996",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-1996",
          "type": "raster"
        }
      },
      {
        "displayName": "1951",
        "style": {
          "id": "aerials-1951",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-1951",
          "type": "raster"
        }
      },
      {
        "displayName": "1924",
        "style": {
          "id": "aerials-1924",
          "layout": {
            "visibility": "none"
          },
          "source": "aerials-1924",
          "type": "raster"
        }
      }
    ]
  },
  {
    "id": "amendments",
    "title": "City Map Alterations",
    "titleTooltip": "An index of adopted alterations to the City Map",
    "legendIcon": "polygon-stacked",
    "legendColor": "rgba(60, 133, 210, 0.4)",
    "visible": true,
    "highlightable": false,
    "meta": {
      "description": "NYC Department of City Planning Technical Review Division",
      "updated_at": "6 April 2018"
    },
    "layers": [
      {
        "style": {
          "id": "citymap-amendments-fill",
          "type": "fill",
          "source": "digital-citymap",
          "source-layer": "amendments",
          "paint": {
            "fill-color": "rgba(60, 133, 210, 0.2)"
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
            "fill": "rgba(60, 133, 210, 0.4)"
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
    "visible": true,
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
  }
 ]
  ```
  
</details>

Installation
------------------------------------------------------------------------------

```
ember install ember-mapbox-composer
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-mapbox-composer`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
