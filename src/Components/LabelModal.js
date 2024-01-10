import React,{useState} from 'react';
import { Modal, Box, Typography, InputLabel, Select, FormControl, MenuItem, Button } from '@mui/material';
import { styleModalBox, useStyles, style } from '../styles/Style';
import "../styles/Session.css"
const LabelModal = ({isOpen, onClose, onConfirm, onRemove}) => {

    
    const polypsType = ["Adenomatous", "Hyperplastic"];
    const [type, setType] = useState("");
    const classes = useStyles();

    const handleChange=(event)=> {
        setType(event.target.value);
    }

    const handleClose =()=> {
        
        if (type.length === 0) {
            alert("You must choose a label for the bounding box or remove it.")
            return;
        }

        onClose(type);
        setType("");
        
    }

    return (
        <div>
            <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalBox}>
                    <Typography sx={{textAlign:'center',mb:3}} id="modal-modal-title" variant="h6" component="h2">
                    Select a Label
                    </Typography>
                    <FormControl className={`${classes.inputField}`}>
                        <InputLabel id="demo-simple-select-label">Polyps Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Diagnosis Type"
                            onChange={handleChange}
                        >
                            <MenuItem value={polypsType[0]}>Adenomatous</MenuItem>
                                <MenuItem value={polypsType[1]}>Hyperplastic</MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={[style.root,{marginTop:3}]} className={`${classes.inputField}`} disabled={type.length === 0?true:false} 
                    variant="contained" onClick={()=>onConfirm(type)}>Confirm</Button>
                    <Button sx={[style.remove,{marginTop:1}]} className={`${classes.inputField}`} 
                    variant="contained" onClick={onRemove}>Remove</Button>
                </Box>
            </Modal>
                
        </div>
    );
};



export default LabelModal;
