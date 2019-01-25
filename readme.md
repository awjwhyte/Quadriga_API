The index file is where you can make a call to the API client.
After downloading the library from git hub,

1. Make sure you have Node js and npm installed. If not, you can find out how to install both Node and NPM using google for your specific Operating System
2. From the command line or terminal navigate to the directory where the Quadriga_API-master project lives
3. type npm install into the terminal. This will install all the required modules from the package.json file.
4. You are ready to use the library


The are two methods available.
a) Private
b) Public

Each of the methods is called as follows private(a, b)
where a is the call to made or the endpoint to be used
and b is are the necessary option passed as an object

examples client.js

private('balance', {});        // checks the balance
private('user_transactions', {offset:'2', limit:'20', sort:'desc', book:'btc_cad'})

publicCall('transactions', {book: 'xbt_usd'})
publicCall('ticker', {'btc_cad'})
publicCall('order_book', {book:'btc_usd', group:1})
