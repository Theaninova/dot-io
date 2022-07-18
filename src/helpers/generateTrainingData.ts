import type { ChordLibraryRecord } from '../data/chordLibrary';
import type { ChordStatistics } from '../models/trainingStatistics';
import type { WordTrainingValues } from 'src/models/wordTrainingValues';
import { useEffect, useRef, useState } from 'react';
import type { TrainingScenario } from '../models/trainingScenario'

const getRandomElementFromArray = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];

interface ChordGenerationParameters {
  stats: ChordStatistics[];
  recursionRate: number;
  numberOfTargetChords: number;
  lineLength: number;
  chordsToChooseFrom: ChordLibraryRecord;
  recursionIsEnabledGlobally: boolean;
  speedGoal: number;
  wordTestNumberValue?: WordTrainingValues;
  scenario?: TrainingScenario;
}

//const [internalWordCountState, setinternalWordCountState] = useState<number | null>(null);


/**
 * Generates a list of training chords, based off of the users existing stats, coming from the supplied `chords` parameter
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param parameters
 * @see {@link ChordGenerationParameters}
 */

//This checks if the page has been reloaded this will be used to refresh the session variable
 let pageAccessedByReload = ( 
  (window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType('navigation')
      .map((nav) => nav.type)
      .includes('reload')
);
//Method to remove session value and set refresh constant back to false
function removeSessionValueAndSettoFalse(){ 
  sessionStorage.removeItem("tempTestDeIncrement");
  console.log('Here I am removing in genTestData')

  pageAccessedByReload = false;
}

export const generateChords = (
  parameters: ChordGenerationParameters,
): string[] => {
  if((parameters.scenario == 'LEXICAL') && (parameters.wordTestNumberValue != undefined)){
    console.log('training scenario '+ parameters.scenario);
    console.log('Scenarios data '+ parameters.chordsToChooseFrom.adjectives )
    const wordTestValue = parseInt(parameters.wordTestNumberValue);
    pageAccessedByReload ? removeSessionValueAndSettoFalse() : ''; // Call this incase user refreshed the page mid test to reset the session Variable
     
    sessionStorage.getItem("tempTestDeIncrement") == undefined ? (sessionStorage.setItem("tempTestDeIncrement", JSON.stringify(wordTestValue))) : '';

    let tempDeIncrementValue = parseInt(sessionStorage.getItem("tempTestDeIncrement"));
    console.log(tempDeIncrementValue)
    const newString : string[] = [];
    const chordLibraryCharacters1 = Object.keys(parameters.chordsToChooseFrom);
    console.log('parameters array '+parameters);

    while (newString.join('').length < parameters.lineLength) {
      console.log('In while loop for lexical')
      if(0 == tempDeIncrementValue){
        console.log('In if statement  for lexical')

        const valToEvaluate = (newString.length-1) + wordTestValue;
        const loopValue = valToEvaluate - wordTestValue;
        if(loopValue !< 0){
        for(let i =0; i<=loopValue; i++){
          newString.pop();
        }
      }
        break;
      } else{
        console.log('In else  statement  for lexical')
       newString.push(getRandomElementFromArray(chordLibraryCharacters1));
       tempDeIncrementValue = tempDeIncrementValue - 1;
      }
      sessionStorage.setItem("tempTestDeIncrement", JSON.stringify(tempDeIncrementValue))
    }
    console.log('New string '+ newString);
    return newString;

  } else if ((parameters.scenario == 'LEXICAL-SENTENCES') && (parameters.wordTestNumberValue != undefined)){

    const wordTestValue = parseInt(parameters.wordTestNumberValue);
    pageAccessedByReload ? removeSessionValueAndSettoFalse() : ''; // Call this incase user refreshed the page mid test to reset the session Variable
     
    sessionStorage.getItem("tempTestDeIncrement") == undefined ? (sessionStorage.setItem("tempTestDeIncrement", JSON.stringify(wordTestValue))) : '';

    let tempDeIncrementValue = parseInt(sessionStorage.getItem("tempTestDeIncrement"));
    sessionStorage.removeItem('Refresh')


    const newString : string[] = [];
    const lexicalSentencesString = parameters.chordsToChooseFrom;
    //console.log(lexicalSentencesString[one]);
    //getRandomElementFromArray(content);
    const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);

    const content = lexicalSentencesString;
    console.log(content)
    console.log(content.one)
    const newConstent = content.one[0].split(" ");
    console.log(newConstent)

    console.log('Content'+lexicalSentencesString);
    console.log('Content'+content[2]);
    console.log('Content'+content[3]);
    console.log('Content'+content[4]);
    console.log('Content'+content[5]);
    console.log('Content'+content[6]);
    console.log('Content'+content[7]);

    
    while (newConstent.join('').length < parameters.lineLength) {
      if(0 == tempDeIncrementValue){
        const valToEvaluate = (newConstent.length-1) + wordTestValue;
        const loopValue = valToEvaluate - wordTestValue;
        if(loopValue !< 0){
        for(let i =0; i<=loopValue; i++){
          newConstent.pop();
        }
      }
        break;
      } else{
        //newConstent.push(content[wordTestValue - tempDeIncrementValue]);
       tempDeIncrementValue = tempDeIncrementValue - 1;
      }
      sessionStorage.setItem("tempTestDeIncrement", JSON.stringify(tempDeIncrementValue))
    }
    console.log
    return newConstent;
  } else if ((parameters.scenario == 'CUSTOMTIER') && (parameters.wordTestNumberValue == undefined)){

// * Uncomment the next two lines to use just the alphabet to test with
  // const IS_TESTING = true;
  // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];


  const chordToFeed = '';


  const allCharacters: string[] = [chordToFeed].filter((a) => !!a);


  const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);

  const wordTestValue = chordLibraryCharacters.length;
  pageAccessedByReload ? removeSessionValueAndSettoFalse() : ''; // Call this incase user refreshed the page mid test to reset the session Variable
   console.log('this is the state of the temp deincrement '+ sessionStorage.getItem("tempTestDeIncrement"))
   const checkVal = sessionStorage.getItem("tempTestDeIncrement")
   console.log(sessionStorage.getItem("tempTestDeIncrement") == undefined);
   if(sessionStorage.getItem("tempTestDeIncrement") == undefined ||isNaN(parseInt(sessionStorage.getItem("tempTestDeIncrement")))){
      //allCharacters = [];
      console.log('Did this fire?');
      console.log('Word test value in the set '+wordTestValue);
      console.log('These are allCharacters '+ chordLibraryCharacters);
      console.log('These are allCharacters '+ chordLibraryCharacters.length);

    sessionStorage.setItem("tempTestDeIncrement", JSON.stringify(wordTestValue));
    localStorage.setItem('chordsToChooseFrom', JSON.stringify(chordLibraryCharacters));
    }
   sessionStorage.setItem("CutomTierTestValue", JSON.stringify(wordTestValue))
   let tempDeIncrementValue = parseInt(sessionStorage.getItem("tempTestDeIncrement"));

  while (allCharacters.join('').length < parameters.lineLength) {
    console.log(allCharacters)
    console.log(allCharacters[0] == 'sample')
    console.log(allCharacters[1] == 'words')
    console.log(tempDeIncrementValue == 0);
    if(allCharacters[0] == 'sample' && allCharacters[1] == 'words' && tempDeIncrementValue == 0) {
      sessionStorage.removeItem("tempTestDeIncrement");
      console.log('Here i am removing in gen Test data 2');
    }

    if(0 == tempDeIncrementValue){
      console.log('Did I ever enter the delete loop?')
      const valToEvaluate = (allCharacters.length-1) + wordTestValue;
      const loopValue = valToEvaluate - wordTestValue;
      if(loopValue !< 0){
      for(let i =0; i<=loopValue; i++){
        allCharacters.pop();
      
      }
    }
      break;
    } else{
     allCharacters.push(chordLibraryCharacters[chordLibraryCharacters.length -  tempDeIncrementValue]);
     tempDeIncrementValue = tempDeIncrementValue - 1;
     sessionStorage.setItem("tempTestDeIncrement", JSON.stringify(tempDeIncrementValue))
    }
  }
  return allCharacters;

} else{
  // * Uncomment the next two lines to use just the alphabet to test with
  // const IS_TESTING = true;
  // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];

  const chordsSortedByTypingSpeed = parameters.stats.sort(
    (a, b) => b.averageSpeed - a.averageSpeed,
  );

  let chordToFeed = '';
  const numberOfChordsNotConquered = parameters.stats.filter(
    (s) => s.averageSpeed > parameters.speedGoal || s.averageSpeed === 0,
  ).length;
  if (numberOfChordsNotConquered > 0) {
    // Check for one remaining chord with zero speed
    // This happens on the first pass through the chord library
    const chordsWithZeroSpeed = parameters.stats.filter(
      (stat) => stat.averageSpeed === 0,
    );
    if (chordsWithZeroSpeed.length > 0)
      chordToFeed = getRandomElementFromArray(chordsWithZeroSpeed).displayTitle;
    // If there is no chord with zero speed, then we move onto the highest
    else chordToFeed = chordsSortedByTypingSpeed[0].displayTitle;
  }

  const allCharacters: string[] = [chordToFeed].filter((a) => !!a);
  console.log('CHord to feed '+ chordToFeed);
  console.log("All chahsahahshd "+allCharacters)

  const slowestTypedChordsAccountingForDepth = chordsSortedByTypingSpeed
    .slice(0, parameters.numberOfTargetChords)
    .map((s) => s.id);
  const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);

  while (allCharacters.join('').length < parameters.lineLength) {
    const shouldChooseBasedOnSpeed =
      parameters.recursionRate > Math.random() * 100;
    if (
      shouldChooseBasedOnSpeed &&
      parameters.numberOfTargetChords > 0 &&
      parameters.recursionIsEnabledGlobally
    )
      allCharacters.push(
        getRandomElementFromArray(slowestTypedChordsAccountingForDepth),
      );
    else allCharacters.push(getRandomElementFromArray(chordLibraryCharacters));
  }
  console.log("End "+allCharacters)
  return allCharacters;
}
};
