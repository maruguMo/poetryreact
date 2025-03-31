
function generatePrintableCharactersArray() {
    const printableChars = [];
    for (let i = 32; i <= 126; i++) {
      printableChars.push(String.fromCharCode(i));
    }
    return printableChars;
  }
  
  const charArray = generatePrintableCharactersArray();
  //console.log(charArray);
  
  function generatePassword(size){
    let pword='';
    for(let i=0; i<size;i++)
    {
      const randomIndex =Math.floor(Math.random()*charArray.length);
      //console.log(randomIndex)
      pword =pword + charArray[randomIndex].toString();
    }
    return pword
  }
  function generatePasswords(size, numPasswords){
      for (let i=0;i< numPasswords;i++){  
        console.log(generatePassword(size).toString(2));
      }
  }
  
  generatePasswords(20,15);