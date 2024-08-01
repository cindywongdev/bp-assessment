document.addEventListener('DOMContentLoaded', function () {
    const SUPABASE_URL = 'https://nvuoozyxvhwywetlmjqy.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dW9venl4dmh3eXdldGxtanF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0ODYxNjQsImV4cCI6MjAzODA2MjE2NH0.DKd5n4iSG_qgnu86DrOOxkJC9ODbgqIhEg34c6NBRQ4';

    // create supabase client
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase client created:', supabaseClient);
    const form = document.getElementById('newsletter-signup-form');

    // grab hamburger menu icon and hidden nav links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('header nav ul');

    // show nav links on click of hamburger menu
    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // submit form data to supabase postgreSQL database
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            phone: formData.get('phone'),
            zip: formData.get('zip'),
        };

        const { data: result, error } = await supabaseClient
            .from('form_submissions')
            .insert([data]);

        if (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        } else {
            // change submit button text to confirm submission
            const submitButton = form.querySelector('button');
            submitButton.textContent = "SUBMITTED!"
            // make yellow hover color last for duration of submitted text
            submitButton.classList.add('clicked')
            form.reset();

            setTimeout(() => {
                submitButton.textContent = "SIGN UP"
                // change button background back to default
                submitButton.classList.remove('clicked')

            }, 2000);
        }
    });
});