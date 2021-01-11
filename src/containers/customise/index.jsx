import { Fragment, useContext } from 'react';

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

import GlobalContext from 'contexts/globalContext';

export default function FormDialog() {
    const { t } = useTranslation();

    const { dialogOpen, toggleDialog, amount, setAmount, tenure, setTenure, emi } = useContext(GlobalContext);

    const [confirmPageOpen, toggleConfirm] = useToggle();

    return (
        <Fragment>
            <Dialog open={dialogOpen} onClose={toggleDialog} aria-labelledby="form-dialog-title"
                disableBackdropClick={confirmPageOpen} disableEscapeKeyDown={confirmPageOpen}
            >
                <DialogTitle align="center" id="form-dialog-title">{confirmPageOpen ? t('confirmation.title') : t('customise.title')}</DialogTitle>
                {confirmPageOpen ? <ConfirmationDialog 
                    toggleConfirm={toggleConfirm}
                    interest={'14%'}
                /> : 
                <Fragment><DialogContent>
                    <Slider isCurrency={true} title={t('customise.amount')} maxValue={'1000000'} value={amount} setValue={setAmount}/>
                    <Slider title={t('customise.tenure')} maxValue={1000} stepValue={6} value={tenure} setValue={setTenure}/>
                    <Typography id="input-slider" align="center" gutterBottom>{t('customise.emi')}</Typography>
                    <Typography variant="h4" align="center">
                        {emi}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleConfirm} color="primary">
                        {t('customise.buttonText')}
                    </Button>
                </DialogActions></Fragment>
            }
            </Dialog>
        </Fragment>
    );
}
