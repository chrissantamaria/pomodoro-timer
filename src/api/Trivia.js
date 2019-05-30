import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Typography, Button } from '@material-ui/core'
import useStyles from '../timer/TimerPageStyles';
import { auth } from 'firebase';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    
  
    return {
      width: `50%`,
      height: `40%`,
      backgroundColor: 'white',
      textAlign: 'center',
      marginLeft: "25%",
      marginTop: "5%",
    };
  }
  


export default function Trivia() {

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(null);

    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        let randInd = Math.floor(Math.random() * questions.length);
        
        if (questions[randInd]){
            setQuestion(questions[randInd]);
        } else {
            setQuestion(questions[1]);
        }
        
       

    }

    const classes = useStyles()


    // get the questions
    useEffect(() => {
        axios
            .get("/break")
            .then(res => {
                let tempQuestions = res.data.map(quest => {
                    return (
                        <div style={modalStyle} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                          Q: {quest.question.replace(/&quot;/g, '"')}
                        </Typography>
                        <hr/>
                        <Typography 
                            variant="subtitle1" 
                            id="simple-modal-description" 
                        >
                          A: {quest.correct_answer}
                        </Typography>
                        
     
                      </div>
                    );
                });
                setQuestions(tempQuestions);
                let randIndex = Math.floor(Math.random() * tempQuestions.length);
                setQuestion(tempQuestions[randIndex]);
            })
            .catch(err => {
                console.log(`Couldn't get trivia from server: ${err}`);
            })
    }, []);


    return (
    <div>
    
      <Button onClick={handleOpen}>Get Trivia</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        {question}

      </Modal>
      </div>
    );
}