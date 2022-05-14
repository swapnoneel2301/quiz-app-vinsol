import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
import React ,{useEffect, useState,useContext}from 'react';
import DetailsInput from './DetailsInput';
import Quiz from './Quiz';
import Result from './Result';

const QuizSectionContext = React.createContext();

export default function QuizSection(){
    const [quizStatrted,setQuizStarted] = useState(false);
    const [detailsGiven,setDetailsGiven] = useState(false);
    const [noOfQuestions,setNoOfQuestions] = useState(20);
    const [rangeOfNumbers,setRangeOfNumbers] = useState(10);
    const [operators,setOperators] = useState({plus:true,minus:true,multiply:true,divide:true});
    const [questions,setQuestions] = useState([]);
    const [givenAnswers,setGivenAnswers] = useState([]);
    const [totalMarks,setTotalMarks] = useState(0);
   

    const resetDetails = ()=>{
        setQuizStarted(false);
        setDetailsGiven(false);
        setNoOfQuestions(20);
        setRangeOfNumbers(10);
        setOperators({plus:true,minus:true,multiply:true,divide:true});
        setQuestions([]);
        setGivenAnswers([]);
    }

    const createQuestionsAndAnswers = ()=>{
       const choosenOperators = [];
       // set the choosen operators.
       if(operators.plus) choosenOperators.push('+');
       if(operators.minus) choosenOperators.push('-');
       if(operators.multiply) choosenOperators.push('*');
       if(operators.divide) choosenOperators.push('/');
    //    console.log(choosenOperators);
       for(let i=1;i<=noOfQuestions;i++){
           let firstNo = Math.floor(Math.random()*rangeOfNumbers);
           let secondNo = Math.floor(Math.random()*rangeOfNumbers);
           let operatorNo = Math.floor(Math.random()*choosenOperators.length);
           if(firstNo===0) firstNo=1;
           if(secondNo===0) secondNo=1;
           setQuestions(prevQuestion=>{
               return [...prevQuestion,{firstNo:Math.max(firstNo,secondNo),secondNo:Math.min(firstNo,secondNo),operator:choosenOperators[operatorNo]}];
           });
       }
    }


    const allStatesAndFunctions = {
        quizStatrted,setQuizStarted,
        detailsGiven,setDetailsGiven,
        noOfQuestions,setNoOfQuestions,
        rangeOfNumbers,setRangeOfNumbers,
        operators,setOperators,
        questions,setQuestions,
        givenAnswers,setGivenAnswers,
        totalMarks,setTotalMarks,
        resetDetails
    };

    // useEffect(()=>{
    // //   if(questions.length===noOfQuestions)
    //    console.log(questions);
    // },[questions]);

    useEffect(()=>{
       console.log(givenAnswers);
    },[givenAnswers]);

    useEffect(()=>{
      if(detailsGiven)
       createQuestionsAndAnswers();
    },[detailsGiven]);

    // UI part

    if(!quizStatrted){
        return <div className='mt-5'>
            <button className='btn btn-primary'
                    onClick={()=>setQuizStarted(true)}>Start Quiz</button>
        </div>
    }
    if(!detailsGiven){
        return <QuizSectionContext.Provider value={allStatesAndFunctions}>
                <DetailsInput />
        </QuizSectionContext.Provider>
    }
    if(givenAnswers.length!==Number(noOfQuestions))
        return <QuizSectionContext.Provider value={allStatesAndFunctions}>
                <Quiz />
        </QuizSectionContext.Provider>

     return <QuizSectionContext.Provider value={allStatesAndFunctions}>
         <Result />
     </QuizSectionContext.Provider>

}

const useGlobalContext = ()=>{
    return useContext(QuizSectionContext);
}

export {QuizSectionContext,useGlobalContext};