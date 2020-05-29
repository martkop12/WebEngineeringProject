auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user);
        appOptions();
    } else {
      setupUI();
    }
  });

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const name = signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // create on database

    createNewUser(name,email,password)
    .then((response) =>{
        console.log(response);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    
})

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', (e)=>{
    e.preventDefault();
    logoutUser().then(()=>{
        console.log('user Sign Out');
    })

})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = loginForm['login-email'].value;
    let password = loginForm['login-password'].value;

    loginUser(email,password)
    .then(()=>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})


