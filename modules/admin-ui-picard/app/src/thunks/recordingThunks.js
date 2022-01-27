import axios from "axios";
import {loadRecordingsFailure, loadRecordingsInProgress, loadRecordingsSuccess} from "../actions/recordingActions";
import {getURLParams} from "../utils/resourceUtils";
import {addNotification} from "./notificationThunks";
import {logger} from "../utils/logger";

// fetch recordings from server
export const fetchRecordings = flag => async (dispatch, getState) => {
    try {
        dispatch(loadRecordingsInProgress());

        let data;

        if (flag === "inputs") {
            data = await axios.get('admin-ng/capture-agents/agents.json?inputs=true');
        } else {
            const state = getState();
            let params = getURLParams(state);

            // /agents.json?filter={filter}&limit=100&offset=0&inputs=false&sort={sort}
            data = await axios.get('admin-ng/capture-agents/agents.json', { params: params });
        }

        const recordings = await data.data;
        dispatch(loadRecordingsSuccess(recordings));

    } catch (e) {
        dispatch(loadRecordingsFailure());
        logger.error(e);
    }
};

// delete location with provided id
export const deleteRecording = id => async dispatch => {
    // API call for deleting a location
    axios.delete(`/admin-ng/capture-agents/${id}`).then(res => {
        logger.info(res);
        // add success notification
        dispatch(addNotification('success', 'LOCATION_DELETED'));
    }).catch(res => {
        logger.error(res);
        // add error notification depending on status code
        if (res.status === 401) {
            dispatch(addNotification('error', 'LOCATION_NOT_DELETED_NOT_AUTHORIZED'));
        } else {
            dispatch(addNotification('error', 'LOCATION_NOT_DELETED'));
        }
    });
};