Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@5zan-Code 
KeyurPatel0202
/
ride-share-app
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
ride-share-app/app.js /
@KeyurPatel0202
KeyurPatel0202 update connection changes (mongoose)
Latest commit 0835472 now
 History
 1 contributor
58 lines (48 sloc)  1.45 KB

const express = require('express');
const app = express();
const env = require('dotenv/config');
const mongoose = require('mongoose');
const createError = require('http-errors');
const apiRoutes = require('./routes');
const { sendErrorResponse } = require('./utils/response');
const config = require('./config/config');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv/config');
main().catch(err => console.log(err));

async function main() {
  await mongoose
    .connect(config.dbConfig.databaseUrl,{
       useNewUrlParser: true, 
       useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((error) => {
      console.log({ error_database_connection: error.message },
        );
    });
}

app.use(fileUpload({
  //useTempFiles:true,
  //tempFileDir: path.join(__dirname,'temp'),
  createParentPath:true,
  //limits:{fileSize:1024}
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',async (req, res)=>{
	res.send("ride share applicaton");
});

app.use('/api',apiRoutes);

app.use(async (req, res, next)=>{
  next(createError.NotFound('this route does not exist'));
});

app.use((err, req, res, next)=>{
  const statusCode = err.status || 500;
  res.status(statusCode);
  return sendErrorResponse(res,err.message,statusCode);
});

const PORT = config.PORT || 3000;

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
You have no unread notifications
