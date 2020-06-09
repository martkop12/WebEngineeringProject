import React from 'react';
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

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
  console.log(props.uid)
  console.log(props.objectWithRoute)


  var userRoute = [
      {
        position : {
            lat: "48.935134",
            lng: "21.906828",
            key : "123542165489",
          }
      },
      {
        
        position : {
        lat: "48.935109",
        lng: "21.906844",
        key : "24545",
      },
    },
    {
      
      position : {
        lat: "48.935077",
        lng: "21.906847",
        key : "3546456",
      },
    },
    {
      
      position : {
        lat: "48.935040",
        lng: "21.906796",
        uid : "42453456",
      },
    },
    {
      
      position : {
        lat: "48.935042",
        lng: "21.906775",
        key : "554687",
      },
    },
    {
      
      position : {
        lat: "48.935042",
        lng: "21.906756",
        key : "6456456",
      },
    }
  ]

  // console.log(userRoute)

  const markers = props.objectWithRoute.route.map( route => 
                  <Marker
                    key={Math.random()}
                    position={{lat: parseFloat(route.latitude), lng: parseFloat(route.longitude)}}
                    // {...console.log("latitude SU ",route.latitude)}
                  />
                 

                  );
                  console.log("MARKERS SU ",markers)
  return (
        <GoogleMap
          defaultZoom={18}
          defaultCenter={{ lat: parseFloat(props.objectWithRoute.route[0].latitude), lng:parseFloat(props.objectWithRoute.route[0].longitude) }}
        >
          {props.isMarkerShown && (
          <Marker key={Math.random()} position={{ lat: parseFloat(props.objectWithRoute.route[0].latitude), lng:parseFloat(props.objectWithRoute.route[0].longitude) }} />
          )}
          
          {markers}
      </GoogleMap>
    );
  }
))


function createData(uid, name, crossed, distance, ) {
  return {uid, name, crossed, distance};
}


const rows = [
  createData(1,'Car Cupcake', 305, 3.7),
  createData(2,'Car Donut', 452, 25.0),
  createData(3,'Car Eclair', 262, 16.0),
  createData(4,'Car Frozen yoghurt', 159, 6.0),
  createData(5,'Car Gingerbread', 356, 16.0),
  createData(6,'Car Honeycomb', 408, 3.2),
  createData(7,'Car Ice cream sandwich', 237, 9.0),

];

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
  { id: 'name', numeric: false, disablePadding: true, label: 'Cars near ( < 50 m)' },
  { id: 'crossed', numeric: true, disablePadding: false, label: 'Crossed' },
  { id: 'distance', numeric: true, disablePadding: false, label: 'Distance (m)' },
  
];

function EnhancedTableHead(props) {
  const { classes,  order, orderBy, onRequestSort } = props;
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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
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
    border: '2px solid #000',
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
 
export default function CarsTable({type, crosswalkData}) {
  console.log(type);
  console.log(crosswalkData);

  function group(arr, key) {
    return [...arr.reduce( (acc, o) => 
        acc.set(o[key], (acc.get(o[key]) || []).concat(o))
    , new Map).values()];
  }

  const result = group(crosswalkData, 'id');
  console.log(result);
  console.log("result je ",result.length)

  var objectsWithRoute = [];

  if(result) {
    result.forEach(getObjectWithRoute)
  }

  function getObjectWithRoute(item, index, arr) {
    let object = {
      id: null,
      route: [],
    };
    let route=[];
    console.log("Novy obj je ", item)
    object.id= item[0].id;
    item.forEach(function(entry) {
      // console.log("Prechadzam",entry);
      object.route.push(entry.location)
    });
    
    objectsWithRoute.push(object)
  }

  console.log("Obj with routes",objectsWithRoute);

  
  console.log(result[1]);
  let carOne = [];

  result[0].forEach(getLocations)
  function getLocations(item, index, arr) {
    carOne.push(item.location)
  }
  console.log(carOne)




  // const carsOrPedestrians = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('distance');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

 

 //Map modal part
  const [open, setOpen] = React.useState(false);
  const [uid, setUid] = React.useState(undefined);
  const [objectWithRoute, setObjectWithRoute] = React.useState(undefined);

  
  const handleClose = () => {
    setUid(undefined);
    setOpen(false);
  };

  const handleRowClick = (row) => {
    setUid(row.id);
    if(objectsWithRoute){
      console.log("Exist",objectsWithRoute);
      console.log("Uid",row.id);

      console.log("?",objectWithRoute);
      setObjectWithRoute(objectsWithRoute.find(x => x.id === row.id));
      console.log(objectsWithRoute.find(x => x.id === row.id))
      console.log("Gere",objectWithRoute);

    };
    ;
    setOpen(true);
    console.log('We need to get the details for ', row);
  }
  
  return (
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
                      {/* <TableCell align="right">{row.crossed}</TableCell>
                      <TableCell align="right">{row.distance}</TableCell> */}

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
            <h2 id="transition-modal-title">
            { uid}
            </h2>
            <MyMapComponent
                isMarkerShown
                lat={14}
                lng={45}
                uid={uid}
                objectWithRoute={objectWithRoute}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}