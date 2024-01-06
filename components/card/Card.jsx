import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Typography from '@mui/material/Typography';

import styles from './styles.module.scss'



export default function RecipeReviewCard({ props }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ margin: '20px auto' }} className={styles.cardContainer}>
      <CardHeader

        title={props.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={`data:image/png;base64,${props.picture}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>


        <CardContent style={{ padding: 0, width: '100%', textAlign: 'center' }}>
          <Typography style={{ fontSize: '24px', fontWeight: 'bold', color: 'rgb(253, 34, 224)' }} >
            {props.price}€
          </Typography>
        </CardContent>
      </CardActions>

    </Card>
  );
}