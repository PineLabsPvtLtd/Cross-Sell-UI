import { useState, Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import Slider from 'common/slider';
import ConfirmationDialog from 'containers/confirmation';

import useToggle from 'hooks/useToggle';

export default function FormDialog({ dialogOpen, toggleDialog }) {
    const { t } = useTranslation();

    const [confirmDialogOpen, toggleConfirmDialog] = useToggle();

    const [amount, setAmount] = useState(500000);
    const [tenure, setTenure] = useState(36);

    const emi = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount/tenure);

    return (
        <Fragment>
            <Dialog open={dialogOpen} onClose={toggleDialog} aria-labelledby="form-dialog-title">
                <DialogTitle align="center" id="form-dialog-title">{t('customise.title')}</DialogTitle>
                <DialogContent>
                    <Slider isCurrency={true} title={t('customise.amount')} maxValue={1000000} value={amount} setValue={setAmount}/>
                    <Slider title={t('customise.tenure')} maxValue={1000} stepValue={6} value={tenure} setValue={setTenure}/>
                    <Typography id="input-slider" align="center" gutterBottom>{t('customise.emi')}</Typography>
                    <Typography variant="h4" align="center">
                        {emi}
                    </Typography>
                </DialogContent>
                <DialogActions>
                <Button onClick={toggleConfirmDialog} color="primary">
                    {t('customise.buttonText')}
                </Button>
                </DialogActions>
            </Dialog>
            <ConfirmationDialog 
                dialogOpen={confirmDialogOpen} 
                toggleDialog={toggleConfirmDialog} 
                amount={amount} 
                tenure={tenure}
                emi={emi}    
                interest={'14%'}
            />
        </Fragment>
    );
}
