
var should = require('chai').should(),
    genome = require('../index');

describe('#says', function() {

  it("just calling hello_corinde should be Corinde", function() {
    genome.hello_corinde().should.equal("Corinde");
  });


  /*
  it("just calling says should be Corinde", function() {
    // genome.genome({ saying : "Wiers"}).says.should.equal("Wiers");
    genome().says().should.equal("Wiers");
  });
  */

});

