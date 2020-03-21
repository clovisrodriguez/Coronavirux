import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from 'react-geocode';
import _ from 'lodash';
import { getINSReport, createCity, getCities } from '../api';

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
      const data = await getINSReport();
      let locations;
      let casesPerCity = [];

      try {
        locations = _.get(await getCities(), 'data.listCitiess.items');
      } catch (e) {
        console.log(e);
      }

      _.map(data, 'city').forEach(city => {
        const index = _.findIndex(casesPerCity, obj => obj.name === city);

        if (index >= 0) {
          casesPerCity[index].cases++;
        } else {
          const cityLocation = _.findIndex(locations, location => {
            return location.name === city;
          });
          const cityObject = { name: city, cases: 1 };

          if (cityLocation >= 0)
            cityObject.location = locations[cityLocation].location;

          casesPerCity.push(cityObject);
        }
      });

      const citiesWithOutLocation = _.filter(
        casesPerCity,
        city => city.location === undefined
      );

      if (citiesWithOutLocation.length > 0) {
        const citiesWithLocation = await Promise.all(
          citiesWithOutLocation &&
            citiesWithOutLocation.map(async city => {
              const location = await getGeoReference(city.name);
              const index = _.findIndex(
                casesPerCity,
                obj => obj.name === city.name
              );
              casesPerCity[index].location = location;
              return { ...city, location };
            })
        );

        await Promise.all(
          citiesWithLocation.map(async city => {
            await createCity(_.omit(city, 'cases'));
          })
        );
      }

      setPacientCases(data);
      setCities(casesPerCity);
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
      const { cases } = cityMap;
      const GROWTH_RATE = 600;
      let radius;

      if (cases > 20) {
        radius = cases * GROWTH_RATE;
      } else if (cases > 7) {
        radius = cases * (GROWTH_RATE * 3);
      } else {
        radius = cases * (GROWTH_RATE * 8);
      }

      new maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: cityMap.location,
        radius
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
      <Grid container alignContent='center' alignItems='center'>
        <Grid item xs={12} md={5} lg={3}>
          <Paper style={{ height: '100%' }}>
            {!loading && <SideBar {...{ cities, pacientCases }} />}
            <div
              style={{
                textAlign: 'center',
                marginTop: '1rem',
                marginBottom: '1rem'
              }}
            >
              <Typography variant='caption'>
                Uitliza el puntero para interactuar con la gráfica, datos
                tomados de INS, desliza la barra para ver más datos
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={9}
          style={{ height: '100vh', width: '100%' }}
        >
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
