# MySQL-Bieber

## Welcome to my Repo! 
On this repo I created a simple app that allow us to buy merchandise, as a **Customer**, or maganed the stock from the store, as a **Manager**.
This app works on node.js, with MySQL database link.

Our database initial will look like this ...

![image of database](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/database.PNG)



### Costumer use:
We have to start node, as **$ node bieBayCustomer.js**. 

1- It wil prompt all the products on the store, with the *ID, Name* and *Price*...

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Costumer1.PNG)

2- It will ask you for the product we want. We need to type the number of the *ID* of the product, and will prompt a quantity desire.

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Costumer2.PNG)

3- Finally will let you know your total for the sale.... 

(if the amount is over the stock on the store, it will show you a warning and ask you again for the quantity)

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Costumer3.PNG)


### Manager use:
We have start node as **$ node bieBayManager.js**.

1- It will prompt your choices on a list.

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Manager1.PNG)

2- When you select an option will display your selection function and it will ask you if you want to select another function from the choices.

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Manager2.PNG)

For **ADD TO INVENTORY**, it will ask you which product you want to modify stock...

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Manager3.PNG)

You have to enter the **TOTAL** for the stock, adding the previous stock. If it is succesfully update it will display a comment.

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Manager4.PNG)

And we will check on the stock and it will be reflected...

![image of customer](https://github.com/marioiovanna/MySQL-Bieber/blob/master/pics_readme/Manager5.PNG)


For a simple DEMO of the app see the link here [LINK TO VIDEO](https://github.com/marioiovanna/MySQL-Bieber/blob/master/video_demo.mkv)



