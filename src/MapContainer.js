import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'

// import Origins from './Origins';
const center = { lat: 23.0146, lng: 72.5306 }
const center1 = { lat: 23.0401, lng: 72.5315 }
let interval;
let index1=0;
function MapContainer() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDcjtGb2jSVKXsUjxVAcJx6hboHbUe6fqI",
    libraries: ['places'],
  })


  const origins=['Shyamal Cross Road, Shyamal, Ahmedabad, Gujarat, India','Shivranjani Cross Road, Shyamal, Ahmedabad, Gujarat, India',
  'Itc Narmada, I I M, Vastrapur, Ahmedabad, Gujarat, India',
  'Mansi Cross Road, Judges Bunglow Road, Satellite, Ahmedabad, Gujarat, India',
  'Nehru Park Circle, Mahavir Nagar society, Vastrapur, Ahmedabad, Gujarat, India',
  'Alpha One Mall, Sarkari Vasahat Road, Vastrapur, Ahmedabad, Gujarat, India'
  ]
  const [index,setIndex]=useState(0);
  const[value,setValue]=useState(0);
  const[visible,setVisible]=useState(false)
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  useEffect(()=>{
    if(visible){
      const interval = setInterval(() => {
            setIndex(index+1)
            if(index===5){
              clearInterval(interval);
              setVisible(false);
              console.log("arrived to the destination")
            }
           calculateRoute() 
             
               }, 2000);
               console.log("indexvalue", index)
               return () => clearInterval(interval); 
    }})
  
   const MarkerComponent = ({ text }) => <div style={{height:'100%',width:'100%', color:"red"}}>{text}</div>;

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }
const reCenter=(i)=>{

}
async function calculateRoute() {

//   if (originRef.current.value === '' || destiantionRef.current.value === '') {
//     return
//   }
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService() 
  
  const results = await directionsService.route({
    // origin: originRef.current.value,
    origin: origins[index],
    destination: 'Alpha One Mall, Sarkari Vasahat Road, Vastrapur, Ahmedabad, Gujarat, India',
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
    // eslint-disable-next-line no-undef
  //   pinA : new google.maps.Marker({
  //     position: center,
  //     map: map,
  //     icon: 'http://image.ibb.co/bZ3wLn/origin.png'
  //   }),
  //   // eslint-disable-next-line no-undef
  //   pinB : new google.maps.Marker({
  //     position: center1,
  //     map: map,
  //     icon: 'http://image.ibb.co/bZ3wLn/origin.png'
  // })
})
console.log(origins[index]);
  console.log(originRef.current.value);
  setDirectionsResponse(results)
  setDistance(results.routes[0].legs[0].distance.text)
  setDuration(results.routes[0].legs[0].duration.text)
}
  
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='80vh'
      w='70vw'
    >
       {/* <div 
      style={{position:"relative" ,flexDirection:"column" ,alignItems:"center",height:"100vh",width:"100wh"}}
      > */}
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* <div 
        style={{position:'absolute',height:'100%',width:'100%'}}
        ></div> */}
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={map => setMap(map)}
          
        >
          {/* <Marker position={center} /> */}
          <MarkerComponent lat={23.0146}  lng={72.5306} text='mymarker'/>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse}
            // options={{
            //   markerOptions: {
            //     orinIcon :'http://image.ibb.co/bZ3wLn/origin.png',
            //     desIcon :'https://image.ibb.co/cLwp5n/678111_map_marker_256.png'
            //   }
            // }}
            />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={()=>setVisible(true) }>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
     </Flex>
    // </div>
  )
}

export default MapContainer
