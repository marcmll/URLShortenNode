URL Shortener Node
==================

This small little project is one I made to practice Node JS as well as the usage of Redis as a database.

I am not yet sure if this project will remain in its current form, or if I will continue working on it, adding possible features to it along the way. Nevertheless, it is here for you and it is open-source, so if you wish to, you can fork it and work on it yourself. 

Usage:
-
The usage of this project requires you to have [npm](https://www.npmjs.com/get-npm) and [Redis](https://redis.io/download) installed.
When having installed both, the first step is installing all the necessary node modules, required to run this project properly. To do so, navigate to the project folder using your command line and type:

```
npm install
```

Now that we have all the modules installed we can go ahead and start the Redis server in another command line tab, navigating to the Redis folder, typing in the following:

```
src/redis-server
```

Finally, to get the project going, in the first tab you used, type:

```
nodemon .
```

You can now view the project by opening your browser and typing in ```localhost:8080```

Stats:
-
In addition to shortening link, I have also included the "stats" feature. This allows you to see how often the shortened link has been visited. To view the stats for a link, just type in the shortened link adding ```/stats``` to the end of it. You will be brought to a page that shows you:
- The shortened link
- The amount of times that this has been visitied
- The original link

---

This project is licensed under the terms of the MIT license.

Contact:
-
- momueller@me.com
- [Twitter](http://www.twitter.com/seven11nash)
- [Web](http://momueller.com)
