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

const styleModalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#eee',
  color:'#000',
  borderRadius:3,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'space-between',
  p: 3,
};
export {useStyles, style, style2, styleModalBox};