## My Thoughts about the development process 

Before I started to work on the application, I thought about the principles which I also follow in my private pieces of work. I thought about scalability. Now I am creating a Characters App, but later there can be multiple other apps, so I created a dashboard, where all applications can be found in a form of Tiles, which serve as a direct link to concrete app. I used route /dashboard instead of just / to be more concrete about my intention. 

I did not focus more on the dashboard page, because it was not a part of a task, but it is a list of tiles with one item now. Tile gets iťs data from static source, array of config objects. 

First of all, the app needs the data, the content. I created a function in /lib/api folder, which pulls the data from swapi endpoint, it works recursively, as swapi sends only first 10 records and also a next url for requesting another 10 records and so on, until all records are fetched. 

I put the result in an array of objects in global state management, to have the data at my disposal later for search and filtering and displaying, without a need for another REST API call. New call should only be triggered, if data on server changes, if the cached version is different from our fetched data. 
So I have chosen cache mode 'force-cache' and in case of an error I send a respective status code and empty array, therefore the app doesn't contain any special error page, I solved error handling in this way. 

The main page consist of a list of characters with a pagination, a search bar in header and button to open a filter panel with some useful ways to filter the records. 
I thought it would be useful to search not only by name, but also by other character properties. There are definitely more to do here, many of the properties are just urls to other endpoints, where related data can be fetched. That would be a future task, to add more information from other endpoints on character detail page, to show not just information about that concrete person, but also about the planet he lives on and a list of other people who live on the same planet, so there could be more lists. 

Another key principle I always follow is DRY, therefore I created a generic list component, which should just take an array of objects and iterate them and not care about the content. I find such reusable components very useful, I always search for possible reusable pieces of code even it doesn't give as much here with just two lists at the moment, but later as the app will grow, it can significantly reduce the amount of code. 

I also think about not to hard code text in the app. I did it only rarely here, as sometimes it would be overkill if it is just one word, or sentence, but if the text should repeat on more places in code, definitely a file with constants is a way to go here in small demo app. 
In a professional application we create translation files and use the translation keys in the code, here it is just a demo app and constants exported from a file are enough in my opinion. 

I used TypeScript, strong typing is necessary. 

I have installed some libraries to use with NextJS, I used Material UI for styling. I have experiences with CSS modules and also with styled components as can be seen in my private projects on github, here I did not write much custom CSS and therefore I used just some sx attribute, I would prefer classes in module.css files in case of more CSS code. 

I used components from Material UI instead of native HTML elements, because the MUI components work better together and already have some styling including responsive behavior. I find the UI and styling sufficient for a first version, definitely there are possible ways to improve the design. 

I focused on UX, the app can be used with tab and enter keys, the radio buttons are changeable with left and right arrow keys, during testing I managed to get everywhere and left alt + left arrow is a useful shortcut for going back in the browser to previous page. 
No horizontal scrolling, but if happens: holding shift toggles between vertican and horizontal scroll and arrow keys can be used for that, but the app has pagination, which is useful to avoid long lists, I would use it even without your demand in the documentation. 

I have also used some environment variables in .env file, to abstract some information from code into configuration. I did not make individual variables for production environment and also did not create .env.example file for this small demo. 

Beside Material UI I installed only lodash, I installed _.isEqual method, because I did not need whole lodash library for one method to use. Later I had to install whole lodash, because there wasn't a way to install debounce function alone, but I found out lodash uses tree shaking and unused library code will not increase the bundle. 

I created a theme for color combination and some other settings which can be added in MUI theme configuration like changing of styles. 

I thing the file system is self explanatory. In case of a big project, I would divide the folder structure in separate models, or there could also be possible to develop Microfrontend architecture, here I did not see a big profit in doing that. 

I create some custom hooks to abstract this functionality from components. I always try to have my components small as possible and it should not do too much, single responsibility principle should be on mind. 

I used app router as it is modern way of routing in NextJS. 

I derive values from other values if possible, to have a small state. I try to not have too much code in my components, then I rather extract it the code into other components or custom hooks, to hold it manageable. I try to avoid using many useEffects in component. 

I try to be consistent in writting the code and in naming conventions. I prefer names which inform what the code does, instead of adding many unnecessary comments. Not too long names, but better a bit longer, so that the code can be easy understood by colleagues. 
I used comments in imports to have that clean, I find it easier to search among many import statements, if they are grouped and labeled. 

I prefer to have server-side components for better SEO and performance, sometimes I had to use "use client" for the reason how NextJS works. I created util component DataContextProvider as a wrapper for sending data from server-side component into my global state. get ServerSideProps could be used only in pages router. I tried to create DataContextProvider generic, to be able to use it not just for fetched characters but also for other data in future. 

It would be possible also to create generic service functions for sending requests to endpoints, but as I had just one request here, I have not done it, it would be a future task. The refactoring is more meaningful when you have real purpose. 

I used query params in url to make the links different for bookmarking or sending the links between users, so that the app can show the filtering just with the help of url params. 
In a real production app the data would be stored in a database and would be more persistent, here the task was just to use a dummy endpoint. 

My idea about the UX is, that user should have everything quickly at his disposal. Just a click away to reach for any information he needs. Intuitive user interface adapts to smaller devices as well. 

The whole app took me 26 hours of work altogether. I need to refresh my NextJS knowledge, I was used to native ReactJS and here it is a bit different environment and rules. But I can quickly adapt. 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
