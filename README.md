# neotalk

Neotalk source files.

__Global version__

Default user:

 __login__: simple_user
 __password__: hellodaddyhellomom

You can visit the site using the following link: http://84.201.142.45/home (to login you need to choose More -> Login button)

__Running locally__

Programs needed: python, pip, npm

At first run setup:
```./setup.sh```

To run service locally use run.sh script:
```./run.sh```

To kill processes, which take required ports run free_ports script:
```./free_ports.sh```

## Main features of the service so far:
 - simple jwt authentication;
 - authorized users can create neotalks on different topics, boookmark posts, reply to them / reply to replies of other users, like or dislike users' replies;
 - neotalks are showed in the feed together with the most relevant replies;
 - users can see bookmarked posts in the Bookmarks tab;
 - users can search over all the neotalks.

## Features to do:
 - add 2-step verification;
 - add Categories tab with posts grouped by categories;
 - add search by Categories;
 - add Profile page;
 - add Dialogs between users.
