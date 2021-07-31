import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon
import ClearIcon from '@material-ui/icons/Clear';

// Buttons
import IconButton from '@material-ui/core/IconButton';

const NewModal = (props) => {
    return (
        <AnimatePresence>
            <motion.div
                className={`newmodal-container ${props.containerClass || ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={`newmodal ${props.modelClass || ''}`}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.45 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                >
                    <div className={'newmodal-top'}>
                        <div className={'newmodal-top-title'}>
                            {props.title}
                        </div>

                        <div >
                            <IconButton onClick={props.closeModal} className={'closeicon'}>
                                <ClearIcon />
                            </IconButton>
                        </div>

                    </div>
                    <div className={`newmodal-content ${props.contentClassName || ''}`}>
                        {props.children || ''}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NewModal;
