import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import firebase from "../firebase/firebase";

import useStyles from "./SessionFormStyles";

export default function Timer(props) {
  const classes = useStyles();

  const [sessionType, setSessionType] = useState("Work");
  const [description, setDescription] = useState("");

  const submit = () => {
    const data = { sessionType, description };
    const sessionsRef = firebase.database().ref("sessions");
    sessionsRef.push(data);

    if (sessionType == "Work") {
      setSessionType("Break");
    } 
    else if (sessionType == "Break") {
      setSessionType("Work");
    } 
    setDescription("");
  };

  // Handling Select label width
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    props.changeParentSession(sessionType);
  }, [sessionType]);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        className={classes.formInputs}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        <FormControl
          variant="outlined"
          className={`${classes.input} ${classes.formControl}`}
        >
          <InputLabel ref={inputLabel} htmlFor="session-type-simple">
            Type
          </InputLabel>
          <Select
            value={sessionType}
            onChange={e => setSessionType(e.target.value)}
            input={
              <OutlinedInput
                labelWidth={labelWidth}
                name="age"
                id="session-type-simple"
              />
            }
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Break">Break</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          className={`${classes.input} ${classes.textField}`}
          value={description}
          onChange={e => setDescription(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows="5"
        />
        <Box display="flex" flexDirection="row-reverse">
          <Button
            variant="contained"
            color="primary"
            className={`${classes.input} ${classes.button}`}
            onClick={submit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
