# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, first name, last name, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying new albums and public playlists.
      * So that I can easily log out to keep my information secure.

## Recipes

### Viewing Recipes

* No matter the log in status, I want to be able to view recipes.
    * When I am on the `/recipes` page:
        * I can view a list of all recipes.
            * So I can find specific recipes to use.

### Upload Recipes
* As a logged in user, I want to be able to upload recipes.
  * When I'm on the `/upload` page:
    * I can upload each recipe.
      * So that I can share my recipes with users.

### Edit Recipes
* As a logged in user, I want to be able to edit my recipe information.
  * When I'm on the `/users/:id/manage` pages:
    * I can click "Edit" to make permanent changes to recipes I have uploaded.
      * So that I can fix any errors I make in my recipe information.

### Delete Recipes
* As a logged in user, I want to be able to delete my recipes by clicking a Delete button associated with the recipe
  * When I'm on the `/user/:id/manage` pages:
    * I can click "Delete" to permanently delete a recipe I have posted.
      * So that I can delete a failed recipe.

## Comments

### Viewing Comments
* No matter the log in status, I want to be able to view comments on recipes
    * When I am on the `recipes/:id` page:
        * I can see all the comments left on a recipe.
            * So that I can read testimonials from other users
            * So that i can get feedback on my own recipe

### Add Comments to Recipes
* As a logged in user, I want to be able to add a comment on a recipe that i viewed.
    * When I am on the `/recipes/:id` page:
        * I can add a commment at the bottom of the recipe.
            * So that i can voice my concern or love for a recipe

### Edit Comments
* As a logged in user, I want to be able to edit a comment on a recipe that i authored.
    * When I am on the `/recipes/:id` page:
        * I can press an edit button on my comment in order to edit it.
            * So that I can fix my typos or change my mind on a recipe.

### Delete Comments
* As a logged in user, I want to be able to delete a comment on a recipe that i authored.
    * When I am on the `/recipes/:id` page:
        * I can press a delete button on my comment in order to delete it.
            * So that I can change my mind on a recipe.