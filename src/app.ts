import errorHandler from "./middleware/errorHandler"
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

//Route
import authRoute from './modules/auth/auth.route';
import userRoute from "./modules/user/user.route";
import artistRoute from "./modules/artist/artist.route";
import albumRoute from "./modules/album/album.route";
import trackRoute from "./modules/track/track.route";
import favoriteRoute from "./modules/favorites/favorites.route";


const app=express();


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/v1',authRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',artistRoute);
app.use('/api/v1',albumRoute);
app.use('/api/v1',trackRoute);
app.use('/api/v1',favoriteRoute);

app.use(errorHandler);

const PORT=process.env.PORT || 8080;


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));