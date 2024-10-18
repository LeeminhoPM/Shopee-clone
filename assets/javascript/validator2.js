export default Validator
function Validator(formSelector) {
    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var _this = this;
    var formRules = {};

    // Nếu có lỗi thì return lại error message
    // Nếu không thì return undefined
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return value.toLowerCase().match(regex) ? undefined : 'Trường này phải là Email'; 
        },
        min: function(min) {
            return function(value) {
                return parseInt(value) >= min ? undefined : `Vui lòng nhập giá trị trên hoặc bằng ${min} VNĐ`;
            }
        }
    };

    // Lấy ra formElement trong DOM theo formSelector
    var formElement = document.querySelector(formSelector);

    // Chỉ xử lý khi có tồn tại formElement
    if(formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        // Lấy ra tất cả input bên trong nodeList inputs
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');

            for (var rule of rules) {
                var isRuleHasValue = rule.includes(':');
                var ruleInfo;

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện để validate (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
    }

    // Hàm thực hiện validate
    function handleValidate(ev) {
        var rules = formRules[ev.target.name];
        var errorMessage;

        for (var rule of rules) {
            errorMessage = rule(ev.target.value);
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            var formGroup = getParent(ev.target, '.form-group');
            
            if (formGroup) {
                formGroup.classList.add('invalid');

                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = errorMessage;
                }
            }
        }

        return !errorMessage;
    }

    // Hàm clear message lỗi
    function handleClearError(ev) {
        var formGroup = getParent(ev.target, '.form-group');

        if(formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');

            var formMessage = formGroup.querySelector('.form-message');
            if (formMessage) {
                formMessage.innerText = '';
            }
        }
    }

    // Xử lý hành vi submit form
    formElement.onsubmit = function(ev) {
        ev.preventDefault();

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;
        for (var input of inputs) {
            if(!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        // Khi không có lỗi thì submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                var formValues = Array.from(enableInputs).reduce(function(values, input) {
                    switch(input.type) {
                         // Trả về giá trị trong input[type="radio"]
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        // Trả về giá trị trong input[type="checkbox"]
                        case 'checkbox':
                            if(!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if(!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        // Trả về giá trị trong input[type="file"]
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        // Trả về giá trị trong input khác
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                }, {});

                _this.onSubmit(formValues);
            } else {
                formElement.submit();
            }
        } 
    }
}