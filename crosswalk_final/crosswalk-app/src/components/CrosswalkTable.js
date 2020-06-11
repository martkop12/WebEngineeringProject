import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CrosswalkMarker from "./CrosswalkMarker"
import Fade from '@material-ui/core/Fade';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  const markers = props.objectWithRoute.route.map(route =>
    <Marker
      key={Math.random()}
      position={{ lat: parseFloat(route.latitude), lng: parseFloat(route.longitude) }}
    // {...console.log("latitude SU ",route.latitude)}
    />


  );
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: parseFloat(props.objectWithRoute.route[0].latitude), lng: parseFloat(props.objectWithRoute.route[0].longitude) }}
    >
      {props.isMarkerShown && (
        <Marker key={Math.random()} position={{ lat: parseFloat(props.objectWithRoute.route[0].latitude), lng: parseFloat(props.objectWithRoute.route[0].longitude) }} />
      )}

      {markers}
    </GoogleMap>
  );
}
))


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Near ( < 50 m)' },
  // { id: 'crossed', numeric: true, disablePadding: false, label: 'Crossed' },
  { id: 'distance', numeric: true, disablePadding: false, label: 'Distance (m)' },

];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{
      backgroundColor: "#bdbdbd",

    }}>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginLeft: "auto",
    marginRight: "auto"
  },
  paper: {
    // width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 400,
  },
  modal: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 3),
  },
  mapModal: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CarsTable({ type, crosswalkData, crossLocation }) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('distance');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const result = group(crosswalkData, 'id');

  //Map modal part
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState(undefined);
  const [objectWithRoute, setObjectWithRoute] = useState(undefined);


  function group(arr, key) {
    return [...arr.reduce((acc, o) =>
      acc.set(o[key], (acc.get(o[key]) || []).concat(o))
      , new Map).values()];
  }

  var objectsWithRoute = [];

  if (result) {
    result.forEach(getObjectWithRoute)
  }

  function getObjectWithRoute(item, index, arr) {
    let object = {
      id: null,
      route: [],
    };
    let route = [];
    object.id = item[0].id;
    item.forEach(function (entry) {
      // console.log("Prechadzam",entry);
      object.route.push(entry.location)
    });

    objectsWithRoute.push(object)
  }

  let carOne = [];

  // result[0].forEach(getLocations)
  function getLocations(item, index, arr) {
    carOne.push(item.location)
  }

  // const carsOrPedestrians = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;




  const handleClose = () => {
    setUid(undefined);
    setOpen(false);
  };

  const handleRowClick = (row) => {
    setUid(row.id);
    if (objectsWithRoute) {
      setObjectWithRoute(objectsWithRoute.find(x => x.id === row.id));

    };
    ;
    setOpen(true);
    console.log('We need to get the details for ', row);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>

          <TableContainer>
            <Table
              // onCellClick={handleCellClick()}
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}

              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={objectsWithRoute.length}
              />
              <TableBody>
                {stableSort(objectsWithRoute, getComparator(order, orderBy))
                  .map((objectWithRoute, index) => {
                    const isItemSelected = isSelected(objectWithRoute.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover

                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={objectWithRoute.id}
                        selected={isItemSelected}
                        onClick={() => handleRowClick(objectWithRoute)}
                      >
                        <TableCell padding="checkbox">

                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {objectWithRoute.id}
                        </TableCell>
                        {/*TU JE TO  */}
                        {objectWithRoute.route[objectWithRoute.route.length -1] != null & crossLocation != null &&
                          <TableCell align="right">{distanceBetweenTwoLocations(objectWithRoute.route[objectWithRoute.route.length-1], crossLocation)}</TableCell>
                        }

                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.mapModal}>
              <h2 >
                Route 
                {/* {uid} */}
              </h2>
              <MyMapComponent
                isMarkerShown
                lat={14}
                lng={45}
                uid={uid}
                objectWithRoute={objectWithRoute}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `550px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              {/* <p id="transition-modal-description">Route of this {type}</p> */}
            </div>
          </Fade>
        </Modal>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </div>
    </React.Fragment>
  );
}

function distanceBetweenTwoLocations(current_location, end_location) {
  // returns distance in KM
  console.log(end_location)

  var lat1 = current_location.latitude;
  var lon1 = current_location.longitude;
  var lat2 = end_location.latitude;
  var lon2 = end_location.longitude;

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c; // Distance in km

  return distance * 1000;
}

// helper function
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
