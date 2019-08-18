import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { VisualRating } from './Rating.jsx';
import { Link } from 'react-router-dom';
import { images } from '../config/moviedb.json';
import na_poster from '../images/na_poster.png';

export default function MovieLarge({ id, poster_path, original_title, title, release_date, overview, vote_average, mobile }) {
    const useStyles = makeStyles(theme => ({
        card: {
            display: 'flex',
            margin: 5
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'no-wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: mobile ? 'auto' : 300,
            maxWidth: 400,
            minHeight: 250,
        },
        cover: {
            width: 185,
        }
    }));
    const classes = useStyles();
    const newOverview = overview.split(' ')
    return (
        <Link to={`/movie/${id}`}>
            <Card className={classes.card}>
                {poster_path ? <CardMedia
                    className={classes.cover}
                    image={poster_path ? `https://image.tmdb.org/t/p/${images.poster_sizes[2]}/${poster_path}` : na_poster}
                    title={original_title}
                /> : null}
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <h3>{title}</h3>
                        <p style={{ fontStyle: 'italic', marginTop: -10 }}>{release_date}</p>
                        <VisualRating
                            rating={vote_average}
                            w={50} />
                        <p style={{ fontSize: '0.8em' }}>{newOverview.length > 30 ? newOverview.slice(0, 30).join(' ') + '...' : overview}</p>
                    </CardContent>
                </div>
            </Card>
        </Link>
    );
}