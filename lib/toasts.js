const { toast } = require('react-toastify');

const notifySuccess = (message) => {
    console.log('hello')
    toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        draggable: true,
    });

};

const notifyError = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
});

exports.notifySuccess = notifySuccess
exports.notifyError = notifyError