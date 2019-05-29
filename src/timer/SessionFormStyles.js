import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formInputs: {
    width: "70%"
  },
  input: {
    margin: theme.spacing(1)
  },
  formControl: {
    minWidth: 120
  },
  textField: {
    minWidth: 300
  },
  button: {
    maxWidth: 90
  }
}));

export default useStyles;
