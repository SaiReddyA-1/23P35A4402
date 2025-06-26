const countries = ['USA', 'India', 'Germany', 'Brazil', 'UK', 'Canada', 'Australia', 'France', 'Japan', 'South Africa'];

function getCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

module.exports = getCountry; 