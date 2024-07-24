function State(nameInput, populationInput, gdpInput) {
  let name = nameInput;
  let population = populationInput;
  let gdp = gdpInput;
  let gdpOverPopulation = gdpInput; // * Math.pow(10, 3);
  gdpOverPopulation /= populationInput;
  // let gpdOverPopulationUsableNumber = gdpInput * Math.pow(10, 5);
  // gpdOverPopulationUsableNumber /= populationInput;
  this.getName = function () {
    return name;
  };
  this.getPopulation = function () {
    return population;
  };
  this.getGDP = function () {
    return gdp;
  };
  this.getGdpOverPopulation = function () {
    return gdpOverPopulation;
  };
}

module.exports = State;
