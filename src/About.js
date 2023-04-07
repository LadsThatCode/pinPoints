import "./About.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





export default function About() {
  return (

    <div className="team-container">
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          sx={{ height: 450 }}
          image={process.env.PUBLIC_URL + "./aboutimg/davey.png"}
          title="davey"
        />
        <CardActions sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <a href="https://github.com/DaveyAuz"><Button size="medium">Github</Button></a>
        </CardActions>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Davey Oswald
          </Typography>
          <Typography variant="body2" color="text.primary">
            Currently Studying to be a software developer at Code Fellows in Seattle, I have a Mosaic Background that started with my service in the United States Marine Corps in 2005. Im Very excited about this next chapter of my professional journey, the world of coding is something I find extremely fun and challenging. I find myself wanting to learn more about every little thing I figure out.
          </Typography>
        </CardContent>
      </Card>


      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          sx={{ height: 450 }}
          image={process.env.PUBLIC_URL + "./aboutimg/andrew.png"}
          title="andrew"
        />
        <CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
            <a href="https://github.com/AndrewVreeland"><Button size="medium">Github</Button></a>
          </CardActions>
          <Typography gutterBottom variant="h5" component="div">
            Andrew Vreeland
          </Typography>
          <Typography variant="body2" color="text.primary">
            I am a hardworking and dedicated professional with a passion for growth and development. I am always eager to learn and take on new challenges, and I believe that my positive attitude and strong work ethic make me a valuable asset to any team. Also... I made earth. I am sort of a big deal.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          sx={{ height: 450 }}
          image={process.env.PUBLIC_URL + "./aboutimg/logan.png"}
          title="logan"
        />
        <CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
            <a href="https://github.com/LogiDaBear"><Button size="medium">Github</Button></a>
          </CardActions>
          <Typography gutterBottom variant="h5" component="div">
            Logan Reese
          </Typography>
          <Typography variant="body2" color="text.primary">
            Currently developing skill-set to become a python developer at Code Fellows. Previously an armored vehicle, firetruck apparatus, and aviation mechanic. USAF Veteran. Papi chulo of coding.
          </Typography>
        </CardContent>
      </Card>


      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          sx={{ height: 450 }}
          image={process.env.PUBLIC_URL + "./aboutimg/chris.png"}
          title="christopher"
        />
        <CardActions sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <a href="https://github.com/cfosprof"><Button size="medium">Github</Button></a>
        </CardActions>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Chris Foster
          </Typography>
          <Typography variant="body2" color="text.primary">
            Software development student studying Java, coming from a background in distribution that brings together strong problem-solving skills and a detail-oriented mindset to create efficient and effective software solutions.
          </Typography>
        </CardContent>
      </Card>


    </div>
  );
}