node-genome
===========

notion of a biologically inspired genome driven by a gene regulatory network

Available at https://github.com/scottstensland/node-genome

## Installation

  npm install node-genome -g

## Usage

var genome = require("node-genome"),
	hello_corinde = genome.hello_corinde;

console.log("here is genome in action : ", hello_corinde());


## Tests

  npm test


## Contributing



## Release History

* 0.1.0 Initial release
* 0.1.7 settled on entry point structure


## Input Data Format - genome consists of nodes and edges :

// library expects JSOM data for input of network graph of nodes / edges

````
{"nodes": {
        "nodeid": nodedata, 
        "nodeid": nodedata, ...
    },
 "edges": [
        {"source": "sourceid", "target": "targetid"},
        {"source": "sourceid", "target": "targetid"}, ...
    ]
}
````



