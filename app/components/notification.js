function notificationSuccess(props) {
    toastr.success(`${props} succesfully`);
}
function notificationError(props) {
    toastr.error(`Failed to ${props}`);
}
