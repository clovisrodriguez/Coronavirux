import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from 'react-geocode';
import _ from 'lodash';
import { getINSReport } from '../api';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import SideBar from '../components/SideBar';

const GOOGLE_MAP_KEY = 'AIzaSyAnWeyMrHdwIJovYY2hdO18aonmJIiPvCM';

Geocode.setApiKey(GOOGLE_MAP_KEY);
Geocode.setLanguage('es');
Geocode.setRegion('co');

export default () => {
  const [cities, setCities] = useState([]);
  const [pacientCases, setPacientCases] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const organiceCity = async () => {
      let casesPerCity = [];

      const data = await getINSReport();

      _.map(data, 'city').forEach(city => {
        const index = _.findIndex(casesPerCity, obj => obj.name === city);

        if (index >= 0) {
          casesPerCity[index].cases++;
        } else {
          casesPerCity.push({ name: city, cases: 1 });
        }
      });

      setPacientCases(data);

      const citiesWithLocation = await Promise.all(
        casesPerCity &&
          casesPerCity.map(async city => {
            const location = await getGeoReference(city.name);
            return { ...city, location };
          })
      );

      setCities(citiesWithLocation);
    };

    const getData = async () => {
      setLoading(true);
      await organiceCity();
      setLoading(false);
    };

    getData();
  }, []);

  const getGeoReference = async city => {
    const response = await Geocode.fromAddress(city);

    return response.results[0].geometry.location;
  };

  const handelApiLoaded = async (map, maps, cities = []) => {
    cities.forEach(cityMap => {
      new maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: cityMap.location,
        radius: cityMap.cases * 400
      });
    });
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant='h6'>Coronavirux</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Paper style={{ height: '100%' }}>
            <SideBar {...{ cities, pacientCases }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9} style={{ height: '100vh', width: '100%' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <GoogleMapsWrapper {...{ handelApiLoaded, cities }} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const googleMapsOptions = {
  styles: [
    {
      width: '100px'
    },
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [
        {
          weight: '2.00'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#9c9c9c'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: 45
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7b7b7b'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#46bcec'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#c8d7d4'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#070707'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    }
  ]
};

const GoogleMapsWrapper = ({ handelApiLoaded, cities }) => (
  <GoogleMap
    options={googleMapsOptions}
    bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
    center={{ lat: 4.6564955, lng: -74.0652501 }}
    zoom={6}
    onGoogleApiLoaded={({ map, maps }) => handelApiLoaded(map, maps, cities)}
  ></GoogleMap>
);
