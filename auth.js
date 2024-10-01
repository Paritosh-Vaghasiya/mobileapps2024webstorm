const {createClient} = supabase;

const supabaseUrl = "https://egzhuriimugvkjiauphl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnemh1cmlpbXVndmtqaWF1cGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzEzNjcsImV4cCI6MjAzOTY0NzM2N30.29e4s0hYCEB3e4m0GDB2WgSpEDbiJSSC4FOg5aU8ZOk";

supabase = createClient(supabaseUrl, supabaseKey)

const loginBtn = document.getElementById("loginBtn");
loginBtn?.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const{error, session} = await supabase.auth.signInWithPassword({email, password});

    if(error){
        document.getElementById("error-msg").textContent = error.message;
    } else {
        window.location.href = 'display.html';
    }
});

//Signup
const signupBtn = document.getElementById("signupBtn");
signupBtn?.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const city = document.getElementById("city").value;

    const {error, user} = await supabase.auth.signUp({email, password});

    if(user){
        await supabase.from('Table_1').insert([{
            firstName: firstName, lastName: lastName, city: city, email: email, id: user.id
        }]);
        window.location.href = 'index.html';
    } else {
        document.getElementById("error-msg").textContent = error.message;
    }
})