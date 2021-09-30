![Filament Hero Logo](https://res.cloudinary.com/cameron-projects/image/upload/v1633038317/Copy_of_Filament_Tracker_whrjf9.png)
# Filament Hero
## Your 3d Printing Companion
---
## Main Features 
### Keep track of your filament usage
By adding information on your filaments, you can easily see how much filament is left on the spool. When you add a new print, the length and weight will automatically be subracted from the filament data.
### Keep track of your print settings 
By adding print settings information, you can easily keep track of which settings are workin the best for you and which bring you heartache. 

## Installing
To run a local version, complete the following: 
- clone the repo to your machine
- cd into the filament-hero directory: `cd filament hero`
- run `npm i`
- create a `.env.local` file to put your api keys 
    - You will need the following api keys:
    - MONGO_URI 
    - AUTH0_SECRET
    - AUTH0_BASE_URL
    - AUTH0_ISSUER_BASE_URL
    - AUTH0_CLIENT_ID
    - AUTH0_CLIENT_SECRET
    - If you need help setting up Auth0 with Next.js, this link is what I used to get started: [Auth0 Get Started](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)
- Afer everything is installed and keys are setup, rund `npn run dev` to start the application