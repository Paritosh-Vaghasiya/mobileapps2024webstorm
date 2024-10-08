const profileDataDiv = document.getElementById('profileData');

let session = null;

async function getSession(){
    session = await supabase.auth.getSession();
    return session;
}

//Call the async function
getSession().then(session => {
    console.log(session);
}).catch(error => {
    console.log('Error getting session: ', error);
});

async function getUserProfile(session) {
    const {data: userProfile, error} = await supabase.from("Table_2").select('*').eq('id', session.user.id).single();

    if (error){
        document.getElementById("error-msg").textContent = error.message;
        console.log('Error getting user profile: ', error);
        return null;
    }

    return userProfile;
}

async function fetchProfiles() {
    const sessions = await supabase.auth.getSession();
    const userProfile = await getUserProfile(session);
    if (userProfile) {
        console.log('User Profile',userProfile);
        profileDataDiv.innerHTML = '<p><strong>First Name:</strong> ${userProfile.firstName}</p>'+
        '<p><strong>Last Name:</strong> ${userProfile.lastName}</p>'+
        '<p><strong>City:</strong> ${userProfile.city}</p>'+
        '<p><strong>Email:</strong> ${userProfile.email}</p>';
    }
}

fetchProfiles().catch((error) => {
    console.log('Error', error);
})