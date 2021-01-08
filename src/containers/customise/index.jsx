import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useTranslation } from 'react-i18next';

import Slider from 'common/slider';

export default function FormDialog({ dialogOpen, toggleDialog }) {
    const { t } = useTranslation();
    return (
        <Dialog open={dialogOpen} onClose={toggleDialog} aria-labelledby="form-dialog-title">
            <DialogTitle align="center" id="form-dialog-title">{t('customise.title')}</DialogTitle>
            <DialogContent>
            <Slider title={t('customise.amount')} defaultValue={500000} maxValue={1000000}/>
            <Slider title={t('customise.tenure')} defaultValue={36} maxValue={1000}/>
            </DialogContent>
            <DialogActions>
            <Button onClick={toggleDialog} color="primary">
                {t('customise.buttonText')}
            </Button>
            </DialogActions>
        </Dialog>
    );
}
