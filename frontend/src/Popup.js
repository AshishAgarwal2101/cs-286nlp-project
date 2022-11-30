import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Popup = (props) => {
    let essayScoreColumns = ['cohesion', 'syntax', 'vocabulary', 'phraseology', 'grammar', 'conventions'];
    let scores = ["2.5", "2.5", "3.5", "5.0", "1.0", "4.5"];
    let model = props.model;
    let resultType = props.resultType;
    let result = props.result;
    let modelIndex = props.modelIndex;

    const constructResult = () => {
        let title = <div className="popup-title">Model {model}</div>;
        if(typeof result === "string" || resultType === "load"){
            return(
                <>
                    {title}
                    {result}
                </>
            )
        }
        else if (resultType === "test") {
            return(
                <>
                    {title}
                    MCRMSE Score: {result.mcrmse_score}
                    <div style={{marginTop: "20px"}}>Individual MCRMSE Loss Scores</div>
                    <table>
                        <tbody>
                            <tr>{essayScoreColumns.map((column) => <th>{column}</th>)}</tr>
                            <tr>{result.scores.map((score) => <td>{score}</td>)}</tr>
                        </tbody>
                    </table>
                </>
            )
        }
        else if(resultType === "evaluate"){
            return(
                <>
                    {title}
                    <div>Proficieny Scores</div>
                    <table>
                        <tbody>
                            <tr>{essayScoreColumns.map((column) => <th>{column}</th>)}</tr>
                            <tr>{result.scores.map((score) => <td>{score}</td>)}</tr>
                        </tbody>
                    </table>
                </>
            )
        }
        else {
            return(
                <>{title}</>
            )
        }
    };

    return(
        <Dialog
            fullWidth={false}
            maxWidth="lg"
            open={props.isOpen}
            onClose={props.handleClose}
        >
            <>
                <div className="popup-content">
                    {constructResult()}
                </div>
                <DialogActions>
                    <Button onClick={(e) => props.handleClose(e, modelIndex, model)}>Close</Button>
                </DialogActions>
            </>
        </Dialog>
    )
};

export default Popup;