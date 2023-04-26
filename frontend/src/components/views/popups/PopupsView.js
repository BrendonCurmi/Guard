import React from "react";
import FocusedView from "./FocusedView";
import Confirm from "../../confirm/Confirm";

/**
 * Popups view for Focused View and Confirm View.
 * @param className the classname of the wrappers.
 * @param isEditing the editing state.
 * @param confirming the confirming state.
 * @param focused the focused state.
 * @param onCancelFocused handler for cancelling FocusedView.
 * @param onSubmitFocused handler for submitting FocusedView.
 * @param onConfirmConfirm handler for confirming ConfirmView.
 * @param onCancelConfirm handler for cancelling ConfirmView.
 * @param dataType the datatype.
 * @param getCreds the function to retrieve credentials.
 * @param focusedIcon the icon for FocusedView.
 * @param confirmVals the ConfirmView values.
 * @returns {JSX.Element}
 * @constructor
 */
const Popups = ({
                    className, isEditing, confirming, focused,
                    onCancelFocused, onSubmitFocused, onConfirmConfirm, onCancelConfirm,
                    dataType, getCreds, focusedIcon, confirmVals
                }) => {
    const focusedView =
        <div className={className}>
            <FocusedView onClick={onCancelFocused}
                         focus={focused}
                         submitItemRequest={onSubmitFocused}
                         getCreds={getCreds}
                         dataType={dataType}
                         fields={dataType.fields}
                         icon={focusedIcon}/>
        </div>;

    const { title, msg } = confirmVals;
    const confirmView =
        <Confirm className={className}
                 onCancel={onCancelConfirm}
                 onConfirm={onConfirmConfirm}>
            <h2>{title}</h2>
            <h4>{msg}</h4>
        </Confirm>;

    return (
        <>
            {isEditing && focusedView}
            {confirming !== null && confirmView}
        </>
    );
};

export default Popups;
