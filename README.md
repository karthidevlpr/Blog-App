# Blog-App
Sample Blog Post Application

Branch Info : This branch contain the GraphQL integration, we used the express-graphql npm in server side and Apollo Client in frontend side , Added Graphql API instead of this three Rest API (getPostByUser, getAllPost, deletePost)

Tech: MERN, Material UI


1. Create 4 UI Pages and Respective APIs

    - Register

    - Login

    - My Posts

    - All Posts

   

2. Register: First Name, Last Name, Email, Password, Confirm Password

    - Call register API and store it in database


3. Login:  Email and Password

    - Call login API and get JWT token


4. My Posts: List all posts made by the logged in user in a card view with following data,

    - Call posts API and get all posts made by respective user

    - Display Title, Description, Last Updated-at


    - Add Post Button (Modal)

        - Includes two form fields: Title, Description

        - Call create posts API and maintain createdUserId & createdDate

    - Edit Post

        - Click on a particular post, open a modal to edit existing post.

        - Call update posts API and maintain lastUpdatedDate

    - Delete Post

        - Click on a delete icon of a particular post, ask confirmation and delete post

        - No hard deleted

        - Call update posts API and maintain lastUpdatedDate


5. All Posts: List all posts made by other users in a card view with following data,

        - Display Title, Description, Created By and Last Updated At

        - Call posts API and get all posts made by respective user

    - Post Detail Page

        - Click on a particular post, open a new page with particular post detail.

        - Should contain detail about post and user created.

        - Should display all comments for this post.

        - Call get posts API


    - Comments Section

        - Should have a comment text box at the bottom and comment button

        - List all comments for this post.

        - Call get comments API
