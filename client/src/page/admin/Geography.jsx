import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import NotFound from "../404";
import { setGeoData } from "../../state/geoSlice";
import { geoData } from "../../geoData";
import { ResponsiveChoropleth } from "@nivo/geo";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider, Typography } from "@mui/material";

const Geography = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { adminname } = useParams();
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const geo = getData.geo.geo;


  useEffect(() => {
    const fetchGeoData = async () => {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getgeodata`
      );
      const resData = await fetchData.json();
      dispatch(setGeoData(resData));
    };

    return () => fetchGeoData();
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }

  return (
    <Box
      component="div"
      width="100%"
      sx={{
        backgroundColor: theme.palette.primary.light,
        p: "20px",
        minHeight: "calc(100vh)",
      }}
    >
      {geo ? (
        <Box
          component="div"
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            p: 4,
            boxShadow: 2,
            
          }}
        >
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontWeight: "500",
              fontSize: theme.typography.h5.fontSize,
              mb: "26px",
            }}
          >
            Locations of customers
          </Typography>
          <Divider
            sx={{
              color: theme.palette.grey[900],
              mb: "24px",
            }}
          />
          <Box
          width='100%'
            sx={{
                height: '450px',
                maxHeight: '450px'
            }}
           >
            <ResponsiveChoropleth
              data={geo}
              features={geoData.features}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              colors="YlGnBu"
              domain={[0, 100]}
              unknownColor="#666666"
              label="properties.name"
              valueFormat=".2s"
              projectionScale={125}
              projectionTranslation={[0.5, 0.6]}
              projectionRotation={[0, 0, 0]}
              enableGraticule={true}
              borderWidth={1.2}
              borderColor="#152538"
              graticuleLineColor={theme.palette.grey[500]}
              legends={[
                {
                  anchor: "bottom-left",
                  direction: "column",
                  justify: true,
                  translateX: 125,
                  translateY: -25,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: "left-to-right",
                  itemTextColor: theme.palette.grey[900],
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.grey[1000],
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            minHeight: "calc(100vh)",
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            p: 4,
            boxShadow: 2,
          }}
        >
          <CircularProgress />
          <Typography sx={{ fontSize: theme.typography.h6.fontSize }}>
            Loading
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Geography;
