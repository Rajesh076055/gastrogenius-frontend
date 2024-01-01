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

export {useStyles, style};