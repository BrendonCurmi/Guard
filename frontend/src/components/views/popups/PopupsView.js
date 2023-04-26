import React from "react";
import FocusedView from "./FocusedView";
import ConfirmView from "./ConfirmView";

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
 * @param confirmVals the ConfirmView values.
 * @returns {JSX.Element}
 * @constructor
 */
const PopupsView = ({
                    className, isEditing, confirming, focused,
                    onCancelFocused, onSubmitFocused, onConfirmConfirm, onCancelConfirm,
                    dataType, getCreds, confirmVals
                }) => {
    const focusedView =
        <div className={className}>
            <FocusedView onClick={onCancelFocused}
                         focus={focused}
                         submitItemRequest={onSubmitFocused}
                         getCreds={getCreds}
                         dataType={dataType}
                         fields={dataType.fields}/>
        </div>;

    const { title, msg } = confirmVals;
    const confirmView =
        <ConfirmView className={className}
                     onCancel={onCancelConfirm}
                     onConfirm={onConfirmConfirm}>
            <h2>{title}</h2>
            <h4>{msg}</h4>
        </ConfirmView>;

    return (
        <>
            {isEditing && focusedView}
            {confirming !== null && confirmView}
        </>
    );
};

export default PopupsView;
