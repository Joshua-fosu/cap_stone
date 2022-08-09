ReachMe
By: Joshua Fosu-Agyemang

Context
The app is a social networking and media application that allows users to connect on similar interests in events. Using event APIs such as Ticketmaster, users can search for events that they would be interested in, and save those events, and discover other users that are also interested. Users can also post their own media, see posts of others they follow, unsubscribe or add new users.
App Evaluation
Category: Social Networking/Events
Web: This is a web application that is best used on a computer.
Story: This is an app that connects people with shared interests using events as a basis to create interaction.
Market: This is a secure app where individuals’ feeds are based on what events they join and what people they follow.
Habit: Since this app is to help track daily activities, it is meant to be used often. However, the goal is to improve productivity.
Scope: A new user could search for groups to join or rather get recommendations based on trending groups, or most popular ones.
Product Spec

1. User Stories (Required and Optional)
   Required features
   Users are able to sign up and log in with their own account.
   Users have their own profile pages.
   Users are able to search for events they are interested in (from Ticketmaster API).
   Users are able to follow desired events.
   Users are able to see other profile pages and follow people they are interested in.
   A user’s feed contains posts and media from followed events and people.
   Users can post media on their timeline.
   Users are able to like and comment on posts.
   Users are able to add events that they follow to Google calendar (TAP).
   Users can create chat rooms and chat with other users (TAP).

Optional/Stretch features
Users are able to view events from more than one API.
Autofill search features.
Endless scrolling for displayed events. 2. Screen Archetypes
Login
Register - User signs up or logs into their account
User feed
User is able to track the number of events followed.
User can add their followed event to Google Calendar
User is able to view posts from events followed in the feed.
User can upload their own photos in their feed.
User friends/followed
User can view the users they followed
Events
Users can view and follow new events
Chat
Create chat rooms with users they follow
(Other) User profile
A user can see the other user’s information and followed events 3. Navigation
Tab navigation
User feed
User friends
User events
Flow navigation
Persistent log in → Account creation
User feed → About page
User feed → Chat rooms
User feed → Events search
Wireframes/Designs
Login

User feed

User upload image and post

Events

Friends

Friend profile

Tech Decisions
Framework and tools
Front-end: React, Bootstrap, Bulma, Tailwind CSS
Database: Firebase
Schema
User:
{
avatarPic : generated with multi-avatar API
uniqueUserId: generated with useID() hook
userName: string
userEmail: string
numOfPost: number
followers: array of unique userId or userName
about: string (optional)
numSavedEvents : number
createdAt: date
}
NewPost:
{
userName: string,
eventTag: event_name,
createdAt: date
numOfLikes: number
comments: []
}
File Layout
Src
Components
Header
SubComponents folder
…jsx
…css
Header.jsx
Header.css
…
Context
AuthorizationContext
UserDataContext
Routes
Pages
UserProfilePage
Sub_routes
Sub_context
.jsx file
…
.env file
Firebase.js
Milestones
Required:
Milestone 1 (done by week 4):
Users are able to sign up and login with Facebook or sign up as a new user
Basic user feed and layout design is complete.
Milestone 2 (done by week 5):
Users are able to create new posts.
Users can upload images as posts.
Users are able to load and explore on the events page found through an event API and friends page.
Milestone 3 (done by week 6):
Users are able to follow or unfollow friends.
Users can sign out of their account.
Users can like or unlike posts.
Users can comment on posts.
Milestone 4 (done by week 8):
Users see posts ordered by recency.
Users can create chats with other users.
Users can save events to their Google calendars.
Implement lazy loading on user feed, events, and friends pages.
Stretch goals:
Milestone 1 (increased events visibility):
Implement more than one API in the events tab.
Add endless scrolling to the events tab.
Milestone 2 (enhance posting ability):
Allow users to upload more than one image.
