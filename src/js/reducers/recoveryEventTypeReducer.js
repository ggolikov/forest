import { CHANGE_RECOVERY_EVENT_TYPE } from '../constants';

const recoveryEventTypeReducer = (recoveryEventType = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_RECOVERY_EVENT_TYPE:
            recoveryEventType = payload.recoveryEventType;
            break;
        default:
    }

    return recoveryEventType;
}

export default recoveryEventTypeReducer;
