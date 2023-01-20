const returnRandBase = () => {
  // Returns a random DNA base
  let dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

const mockUpStrand = () => {
  // Returns a random single stand of DNA containing 15 bases
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Test function 
// console.log(mockUpStrand()); // Should print random 15 letters


const pAequorFactory = (specimenNum, dna) => {
  //Create a factory function pAequorFactory() that returns an object that contains the properties specimenNum and dna that correspond to the parameters provided
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      //mutate() is responsible for randomly selecting a DNA in the objectś dna property and changing it to something else
      dnaBases = ['A', 'T', 'C', 'G'];
      let randomIndex = Math.floor(Math.random()*15);
      // console.log(randomIndex); // Test: should print an index of a DNA sequence that will mutate
      let dnaToMutate = this.dna[randomIndex];
      dnaBases.splice(dnaBases.indexOf(dnaToMutate), 1);
      // console.log(dnaBases); // Test: should print three possible DNA values that a DNA can mutate to
      this.dna[randomIndex] = dnaBases[Math.floor(Math.random()*3)];
      return this.dna;
    },
    compareDNA(anotherPAequor){
      // compareDNA() is responsible for comparing the current pAequor's .dna with the passed in pAequor's .dna and compute how many bases are identical and in the same locations.
      let sharedDNA = [];
      for (i = 0; i < this.dna.length; i++){
       if (this.dna[i] === anotherPAequor[i]) {
        sharedDNA.push(anotherPAequor[i]);
       }
      }
      let numOfSharedDNA = sharedDNA.length;
      // console.log(numOfSharedDNA); // Test: should print number of DNAs shared
      return `${this.specimenNum} and the specimen in question have ${numOfSharedDNA/15*100}% DNA in common`;
    },
    willLikelySurvive() {
      // willLikelySurvive() is responsible for returning true if a pAequor's DNA is made up of at least 60% 'C' or 'G'bases
      let numOfGoodGenes = this.dna.filter(x => x =='C' || x == 'G').length;
      // console.log(numOfGoodGenes); // Test: should print a number of C or G that a pAequor has
      if (numOfGoodGenes >= 9) {
        return true;
      } else {
        return false;
      }
    }
  };
}

// // Test function for above pAequorFactory function
// const pAequor1 = pAequorFactory(1, mockUpStrand()); 
// const pAequor2 = pAequorFactory(2, mockUpStrand()); 
// const pAequor3 = pAequorFactory(3, mockUpStrand()); 
// console.log(pAequor1); // Print specimenNum:1 and dna: [random 15 DNA bases]
// // console.log(pAequor1.mutate()); // Print new NDA sequence (only one random DNA changed)
// console.log(pAequor2); // Print specimenNum:2 and dna: [random 15 DNA bases]
// console.log(pAequor2.mutate());// Print new NDA sequence (only one random DNA changed)
// console.log(pAequor3); // Print specimenNum:3 and dna: [random 15 DNA bases]
// console.log(pAequor3.mutate());// Print new NDA sequence (only one random DNA changed)
// console.log(pAequor1.compareDNA(pAequor2.dna));// Print the % two DNA sequences share in common
// console.log(pAequor1.willLikelySurvive());

const create30Instances = () => {
  // This function is responsible for creating 30 instances of pAquor which will likely survive
  let likelySurvivors = [];
  let counter = 1;
  while (likelySurvivors.length < 30) {
    let tempPAquor = pAequorFactory(counter, mockUpStrand());
    if (tempPAquor.willLikelySurvive() === true) {
      likelySurvivors.push(tempPAquor)
      counter++;
    }
  }
  return likelySurvivors;
}

// Test function for create30Instances()
console.log(create30Instances());