AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 100,

    // Hooks
    onLogoutHook: function () {
        FlowRouter.go('App.login');
    },
    onSubmitHook: function () {
        FlowRouter.go('App.home');
    },
    // preSignUpHook: myPreSubmitFunc,
    postSignUpHook: function () {
        FlowRouter.go('App.home');
    },

    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        },
    },
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: "Login",
    required: true
});