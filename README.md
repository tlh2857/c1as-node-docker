# c1as-node-docker

## How to run: 

1. Run`git clone`
2. Navigate to root directory
3. Run `docker build -t WhateverTagYouWant .`
4. Run `docker images` and grab the image ID 
5. Run `docker run -p 3000:3000 -d IMAGEID`

Then, to test, open up a web browser and head to 'localhost:3000' and try the interface. See the instructions on how to hack it here: https://github.com/tlh2857/c1as-node-lambda-demo
