import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  timer: {
    paddingBottom: 30
  },
  timerRow: {
    paddingBottom: 30
  },
  time: {
    fontSize: 120
  },
  button: {
    margin: "0 10px"
  },
  upsideDown: {
    transform: "rotate(180deg)"
  }
}));

export default useStyles;
