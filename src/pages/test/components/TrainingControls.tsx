import React, { ReactElement, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';



// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 2;

function TrainingControls(): ReactElement {
  const stats = useStoreState(
    (state  : any) => state.trainingStatistics,
  ).statistics.sort((a  : any, b  : any) => b.averageSpeed - a.averageSpeed);

  return (
    
    <React.Fragment>
    <AggregateRow data = {stats}/>
    </React.Fragment>
  );
}


const AggregateStatRow = styled.div.attrs({
  className: `text-gray-300 flex flex-row w-full text-white items-center max-w-xs`,
})``;



const AggregateRow = ({ data } : { data: any }) => {
  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  const trainingSetting = useStoreState((store : any) => store.trainingStatistics);
  const currentTrainingSetting = useStoreState((store : any) => store.trainingSettings);
  const setIsDisplaying = useStoreActions((store) => store.setIsDisplayingTestComplete,);
  const wordTestNumber = useStoreState((store) => store.wordTestNumber,);
  const currentTrainingScenario = useStoreState((store) => store.currentTrainingScenario,);

  let sumErrors = 0;
  let sumOccurrences = 0;
  data.forEach((d : any) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
  });



  const [popUpDisplayValue, setPopUpDisplayValue] = useState(false);
  const setVariable = wordTestNumber == undefined ? 26 : wordTestNumber;
  const [count, setCount] = useState(setVariable);

  function beginTestBasedOnTrainingSelection (tierValue : string, val : number){
    sessionStorage.removeItem("tempTestDeIncrement");
    sessionStorage.removeItem('Refresh');
    sessionStorage.setItem("CustomNonRefresh", JSON.stringify(1))
    if(val != 0){
    const payload = []
    payload.push(tierValue);
    payload.push(""+val+"");
    setCount(val);
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload); 

    } else{
    const payload = []
    payload.push(tierValue);
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload); 
    
    }
  }
  const [tempCounter, setTempCounter] = useState(-100);

useEffect(() => {
  console.log(currentTrainingSetting);
  console.log(trainingSetting)
  const temp = parseInt(sessionStorage.getItem("tempTestDeIncrement"))
  console.log('State of Test Deincrement in Training controls '+ parseInt(sessionStorage.getItem("tempTestDeIncrement")));
  if(tempCounter == -100){
    setTempCounter(temp);
    sessionStorage.getItem("CutomTierTestValue")
    console.log('Did I remove in training controls?')
  }
  console.log('THis is trhe temp counter '+ tempCounter)
    console.log(trainingSetting)

  // run something every time name changes
  if(currentTrainingScenario == 'CUSTOMTIER'){
    console.log('I am being fired in the if statement')
    console.log(temp)
    if((sumOccurrences>=parseInt(sessionStorage.getItem("CutomTierTestValue")))){
      setIsDisplaying(true); //Set the testcomplete page variable to true which fires the completed page
    setPopUpDisplayValue(true);
    setTempCounter(-100);
    //Method will send the test values to local storage
    }
  }
  else if((sumOccurrences>=parseInt(count)) && wordTestNumber !=undefined){
    console.log('I am being fired in the else statement');
    console.log('This is the test number '+ wordTestNumber)
    setIsDisplaying(true); //Set the testcomplete page variable to true which fires the completed page
    setPopUpDisplayValue(true);
    //Method will send the test values to local storage
  }
  
}, [sumOccurrences, setIsDisplaying]); // <-- dependency array

  return (
      <React.Fragment>
        
    </React.Fragment>
  );
};

const TrainingStatsColumnContainer = styled.div.attrs({
  className: 'flex flex-col text-center align-center w-full  ml-auto mr-auto relative bg-[#181818]' ,
})``;

const WordRowContainer = styled.div `
float-left
  max-width: 100%;
  max-height: 100%;
 `;

const RowStatItem = styled.button.attrs({
  className: `
  hover:color-[#1e90ff]
  whitespace-nowrap 
  text-sm w-1/4 
  font-semibold`,
})``;

const RowStatItemName = styled.button.attrs({
  className: `
  float-left
  whitespace-nowrap 
  text-sm w-1/4 
  font-semibold`,
})``;


export default TrainingControls;
