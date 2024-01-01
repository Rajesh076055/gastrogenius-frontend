import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    inputField: {
      width: '80%',
      height:'8%'
    },
  }));
  
const style = {
    root: {
      backgroundColor: "#103557",
      ':hover': {
        backgroundColor: "#103552",
        boxShadow: "default"
      },
      boxShadow: 'none',
    }
}

const style2 = {
  root: {
    backgroundColor: "#3b94e5",
    ':hover': {
      backgroundColor: "#3b94e1;",
      boxShadow: "default"
    },
    boxShadow: 'none',
  }
}

export {useStyles, style, style2};