# Blog-App
Sample Blog Post Application

Tech: MERN, Material UI

This branch contain the kubernetes implementation, deploy and run the dockerized server application in Kubernetes

Steps :-
-	With help of MiniKube we can access the Kubernetes cluster in local machine
-	Install the minikube (brew install minikube) , minikube will setup the Api server and control manager and kubectl
-	First dockerized the server application by creating the DockerFile and building the docker image
-	push docker image to DockerHub
-	next create the pods and run the container inside the pods by create and apply the deployments in project
-	to access the dockerized server application outside we need to create and apply the services in project
-	next need to start the service then we can access the application in browser with node IP and port

Commands used for kubernetes implementation

-	Create DockerFile 
-	docker build -t “Image name”  “path of DockerFile” (Build Image)
-	docker push “Image name and tag ” (Push the Image)
-	brew install minikube  (Install the minikube)
-	minikube start (Start the minikube)
-	minikube status  (to check the status of minikube)
-	minikube kubectl -- apply -f deployment.yml  (Create the deployment file in project and apply)
-	minikube kubectl get pods (get the list of pods)
-	minikube kubectl get all (get all information about kubernetes cluster)
-	minikube kubectl -- apply -f service.yml  (Create the service file in project and apply)
-	minikube kubectl get svc (get the list of service)
-	minikube kubectl describe po "pods name" (get the detail information about pod)
-	minikube kubectl delete deployments/pods/svc "name of deployments/pods/svc" (delete the particular deployment , service, pod)
-	minikube kubectl -- delete pods -l app=”match name pods” (delete the list pods same time)
-	minikube service “service name” (start the service)
-	minikube dashboard (open the dashboard of Kubernetes cluster in your local machine)
 


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
