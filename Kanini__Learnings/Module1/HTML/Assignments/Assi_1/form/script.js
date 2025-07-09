function Register(){
    const userName=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    localStorage.setItem('user-name',userName);
    localStorage.setItem('password',password);
}